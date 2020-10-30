import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const EditBirthdate = ({ employee, birthdateEdit }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addBirthdate } = employeeContext

    const [ birthdate, setBirthdate ] = useState(birthdateEdit);

    useEffect(() => {
        updateBirthdate();
    }, [ birthdate ])

    const updateBirthdate = () => {
        const newBirthdate = { ...employee, birthdate: String( birthdate ) }
        addBirthdate(newBirthdate)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Fecha de nacimiento
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="birthdate"
                    type="date"
                    placeholder="Ingrese la fecha de nacimiento"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={ e => setBirthdate(e.target.value) }
                    defaultValue={ birthdateEdit }
                />
            </div>

        </>
    );
}
 
export default EditBirthdate;