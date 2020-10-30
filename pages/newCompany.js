import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const NEW_COMPANY = gql`
    mutation newCompany($input: CompanyInput){
        newCompany(input: $input){
            id
        }
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

const NewCompany = () => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();

    //Auth user mutation
    const [ newCompany ] = useMutation(NEW_COMPANY, {
        update(cache, { data: { newCompany } }) {
            //Get object cache
            const { getCompanies } = cache.readQuery({ query: GET_COMPANIES });

            //Rewritte cache (THE CACHE NEVER SHOULD MODIFIED)
            cache.writeQuery({
                query:  GET_COMPANIES, 
                data: {
                    getCompanies: [...getCompanies, newCompany]
                }
            });
        }
    });

    //Form validation
    const formik = useFormik({
        initialValues: {
            companyName: '',
        },
        validationSchema: Yup.object({
            companyName: Yup.string().required('El nombre de la empresa es obligatorio.'),
        }),
        onSubmit: async values => {
            const { companyName } = values;

            try {
                const { data } = await newCompany({
                    variables : {
                        input: {
                            companyName
                        }
                    }
                });

                //Show alert
                Swal.fire({
                    icon: 'success',
                    title: 'Empresa creada correctamente',
                    showConfirmButton: false,
                    timer: 3000
                });

                setTimeout(() => {      
                    saveMessage(null);        
                    //Redirection to companies
                    router.push('/companies');
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
    });

    return ( 
        <Layout>

            <h1 className="text-2xl text-gray-800 font-light">Nueva Empresa</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={ formik.handleSubmit }
                    >

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                                Nombre de la empresa
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                id="companyName"
                                type="text"
                                placeholder="Ingrese el nombre de de la empresa"
                                autoComplete="off"
                                spellCheck="false"
                                autoFocus
                                value={ formik.values.companyName }
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                            />
                        </div>

                        { formik.touched.companyName && formik.errors.companyName ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> { formik.errors.companyName } </p>
                            </div>
                        ) : null }

                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                            value="Registrar empresa"
                        />

                    </form>
                </div>
            </div>
        </Layout>
    );
}
 
export default NewCompany;