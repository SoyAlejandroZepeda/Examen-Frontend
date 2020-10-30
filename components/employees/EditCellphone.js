import React, { useState, useEffect, useContext } from 'react';
import EmployeeContext from '../../context/employees/EmployeeContext';

const EditCellphone = ({ employee, cellphoneEdit }) => {

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addCellphone } = employeeContext

    const [ cellphone, setCellphone ] = useState(cellphoneEdit);

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
                    type="number"
                    placeholder="Ingrese el número celular"
                    autoComplete="off"
                    spellCheck="false"
                    autoFocus
                    onChange={ e => setCellphone(e.target.value) }
                    defaultValue={ cellphoneEdit }
                />
            </div>

        </>
    );
}
 
export default EditCellphone;