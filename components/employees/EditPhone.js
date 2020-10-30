import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const EditPhone = ({ employee, phoneEdit }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addPhone } = employeeContext

    const [ phone, setPhone ] = useState(phoneEdit);

    useEffect(() => {
        updatePhone();
    }, [ phone ])

    const updatePhone = () => {
        const newPhone = { ...employee, phone: String( phone ) }
        addPhone(newPhone)
    }

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Teléfono Fijo
            </label>
            
            <div className="mb-4 mt-3">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                    id="phone"
                    type="number"
                    placeholder="Ingrese el número telefónico"
                    autoComplete="off"
                    spellCheck="false"
                    autoFocus
                    onChange={ e => setPhone(e.target.value) }
                    defaultValue={ phoneEdit }
                />
            </div>

        </>
    );
}
 
export default EditPhone;