import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const AssignCellphone = ({ employee }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addCellphone } = employeeContext

    const [ cellphone, setCellhone ] = useState('');

    useEffect(() => {
        updateCellphone();
    }, [ cellphone ])

    const updateCellphone = () => {
        const newCellphone = { ...employee, cellphone: String( cellphone ) }
        addCellphone(newCellphone)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Teléfono Celular
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="cellphone"
                    type="text"
                    placeholder="Ingrese el número celular"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={ e => setCellhone(e.target.value) }
                    value={ cellphone }
                />
            </div>

        </>
    );
}
 
export default AssignCellphone;