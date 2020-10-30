import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AssignDepartmentName from '../components/departments/AssignDepartmentName';
import AssignCompany from '../components/departments/AssignCompany';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const NEW_DEPARTMENT = gql`
    mutation newDepartment($input: DepartmentInput){
        newDepartment(input: $input){
            id
        }
    }
`;

const GET_DEPARTMENTS = gql`
    query getDepartments{
        getDepartments{
            id
            departmentName
            company
        }
    }
`;

//Context Department
import DepartmentContext from '../context/departments/DepartmentContext';

const NewDepartment = () => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();

    //Extract functions and values to context
    const departmentContext = useContext(DepartmentContext);
    const { departmentName, company } = departmentContext;

    //New department mutation
    const [ newDepartment ] = useMutation(NEW_DEPARTMENT, {
        update(cache, { data: { newDepartment } }) {
            //Get objetc cache
            const { getDepartments } = cache.readQuery({ query: GET_DEPARTMENTS });

            //Rewritte cache (THE CACHE NEVER SHOULD MODIFIED)
            cache.writeQuery({
                query: GET_DEPARTMENTS,
                data: {
                    getDepartments: [...getDepartments, newDepartment]
                }
            });
        }
    });

    const createNewDepartment = async () => {

        try {
            const { data } = await newDepartment({
                variables: {
                    input: {
                        departmentName: departmentName.departmentName,
                        company: company.id,
                    }
                }
            });

            //Show alert
            Swal.fire({
                icon: 'success',
                title: 'Departamento creado correctamente',
                showConfirmButton: false,
                timer: 3000
            });

            setTimeout(() => {      
                saveMessage(null);        
                //Redirection to departments
                router.push('/departments');
            }, 3000);

        } catch (error) {
            //Error created user message
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

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Departamento</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg bg-white shadow-md px-8 pt-6 pb-8 mb-4">

                    <AssignDepartmentName />
                    <AssignCompany />

                    <button
                        type="button"
                        className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 `}
                        onClick={ () => createNewDepartment() }
                    >
                        Registrar Departamento
                    </button>

                </div>
            </div>

            
        </Layout>
    );
}
 
export default NewDepartment;