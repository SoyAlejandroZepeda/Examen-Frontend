import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import EditDepartmentName from '../../components/departments/EditDepartmentName';
import EditCompany from '../../components/departments/EditCompany';
import { useQuery, useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';


const GET_DEPARTMENT = gql`
    query getDepartment($id: ID!){
        getDepartment(id: $id){
            id
            departmentName
            company
        }
    }
`;

const UPDATE_DEPARTMENT = gql`
    mutation updateDepartment($id: ID!, $input: DepartmentInput){
        updateDepartment(id: $id, input: $input){
            id
        }
    }
`;

//Context Department
import DepartmentContext from '../../context/departments/DepartmentContext';

const EditDepartment = () => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();
    const { query: { id } } = router;

    //Extract functions and values to context
    const departmentContext = useContext(DepartmentContext);
    const { departmentName, company } = departmentContext

    const { data, loading, error } = useQuery(GET_DEPARTMENT, {
        variables: {
            id
        }
    });

    //Update Department
    const [ updateDepartment ] = useMutation(UPDATE_DEPARTMENT)

    //Loading spinner
    if(loading) return(
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    );

    const { getDepartment } = data;

    //Modified department
    const updateInfoDepartment = async () => {

        try {
            const { data } = await updateDepartment({
                variables: {
                    id,
                    input: { 
                        departmentName: departmentName.departmentName,
                        company: company.id
                    }
                }
            });

            //Show alert
            Swal.fire({
                icon: 'success',
                title: 'Empleado actualizado correctamente',
                showConfirmButton: false,
                timer: 3000
            });

            setTimeout(() => {
                //Redirection user
                router.push('/departments');
            },3000);

        } catch (error) {
            //Error department message
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
            <h1 className="text-2xl text-gray-800 font-light">Editar Departamento</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg bg-white shadow-md px-8 pt-6 pb-8 mb-4">

                    <EditDepartmentName 
                        departmentNameEdit={getDepartment.departmentName}
                    />
                    <EditCompany 
                        companyEdit={getDepartment.company}
                    /> 

                    <button
                        type="button"
                        className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900  `}
                        onClick={ () => updateInfoDepartment() }
                    >
                        Editar Departamento
                    </button>

                </div>
            </div>
        </Layout>
    );
}
 
export default EditDepartment;