import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const AssignSurnameM = ({ employee }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addSurnameM } = employeeContext

    const [ surnameM, setSurnameM ] = useState('');

    useEffect(() => {
        updateSurnameM();
    }, [ surnameM ])

    const updateSurnameM = () => {
        const newSurnameM = { ...employee, surnameM: String( surnameM ) }
        addSurnameM(newSurnameM)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Apellido Materno
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="surnameM"
                    type="text"
                    placeholder="Ingrese el apellido materno"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={ e => setSurnameM(e.target.value) }
                    value={ surnameM }
                />
            </div>

        </>
    );
}
 
export default AssignSurnameM;