import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_COMPANY = gql`
    query getCompany($id: ID!){
          getCompany(id: $id){
               id
               companyName
        }
    }
`;

const GetCompany = ({ company }) => {

     const { data, loading, error } = useQuery(GET_COMPANY, {
          variables: {
                id: company
          }
     });
    
    if(loading) return null;

    const { getCompany } = data;
    const { companyName } = getCompany

    return ( 
        <td className="border px-4 py-2 text-sm"> { companyName.toUpperCase() } </td>
    );
}
 
export default GetCompany;