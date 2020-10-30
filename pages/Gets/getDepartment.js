import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_DEPARTMENT = gql`
    query getDepartment($id: ID!){
        getDepartment(id: $id){
            id
            departmentName
        }
    }
`;

const GetDepartment = ({ department }) => {

    const { data, loading, error } = useQuery(GET_DEPARTMENT, {
        variables: {
            id: department
        }
    })
    
    if(loading) return null;

    const { getDepartment } = data;
    const { departmentName } = getDepartment

    return ( 
        <td className="border px-4 py-2 text-sm"> { departmentName.toUpperCase() } </td>
    );
}
 
export default GetDepartment;