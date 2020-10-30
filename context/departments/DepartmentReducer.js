import {
     GET_DEPARTMENT_NAME,
     GET_COMPANY
} from '../../types';
 
 export default ( state, action ) => {
     switch(action.type) {
         case GET_DEPARTMENT_NAME: 
               return {
                    ...state,
                    departmentName: action.payload
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