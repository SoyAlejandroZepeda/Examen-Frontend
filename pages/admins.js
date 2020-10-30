import React from 'react';
import User from '../components/User';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_USERS = gql`
     query getUsers {
          getUsers {
               id 
               name
               surname
               email
          }
     }
`;

const Admins = () => {

    //Routing
    const router = useRouter();

    //Get users query
    const { data, loading, error } = useQuery(GET_USERS);

    //Loading spinner
    if(loading) return(
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    );

    //if doesn't exist user data
    if(!localStorage.getItem('token')) {
        router.push('/login');
    }

    return ( 
        <div>
                <h1 className="text-2xl text-gray-800 font-light">Panel de administración</h1>

                <div className="overflow-x-scroll">
                    <table className="table-auto shadow-md mt-10 w-full w-lg text-center">
                        <thead className="bg-gray-800">
                            <tr className="text-white">
                                <th className="w-1/5 py-2">Nombre</th>
                                <th className="w-1/5 py-2">Email</th>
                                <th className="w-1/5 py-2">Eliminar</th>
                                <th className="w-1/5 py-2">Editar</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {data.getUsers.map(user => (
                                <User 
                                    key={user.id}
                                    user={user}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}
 
export default Admins;