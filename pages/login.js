import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Link from 'next/link';

const AUTH_USER = gql`
    mutation authUser($input: AuthInput){
        authUser(input: $input){
            token
        }
    }
`;

const Login = () => {  

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();

    //Auth user mutation
    const [ authUser ] = useMutation(AUTH_USER);

    //Form validation
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El correo no es valido.').required('El correo es obligatorio.'),
            password: Yup.string().required('La contraseña es obligatoria')
        }),
        onSubmit: async values => {
            const { email, password } = values;

            try {
                const { data } = await authUser({
                    variables : {
                        input: {
                            email,
                            password
                        }
                    }
                });

                //Login user successfully message
                saveMessage('Autenticando...');

                setTimeout(() => {
                    //Save token at localStorage
                    const { token } = data.authUser;
                    localStorage.setItem('token', token);
                }, 1000)

                setTimeout(() => {
                    saveMessage(null);
                    //Redirection to login
                    router.push('/');
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

                <h1 className="text-center text-2xl text-white font-light">Iniciar Sesión</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-8"
                            onSubmit={ formik.handleSubmit }
                        >
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
                                    autoFocus
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
                                className="bg-gray-800 w-full my-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                                value="Inciar Sesión"
                            />

                            <Link href="/register">
                                <a className="block m-auto text-center hover:underline">¿No tienes una cuenta? Registrate aquí</a>
                            </Link>

                        </form>

                    </div>
                </div>
            </Layout>
        </>
    );
}
 
export default Login;