import React, { useState } from 'react';  
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const GET_USER_ADMIN = gql`
    query getUserAdmin($id: ID!){
          getUserAdmin(id: $id){
               id
               name
               surname
               email
          }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $input: UserInput){
          updateUser(id: $id, input: $input){
               id
               name
               surname
               email
          }
     }
`;

const EditUser = () => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();
    const { query: { id } } = router;

    //Get User
    const { data, loading, error } = useQuery(GET_USER_ADMIN, {
        variables: {
            id
        }
    });

    //Update user
    const [ updateUser ] = useMutation(UPDATE_USER)

    //Schema validation
    const schemaValidation = Yup.object({
        name: Yup.string().required('El nombre es obligatorio.'),
        surname: Yup.string().required('El apellido es obligatorio.'),
        email: Yup.string().email('El correo no es valido.').required('El correo es obligatorio.')
    });

    //Loading spinner
    if(loading) return(
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    );

    const { getUserAdmin } = data;

    //Modified user
    const updateInfoUser = async values => {
        const { name, surname, email } = values;

        try {
            const { data } = await updateUser({
                variables: {
                    id,
                    input: {
                        name,
                        surname,
                        email
                    }
                }
            });

            //Show alert
            Swal.fire({
                icon: 'success',
                title: 'Administrador actualizado correctamente',
                showConfirmButton: false,
                timer: 3000
            });

            setTimeout(() => {
                //Redirection user
                router.push('/');
            },3000);

        } catch (error) {
            //Error user message
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
            <h1 className="text-2xl text-gray-800 font-light">Editar Administrador</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidation }
                        enableReinitialize
                        initialValues={ getUserAdmin }
                        onSubmit={ (values) => {
                            updateInfoUser(values)
                        }}
                    >
                        { props => {
                            return(
                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ props.handleSubmit }
                                >

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Nombre 
                                        </label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="Ingrese el nombre"
                                            autoComplete="off"
                                            spellCheck="false"
                                            autoFocus
                                            value={ props.values.name }
                                            onChange={ props.handleChange }
                                            onBlur={ props.handleBlur }
                                        />
                                    </div>

                                    { props.touched.name && props.errors.name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold"> { props.errors.name } </p>
                                        </div>
                                    ) : null }

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                            Apellido 
                                        </label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                            id="surname"
                                            type="text"
                                            placeholder="Ingrese el apellido"
                                            autoComplete="off"
                                            spellCheck="false"
                                            autoFocus
                                            value={ props.values.surname }
                                            onChange={ props.handleChange }
                                            onBlur={ props.handleBlur }
                                        />
                                    </div>

                                    { props.touched.surname && props.errors.surname ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold"> { props.errors.surname } </p>
                                        </div>
                                    ) : null }

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            Correo Electrónico 
                                        </label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Ingrese el correo"
                                            autoComplete="off"
                                            spellCheck="false"
                                            autoFocus
                                            value={ props.values.email }
                                            onChange={ props.handleChange }
                                            onBlur={ props.handleBlur }
                                        />
                                    </div>

                                    { props.touched.email && props.errors.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold"> { props.errors.email } </p>
                                        </div>
                                    ) : null }

                                    <input 
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                                        value="Editar administrador"
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
 
export default EditUser;