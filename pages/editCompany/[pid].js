import React, { useState } from 'react';  
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const GET_COMPANY = gql`
    query getCompany($id: ID!){
          getCompany(id: $id){
               id
               companyName
          }
    }
`;

const UPDATE_COMPANY = gql`
    mutation updateCompany($id: ID!, $input: CompanyInput){
          updateCompany(id: $id, input: $input){
               id
               companyName
          }
     }
`;

const EditCompany = () => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();
    const { query: { id } } = router;

    //Get Company
    const { data, loading, error } = useQuery(GET_COMPANY, {
        variables: {
            id
        }
    });

    //Update Company
    const [ updateCompany ] = useMutation(UPDATE_COMPANY)

    //Schema validation
    const schemaValidation = Yup.object({
        companyName: Yup.string().required('El nombre de la empresa es obligatorio.'),
    });

    //Loading spinner
    if(loading) return(
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    );

    const { getCompany } = data;

    //Modified department
    const updateInfoCompany = async values => {
        const { companyName } = values;

        try {
            const { data } = await updateCompany({
                variables: {
                    id,
                    input: {
                        companyName
                    }
                }
            });

            //Show alert
            Swal.fire({
                icon: 'success',
                title: 'Empresa actualizada correctamente',
                showConfirmButton: false,
                timer: 3000
            });

            setTimeout(() => {
                //Redirection user
                router.push('/companies');
            },3000);

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

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Empresa</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidation }
                        enableReinitialize
                        initialValues={ getCompany }
                        onSubmit={ (values) => {
                            updateInfoCompany(values)
                        }}
                    >
                        { props => {
                            return(
                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ props.handleSubmit }
                                >

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                                            Nombre de la empresa
                                        </label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                            id="companyName"
                                            type="text"
                                            placeholder="Ingrese el nombre de la empresa"
                                            autoComplete="off"
                                            spellCheck="false"
                                            autoFocus
                                            value={ props.values.companyName }
                                            onChange={ props.handleChange }
                                            onBlur={ props.handleBlur }
                                        />
                                    </div>

                                    { props.touched.companyName && props.errors.companyName ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold"> { props.errors.companyName } </p>
                                        </div>
                                    ) : null }

                                    <input 
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                                        value="Editar empresa"
                                    />

                                </form>
                            )
                        }}

                    </Formik>

                </div>
            </div>
        </Layout>
    );
}
 
export default EditCompany;