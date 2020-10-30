import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import EmployeeContext from '../../context/employees/EmployeeContext';

const GET_DEPARTMENTS = gql`
    query getDepartments{
        getDepartments{
            id
            departmentName
        }
    }
`;

const AssignDepartment = () => {

    const [ department, setDepartment ] = useState([]);

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addDepartment } = employeeContext

    //Get Department
    const { data, loading, error } = useQuery(GET_DEPARTMENTS);

    useEffect(() => {
        addDepartment(department)
    }, [ department ]);
    
    const getDepartment = department => {
        setDepartment(department);
    }

    if(loading) return null;

    const { getDepartments } = data;

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Departamento
            </label>

            <Select
                className="mt-3"
                options={ getDepartments } 
                onChange={ option => getDepartment(option) }
                getOptionValue={ options => options.id }
                getOptionLabel={ options => options.departmentName }
                placeholder="Busque o seleccione un departamento"
                noOptionsMessage={() => "No hay resultados"}
            />
        </>
    );
}
 
export default AssignDepartment;