import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import DepartmentContext from '../../context/departments/DepartmentContext';

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

    //Department context
    const departmentContext = useContext(DepartmentContext);
    const { addCompany } = departmentContext

    //Get costCenter
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

            <label className="block text-gray-700 text-sm font-bold mb-2">
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