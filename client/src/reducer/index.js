import { GET_DOGS, GET_DOG, GET_DETAIL, FILTER_BY_DATA_SOURCE, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME, ORDER_BY_WEIGHT, SET_ERROR, CLEAR_ERROR } from '../actions';

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    dogDetail: [],
    errors: undefined
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }

        case GET_DOG:
            return {
                ...state,
                dogs: action.payload,

            }

        case GET_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }

        case FILTER_BY_DATA_SOURCE:

            const filterByDataSource = action.payload === 'OWN' ?
                state.allDogs.filter((i) => i.id.length > 5) :
                state.allDogs.filter((i) => i.id.toString().length < 5)
            return {
                ...state,
                dogs: action.payload === 'ALL' ? state.dogs : filterByDataSource
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.dogs;
            let DogsFilter = [];
            if (action.payload === "ALL") {
                DogsFilter = allDogs;
            } else {

                for (let i = 0; i < allDogs.length; i++) {

                    let found = allDogs[i].tempers.find((t) => t.name === action.payload);

                    if (found) {
                        DogsFilter.push(allDogs[i]);

                    }
                }
            }

         return {
                //return funciona correcto
                ...state,
                dogs: DogsFilter
            }

      

        case ORDER_BY_NAME:
            const allDogsOrder = [...state.dogs]
            if (action.payload === 'ASC') {
                allDogsOrder.sort((a, b) => a.name.localeCompare(b.name))
            } else if (action.payload === 'DESC') {
                allDogsOrder.sort((a, b) => b.name.localeCompare(a.name))
            }
            return {
                ...state,
                dogs: action.payload === 'ALL' ? state.dogs : allDogsOrder
            }


        case ORDER_BY_WEIGHT:
            // const allDogsOrderW = [...state.dogs]
            // if (action.payload === 'WMIN') {
            //    allDogsOrderW.sort((a,b) => parseInt(a.weight.split(" - ")[0].localeCompare(parseInt(b.weight.split(" - ")[0]))))

            //    //const x = allDogsOrderW[0].weight.split(" - ")
            //    // console.log (x[0])
            // }

            const allDogsOrderW = [...state.dogs]
            if (action.payload === "WMIN") {
                allDogsOrderW.sort((a, b) => {
                    if (parseInt(a.weight.split(" - ")[0]) < parseInt(b.weight.split(" - ")[0])) {
                        return -1;
                    }
                    if (parseInt(b.weight.split(" - ")[0]) > parseInt(a.weight.split(" - ")[0])) {
                        return 1;
                    }
                    return 0;
                })
            } else if (action.payload === "WMAX") {

                allDogsOrderW.sort((a, b) => {
                    if (parseInt(a.weight.split(" - ")[0]) > parseInt(b.weight.split(" - ")[0])) {
                        return -1;
                    }
                    if (parseInt(b.weight.split(" - ")[0]) < parseInt(a.weight.split(" - ")[0])) {
                        return 1;
                    }
                    return 0;
                });
            }
            return {
                ...state,
                dogs: action.payload === 'ALL' ? state.dogs : allDogsOrderW,
            };


            case SET_ERROR:
                
                return {
                    ...state,
                    errors: action.payload
                };

            case CLEAR_ERROR:
                return {
                    ...state,
                    errors:undefined
                }


        // return {
        //     ...state,
        //     dogs: action.payload === 'ALL' ? state.dogs : allDogsOrderW
        // }



        default:
            return state;
    }


}

export default rootReducer;