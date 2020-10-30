import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const AssignEmail = ({ employee }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addEmail } = employeeContext

    const [ email, setEmail ] = useState('');

    useEffect(() => {
        updateEmail();
    }, [ email ])

    const updateEmail = () => {
        const newEmail = { ...employee, email: String( email ) }
        addEmail(newEmail)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Correo Electrónico
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Ingrese el correo"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={ e => setEmail(e.target.value) }
                    value={ email }
                />
            </div>

        </>
    );
}
 
export default AssignEmail;