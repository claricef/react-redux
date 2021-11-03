import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess, updateAmountSuccess } from './actions';
import api from '../../../services/api';
import history from '../../../services/history';


function* addToReserve({ id }){
  const tripExists = yield select(
    state => state.reserve.find(trip => trip.id === id)
  ); //sempre que clica em solicitar reserva verifica se ela ja existe pra nao fazer a requisição novamente

  const myStock = yield call(api.get, `/stock/${id}`); // requisição para pegar a quantidade disponivel no estoque

  const stockAmount = myStock.data.amount;  //armazena quantidade disponivel no estoque

  const currentStock = tripExists ? tripExists.amount : 0;  //pega o estoque atual

  const amount = currentStock + 1;

    

  if(amount > stockAmount){ // verifica nao ultrapassa o estoque disponivel
    alert('Quantidade maxima atingida.');
    return;
  }

  if(tripExists){ 

    yield put(updateAmountSuccess(id, amount));

  }else{
    const response = yield call(api.get, `trips/${id}` );

    const data = {
      ...response.data,
      amount: 1,
    };

    yield put(addReserveSuccess(data));
    history.push('/reservas');
  }
}


function* updateAmount({ id, amount }){
  if(amount <= 0) return;

  const myStock = yield call(api.get, `/stock/${id}`);

  const stockAmount = myStock.data.amount;

  if(amount > stockAmount){
    alert('Quantidade maxima atingida.');
    return;
  }

  yield put(updateAmountSuccess(id, amount));

}

export default all([
  takeLatest('ADD_RESERVE_REQUEST', addToReserve),
  takeLatest('UPDATE_RESERVE_REQUEST', updateAmount),
])