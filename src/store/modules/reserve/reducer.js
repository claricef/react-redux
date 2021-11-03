import produce from 'immer'; // usar funções do js (push) sem se preocupar com imutabilidade (alterar consts diretamente)

export default function reserve(state = [], action){
    //quando clica em solicitar reserva em 'reservas' dispara uma ação para esse reducer
    switch(action.type){
        case 'ADD_RESERVE_SUCCESS':
            return produce(state, draft => { //draft é uma copia da state original
                draft.push(action.trip);
                // const tripIndex = draft.findIndex(trip => trip.id === action.trip.id) //verificar se essa trip ja existe no state
                
                // if(tripIndex >= 0) {//se ja existe a trip
                //     draft[tripIndex].amount +=1; //aumenta a quantidade
                // }else{
                //     draft.push({
                //         ...action.trip,
                //         amount:1,
                //     });
                // }
            });
        case 'REMOVE_RESERVE':
            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.id);

                if(tripIndex >= 0){
                    draft.splice(tripIndex, 1); //exclui o objeto com esse id no state
                }
            });

            case 'UPDATE_RESERVE_SUCCESS': {
                // if(action.amount <= 0){ //trata para que nao permita quantidade negativa ou zero
                //   return state; // se for menor ou igual a zero retorna o ultimo estado no caso 1
                // }
          
                return produce(state, draft => {
                  const tripIndex = draft.findIndex(trip => trip.id === action.id);
          
          
                  if(tripIndex >= 0){
                    draft[tripIndex].amount = Number(action.amount);
                  }
          
                });
          
              }
        default:
            return state;
    }
}
