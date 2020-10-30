import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const EditSurnameP = ({ employee, surnamePEdit }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addSurnameP } = employeeContext

    const [ surnameP, setSurnameP ] = useState(surnamePEdit);

    useEffect(() => {
        updateSurnameP();
    }, [ surnameP ])

    const updateSurnameP = () => {
        const newSurnameP = { ...employee, surnameP: String( surnameP ) }
        addSurnameP(newSurnameP)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Apellido Paterno
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="surnameP"
                    type="text"
                    placeholder="Ingrese el apellido paterno"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={ e => setSurnameP(e.target.value) }
                    defaultValue={ surnamePEdit }
                />
            </div>

        </>
    );
}
 
export default EditSurnameP;