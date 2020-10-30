import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NEW_USER = gql`
    mutation newUser($input: UserInput){
        newUser(input: $input){
            id
            name
            surname
            email
        }
    }
`;

const Register = () => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();

    //New user mutation
    const [ newUser ] = useMutation(NEW_USER);

    //Form validation
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio.'),
            surname: Yup.string().required('El apellido es obligatorio.'),
            email: Yup.string().email('El correo no es valido.').required('El correo es obligatorio.'),
            password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe ser de al menos 6 caracteres.')
        }),
        onSubmit: async values => {
            const { name, surname, email, password } = values;

            try {
                const { data } = await newUser({
                    variables : {
                        input: {
                            name,
                            surname,
                            email,
                            password
                        }
                    }
                });

                //Created user successfully message
                saveMessage('Usuario creado correctamente.');

                setTimeout(() => {
                    saveMessage(null);
                    //Redirection to login
                    router.push('/login');
                }, 3000);

            } catch (error) {
                //Error created user message
                saveMessage(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    saveMessage(null);
                }, 3000);
            }
        }
    });

    /**TO DO Loading... */

    //Show message method
    const showMessage = () => {
        return (
            <div className="bg-gray-300 border-l-4 border-gray-600 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p> { message } </p>
            </div>
        );
    }

    return ( 
        <>
            <Layout>

                { message && showMessage() }

                <h1 className="text-center text-2xl text-white font-light">Crear nueva cuenta</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-8"
                            onSubmit={ formik.handleSubmit }
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Nombre
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Ingrese su nombre"
                                    autoComplete="off"
                                    spellCheck="false"
                                    autoFocus
                                    value={ formik.values.name }
                                    onChange={ formik.handleChange }
                                    onBlur={ formik.handleBlur }
                                />
                            </div>

                            { formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> { formik.errors.name } </p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                                    Apellido
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                    id="surname"
                                    type="text"
                                    placeholder="Ingrese su apellido"
                                    autoComplete="off"
                                    spellCheck="false"
                                    value={ formik.values.surname }
                                    onChange={ formik.handleChange }
                                    onBlur={ formik.handleBlur }
                                />
                            </div>

                            { formik.touched.surname && formik.errors.surname ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> { formik.errors.surname } </p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Ingrese su email"
                                    autoComplete="off"
                                    spellCheck="false"
                                    value={ formik.values.email }
                                    onChange={ formik.handleChange }
                                    onBlur={ formik.handleBlur }
                                />
                            </div>

                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> { formik.errors.email } </p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus: shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    autoComplete="off"
                                    spellCheck="false"
                                    value={ formik.values.password }
                                    onChange={ formik.handleChange }
                                    onBlur={ formik.handleBlur }
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> { formik.errors.password } </p>
                                </div>
                            ) : null }

                            <input 
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                                value="Crear cuenta"
                            />

                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}
 
export default Register;