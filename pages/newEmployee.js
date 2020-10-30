import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AssignName from '../components/employees/AssignName';
import AssignSurnameP from '../components/employees/AssignSurnameP';
import AssignSurnameM from '../components/employees/AssignSurnameM';
import AssignEmail from '../components/employees/AssignEmail';
import AssignPhone from '../components/employees/AssignPhone';
import AssignCellphone from '../components/employees/AssignCellphone';
import AssignGender from '../components/employees/AssignGender';
import AssignBirthdate from '../components/employees/AssignBirthdate';
import AssignCompany from '../components/employees/AssignCompany';
import AssignDepartment from '../components/employees/AssignDepartment';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const NEW_EMPLOYEE = gql`
    mutation newEmployee($input: EmployeeInput){
        newEmployee(input: $input){
            id
        }
    }
`;

const GET_EMPLOYEES = gql`
    query getEmployees{
        getEmployees{
            id
            name
            surnameP
            surnameM
            company
            department
        }
    }
`;

//Context Employee
import EmployeeContext from '../context/employees/EmployeeContext';

const NewEmployee = () => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();

    //Extract functions and values to context
    const employeeContext = useContext(EmployeeContext);
    const { name, surnameP, surnameM, email, birthdate, phone, cellphone, gender, company, department } = employeeContext

    //New employee mutation
    const [ newEmployee ] = useMutation(NEW_EMPLOYEE, {
        update(cache, { data: { newEmployee } }) {
            //Get objetc cache
            const { getEmployees } = cache.readQuery({ query: GET_EMPLOYEES });

            //Rewritte cache (THE CACHE NEVER SHOULD MODIFIED)
            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: {
                    getEmployees: [...getEmployees, newEmployee]
                }
            });
        }
    });

    const createNewEmloyee = async () => {

        try {
            const { data } = await newEmployee({
                variables: {
                    input: {
                        name: name.name,
                        surnameP: surnameP.surnameP,
                        surnameM: surnameM.surnameM,
                        email: email.email,
                        birthdate: birthdate.birthdate,
                        phone: phone.phone,
                        cellphone: cellphone.cellphone,
                        gender: gender.gender,
                        company: company.id,
                        department: department.id,
                    }
                }
            });

            //Show alert
            Swal.fire({
                icon: 'success',
                title: 'Empleado creado correctamente',
                showConfirmButton: false,
                timer: 3000
            });

            setTimeout(() => {      
                saveMessage(null);        
                //Redirection to employees
                router.push('/employees');
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
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Empleado</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg bg-white shadow-md px-8 pt-6 pb-8 mb-4">

                    <AssignName />
                    <AssignSurnameP />
                    <AssignSurnameM />
                    <AssignEmail />
                    <AssignBirthdate />
                    <AssignPhone />
                    <AssignCellphone />
                    <AssignGender /> 
                    <AssignCompany />
                    <AssignDepartment />

                    <button
                        type="button"
                        className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 `}
                        onClick={ () => createNewEmloyee() }
                    >
                        Registrar Empleado
                    </button>

                </div>
            </div>

            
        </Layout>
    );
}
 
export default NewEmployee;