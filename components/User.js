import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';
import client from '../config/apollo';

const DELETE_USER = gql`
    mutation deleteUser($id: ID!){
        deleteUser(id: $id)
    }
`;

const GET_USERS = gql`
    query getUsers{
        getUsers{
            id
            name
            surname
            email
        }
    }
`;

const Admin = ({ user }) => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();

    //Delete user mutation
    const [ deleteUser ] = useMutation(DELETE_USER, {
        update(cache) {
            //Get object cache
            const { getUsers } = cache.readQuery({ query: GET_USERS });

            //Rewritte cache (THE CACHE NEVER SHOULD MODIFIED)
            cache.writeQuery({
                query:  GET_USERS, 
                data: {
                    getUsers: getUsers.filter( userCurrent => userCurrent.id !== id )
                }
            });
        }
    });

    const { id, name, surname, email } = user;

    //Delete department
    const confirmDeleteUser = () => {
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
                    const { data } = await deleteUser({
                        variables: {
                            id
                        }
                    });

                    //Show Alert
                    Swal.fire({
                        title: 'Eliminado',
                        text: data.deleteUser,
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
                        logout();
                    }, 3000);
                }
            }
        });
    }

    //Function to logout
    const logout = () => {
        localStorage.removeItem('token');
        client.clearStore();
        router.push('/login');
    }

    //Edit user
    const editUser = () => {
        Router.push({
            pathname : "/editUser/[id]",
            query: { id }
        })
    }

    return ( 
        <tr>
            <td className="border px-4 py-2 text-sm"> { name.toUpperCase() } { surname.toUpperCase() } </td>
            <td className="border px-4 py-2 text-sm"> { email } </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 lg:w-1/2 sm:w-full text-white rounded text-xs uppercase font-bold m-auto"
                    onClick={ () => confirmDeleteUser() }
                >
                    Eliminar
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2" stroke="currentColor"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                </button>
            </td>

            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-yellow-600 py-2 px-4 lg:w-1/2 sm:w-full text-white rounded text-xs uppercase font-bold m-auto"
                    onClick={ () => editUser() }
                >
                    Editar
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </td>
        </tr>
    );
}
 
export default Admin;