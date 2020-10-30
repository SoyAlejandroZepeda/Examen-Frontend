import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';

const DELETE_COMPANY = gql`
    mutation deleteCompany($id: ID!){
        deleteCompany(id: $id)
    }
`;

const GET_COMPANIES = gql`
    query getCompanies{
        getCompanies{
            id
            companyName
        }
    }
`;

const Company = ({ company }) => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Delete company mutation
    const [ deleteCompany ] = useMutation(DELETE_COMPANY, {
        update(cache) {
            //Get object cache
            const { getCompanies } = cache.readQuery({ query: GET_COMPANIES });

            //Rewritte cache (THE CACHE NEVER SHOULD MODIFIED)
            cache.writeQuery({
                query:  GET_COMPANIES, 
                data: {
                    getCompanies: getCompanies.filter( companyCurrent => companyCurrent.id !== id )
                }
            });
        }
    });

    const { id, companyName } = company;

    //Delete department
    const confirmDeleteCompany = () => {
        Swal.fire({
            title: '¿Desea eliminar este registro?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then( async (result) => {
            if (result.value) {
                try {
                    //Delete for id
                    const { data } = await deleteCompany({
                        variables: {
                            id
                        }
                    });

                    //Show Alert
                    Swal.fire({
                        title: 'Eliminado',
                        text: data.deleteCompany,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } catch (error) {   
                    //Error company message
                    saveMessage(error.message.replace('GraphQL error: ', ''));

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message,
                        showConfirmButton: false,
                        timer: 3000
                    });

                    setTimeout(() => {
                        saveMessage(null);
                    }, 3000);
                }
            }
        });
    }

    //Edit company
    const editCompany = () => {
        Router.push({
            pathname : "/editCompany/[id]",
            query: { id }
        })
    }

    return ( 
        <tr>
            <td className="border px-4 py-2 text-sm"> { companyName.toUpperCase() } </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 lg:w-1/2 sm:w-full text-white rounded text-xs uppercase font-bold m-auto"
                    onClick={ () => confirmDeleteCompany() }
                >
                    Eliminar
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2" stroke="currentColor"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                </button>
            </td>

            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-yellow-600 py-2 px-4 lg:w-1/2 sm:w-full text-white rounded text-xs uppercase font-bold m-auto"
                    onClick={ () => editCompany() }
                >
                    Editar
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </td>
        </tr>
    );
}
 
export default Company;