import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const EditGender = ({ employee, genderEdit }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addGender } = employeeContext

    const [ gender, setGender ] = useState(genderEdit);

    useEffect(() => {
        updateGender();
    }, [ name ])

    const updateGender = () => {
        const newGender = { ...employee, gender: String( gender ) }
        addGender(newGender)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Género
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="gender"
                    type="text"
                    placeholder="Ingrese el género"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={ e => setGender(e.target.value) }
                    defaultValue={ genderEdit }
                />
            </div>

        </>
    );
}
 
export default EditGender;