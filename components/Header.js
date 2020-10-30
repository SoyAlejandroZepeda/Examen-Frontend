import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import client from '../config/apollo';

const GET_USER = gql`
    query getUser{
        getUser{
            id
            name
            surname
        }
    }
`;

const Header = () => {

    //Routing
    const router = useRouter();

    //Get user query
    const { data, loading, error } = useQuery(GET_USER);

    //Protect data before to get information
    if(loading) return null;

    const { name, surname } = data.getUser;

    //Function to logout
    const logout = () => {
        setTimeout(() => {
            localStorage.removeItem('token');
            client.clearStore();
            router.push('/login');
        }, 3000);
    }

    return ( 
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 text-center lg:mb-0">USUARIO: <span className="font-bold"> {name.toUpperCase()} {surname.toUpperCase()} </span> </p>

            <button 
                onClick={ () => logout() }
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}
 
export default Header;