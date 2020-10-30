import React from 'react';
import Layout from '../components/Layout';
import Employee from '../components/Employee';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

const GET_EMPLOYEES = gql`
    query getEmployees{
        getEmployees{
            id
            name
            surnameP
            surnameM
            company
            department
            created
        }
    }
`;

const Employees = () => {

    //Routing
    const router = useRouter();

    //Get departments query
    const { data, loading, error } = useQuery(GET_EMPLOYEES);

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
        return null;
    }

    return ( 
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Empleados</h1>

                <Link href="/newEmployee">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo empleado</a>
                </Link>

                <div className="overflow-x-scroll">
                    <table className="table-auto shadow-md mt-10 w-full w-lg text-center">
                        <thead className="bg-gray-800">
                            <tr className="text-white">
                                <th className="w-1/5 py-2">Empleado</th>
                                <th className="w-1/5 py-2">Empresa</th>
                                <th className="w-1/5 py-2">Departamento</th>
                                <th className="w-1/5 py-2">Fecha de ingreso</th>
                                <th className="w-1/5 py-2">Eliminar</th>
                                <th className="w-1/5 py-2">Editar</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {data.getEmployees.map(employee => (
                                <Employee 
                                    key={employee.id}
                                    employee={employee}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </div>
    );
}
 
export default Employees;