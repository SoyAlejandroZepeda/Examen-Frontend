import {
    GET_NAME,
    GET_SURNAMEP,
    GET_SURNAMEM,
    GET_EMAIL,
    GET_BIRTHDATE,
    GET_PHONE,
    GET_GENDER,
    GET_CELLPHONE,
    GET_COMPANY,
    GET_DEPARTMENT
} from '../../types';

export default ( state, action ) => {
    switch(action.type) {
        case GET_NAME: 
            return {
                ...state,
                name: action.payload
            }

        case GET_SURNAMEP: 
            return {
                ...state,
                surnameP: action.payload
            }

        case GET_SURNAMEM: 
            return {
                ...state,
                surnameM: action.payload
            }

        case GET_EMAIL: 
            return {
                ...state,
                email: action.payload
            }

        case GET_BIRTHDATE: 
            return {
                ...state,
                birthdate: action.payload
            }

        case GET_PHONE: 
            return {
                ...state,
                phone: action.payload
            }

        case GET_CELLPHONE: 
            return {
                ...state,
                cellphone: action.payload
            }

        case GET_GENDER: 
            return {
                ...state,
                gender: action.payload
            }

        case GET_DEPARTMENT: 
            return {
                ...state,
                department: action.payload
            }

        case GET_COMPANY: 
            return {
                ...state,
                company: action.payload
            }

        default:
            return state;
    }
}