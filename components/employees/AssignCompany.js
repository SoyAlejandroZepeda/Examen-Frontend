import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import EmployeeContext from '../../context/employees/EmployeeContext';

const GET_COMPANIES = gql`
    query getCompanies{
        getCompanies{
            id
            companyName
        }
    }
`;

const AssignCompany = () => {

    const [ company, setCompany ] = useState([]);

    //Employee context
    const employeeContext = useContext(EmployeeContext);
    const { addCompany } = employeeContext

    //Get Company
    const { data, loading, error } = useQuery(GET_COMPANIES);

    useEffect(() => {
        addCompany(company)
    }, [ company ]);
    
    const getCompany = company => {
        setCompany(company);
    }

    if(loading) return null;

    const { getCompanies } = data;

    return ( 
        <>

            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Empresa
            </label>

            <Select
                className="mt-3"
                options={ getCompanies } 
                onChange={ option => getCompany(option) }
                getOptionValue={ options => options.id }
                getOptionLabel={ options => options.companyName }
                placeholder="Busque o seleccione una empresa"
                noOptionsMessage={() => "No hay resultados"}
            />
        </>
    );
}
 
export default AssignCompany;