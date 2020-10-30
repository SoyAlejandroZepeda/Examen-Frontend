import React, { useReducer } from 'react';
import DepartmentContext from './DepartmentContext';
import DepartmentReducer from './DepartmentReducer';

import {
    GET_DEPARTMENT_NAME,
    GET_COMPANY,
} from '../../types';

const DepartmentState = ({ children }) => {

    //State Department
    const initialState = {
        departmentName: '',
        company: {},
    }

    const [ state, dispatch ] = useReducer(DepartmentReducer, initialState);

     //Modified departmentName
     const addDepartmentName = newDepartment => {
          dispatch({
               type: GET_DEPARTMENT_NAME,
               payload: newDepartment
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
        <DepartmentContext.Provider
            value={{
                departmentName: state.departmentName,
                company: state.company,
                addDepartmentName,
                addCompany
            }}
        >{ children }

        </DepartmentContext.Provider>
    );
}

export default DepartmentState;
