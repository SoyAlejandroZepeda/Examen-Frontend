import React, { useReducer } from 'react';
import EmployeeContext from './EmployeeContext';
import EmployeeReducer from './EmployeeReducer';

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

const EmployeeState = ({ children }) => {

    //State Employee
    const initialState = {
        name: '',
        surnameP: '',
        surnameM: '',
        email: '',
        birthdate: '',
        phone: '',
        cellphone: '',
        gender: '',
        department: {},
        company: {}
    }

    const [ state, dispatch ] = useReducer(EmployeeReducer, initialState);

    //Modified name
    const addName = newName => {
        dispatch({
            type: GET_NAME,
            payload: newName
        });
    }

    //Modified surnameP
    const addSurnameP = newSurnameP => {
        dispatch({
            type: GET_SURNAMEP,
            payload: newSurnameP
        });
    }

    //Modified surnameM
    const addSurnameM = newSurnameM => {
        dispatch({
            type: GET_SURNAMEM,
            payload: newSurnameM
        });
    }

    //Modified email
    const addEmail = newEmail => {
        dispatch({
            type: GET_EMAIL,
            payload: newEmail
        });
    }

    //Modified birthdate
    const addBirthdate = newBirthdate => {
        dispatch({
            type: GET_BIRTHDATE,
            payload: newBirthdate
        });
    }

    //Modified phone
    const addPhone = newPhone => {
        dispatch({
            type: GET_PHONE,
            payload: newPhone
        });
    }

    //Modified cellphone
    const addCellphone = newCellphone => {
        dispatch({
            type: GET_CELLPHONE,
            payload: newCellphone
        });
    }

    //Modified gender
    const addGender = newGender => {
        dispatch({
            type: GET_GENDER,
            payload: newGender
        });
    }

    //Modified department
    const addDepartment = department => {
        dispatch({
            type: GET_DEPARTMENT,
            payload: department
        });
    }

    //Modified company
    const addCompany = company => {
        dispatch({
            type: GET_COMPANY,
            payload: company
        });
    }

    return(
        <EmployeeContext.Provider
            value={{
                name: state.name,
                surnameP: state.surnameP,
                surnameM: state.surnameM,
                email: state.email,
                birthdate: state.birthdate,
                phone: state.phone,
                cellphone: state.cellphone,
                gender: state.gender,
                department: state.department,
                company: state.company,
                addName,
                addSurnameP,
                addSurnameM,
                addEmail,
                addBirthdate,
                addPhone,
                addCellphone,
                addGender,
                addDepartment,
                addCompany
            }}
        >{ children }

        </EmployeeContext.Provider>
    );
}

export default EmployeeState;
