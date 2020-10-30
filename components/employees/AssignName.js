import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const AssignName = ({ employee }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addName } = employeeContext

    const [ name, setName ] = useState('');

    useEffect(() => {
        updateName();
    }, [ name ])

    const updateName = () => {
        const newName = { ...employee, name: String( name ) }
        addName(newName)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Ingrese el nombre"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={ e => setName(e.target.value) }
                    value={ name }
                />
            </div>

        </>
    );
}
 
export default AssignName;