import axios from 'axios';
export const GET_DOGS = 'GET_DOGS';
export const GET_DOG = 'GET_DOG';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_DATA_SOURCE = 'FILTER_BY_DATA_SOURCE';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT'

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({ type: GET_DOGS, payload: json.data })
    }
}

export function getDog(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({ type: GET_DOG, payload: json.data });

        } catch (error) { console.log(error) }
    }
}

export function getDetail(id) {
    console.log('Estoy en action: ' + id)
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch({ type: GET_DETAIL, payload: json.data });

        } catch (error) { console.log(error) }
    }
}



export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperaments");

        return dispatch({ type: GET_TEMPERAMENTS, payload: json.data })
    }
}
export function filterByDataSource(payload) {
    return {
        type: FILTER_BY_DATA_SOURCE,
        payload
    }
}

export function filterByTemperament(payload) {
    console.log(payload);
    console.log("jpña");
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByWeight(payload) {
    console.log(payload)
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function CreateDog(payload){
    return async  function(dispatch) {
        const sendinfo = await axios.post("http://localhost:3001/dogs/" , payload)
        return sendinfo

    }

}