import axios from 'axios';
export const GET_DOGS = 'GET_DOGS';
export const GET_DOG = 'GET_DOG';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_DATA_SOURCE = 'FILTER_BY_DATA_SOURCE';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR'

const {API_URL} = process.env;

export function getDogs() {
    return async function (dispatch) {
        try {
            var json = await axios.get(API_URL + "/dogs"); 
            return dispatch({ type: GET_DOGS, payload: json.data })
        }
        catch (error) {
            return dispatch({ type: SET_ERROR, payload: error })

        }
    }
}

export function getDog(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(API_URL + "/dogs?name=" + name);
            return dispatch({ type: GET_DOG, payload: json.data });

        } catch (error) 
        {
            return dispatch({ type: SET_ERROR, payload: error })
        } 
            

    }
}

export function getDetail(id) {
    console.log('Estoy en action: ' + id)
    return async function (dispatch) {
        try {
            var json = await axios.get(API_URL + "/dogs/" + id);
            return dispatch({ type: GET_DETAIL, payload: json.data });

        } catch (error) {
            return dispatch({ type: SET_ERROR, payload: error })

        }

    }
}



export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get(API_URL + "/temperaments");

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

export function CreateBreed(payload) {
    return async function (dispatch) {
        const sendinfo = await axios.post(API_URL + "/dogs/", payload)
        return sendinfo

    }

}

export function ClearError() {
    return { type: CLEAR_ERROR }
}
