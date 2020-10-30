import React, { useState, useEffect, useContext } from 'react';
import DepartmentContext from '../../context/departments/DepartmentContext';

const AssignDepartmentName = ({ department }) => {

    //Department context
    const departmentContext = useContext(DepartmentContext);
    const { addDepartmentName } = departmentContext

    const [ departmentName, setDepartmentName ] = useState('');

    useEffect(() => {
        updateDepartmentName();
    }, [ departmentName ])

    const updateDepartmentName = () => {
        const newDepartmentName = { ...department, departmentName: String( departmentName ) }
        addDepartmentName(newDepartmentName)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre del departamento
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="departmentName"
                    type="text"
                    placeholder="Ingrese el nombre del departamento"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={ e => setDepartmentName(e.target.value) }
                    value={ departmentName }
                />
            </div>

        </>
    );
}
 
export default AssignDepartmentName;