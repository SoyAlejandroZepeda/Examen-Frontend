import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import EditName from '../../components/employees/EditName';
import EditSurnameP from '../../components/employees/EditSurnameP';
import EditSurnameM from '../../components/employees/EditSurnameM';
import EditEmail from '../../components/employees/EditEmail';
import EditPhone from '../../components/employees/EditPhone';
import EditCellphone from '../../components/employees/EditCellphone';
import EditGender from '../../components/employees/EditGender';
import EditBirthdate from '../../components/employees/EditBirthdate';
import EditCompany from '../../components/employees/EditCompany';
import EditDepartment from '../../components/employees/AssignDepartment';
import { useQuery, useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';


const GET_EMPLOYEE = gql`
    query getEmployee($id: ID!){
        getEmployee(id: $id){
            id
            name
            surnameP
            surnameM
            email
            birthdate
            phone
            cellphone
            gender
            company
            department
        }
    }
`;

const UPDATE_EMPLOYEE = gql`
    mutation updateEmployee($id: ID!, $input: EmployeeInput){
        updateEmployee(id: $id, input: $input){
            id
        }
    }
`;

//Context Employee
import EmployeeContext from '../../context/employees/EmployeeContext';

const EditEmployee = () => {

    //State of messages
    const [ message, saveMessage ] = useState(null);

    //Routing
    const router = useRouter();
    const { query: { id } } = router;

    //Extract functions and values to context
    const employeeContext = useContext(EmployeeContext);
    const { name, surnameP, surnameM, email, birthdate, phone, cellphone, gender, company, department } = employeeContext

    const { data, loading, error } = useQuery(GET_EMPLOYEE, {
        variables: {
            id
        }
    });

    //Update Employee
    const [ updateEmployee ] = useMutation(UPDATE_EMPLOYEE)

    //Loading spinner
    if(loading) return(
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    );

    const { getEmployee } = data;

    //Modified employee
    const updateInfoEmployee = async () => {

        try {
            const { data } = await updateEmployee({
                variables: {
                    id,
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
                title: 'Empleado actualizado correctamente',
                showConfirmButton: false,
                timer: 3000
            });

            setTimeout(() => {
                //Redirection user
                router.push('/employees');
            },3000);

        } catch (error) {
            //Error employee message
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
            <h1 className="text-2xl text-gray-800 font-light">Editar Empleado</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg bg-white shadow-md px-8 pt-6 pb-8 mb-4">

                    <EditName 
                        nameEdit={getEmployee.name}
                    />
                    <EditSurnameP 
                        surnamePEdit={getEmployee.surnameP}
                    />
                    <EditSurnameM 
                        surnameMEdit={getEmployee.surnameM}
                    />
                    <EditEmail 
                        emailEdit={getEmployee.email}
                    />
                    <EditBirthdate 
                        birthdateEdit={getEmployee.birthdate}
                    />
                    <EditPhone 
                        phoneEdit={getEmployee.phone}
                    />
                    <EditCellphone 
                        cellphoneEdit={getEmployee.cellphone}
                    />
                    <EditGender 
                        genderEdit={getEmployee.gender}
                    />
                    <EditCompany 
                        companyEdit={getEmployee.company}
                    /> 
                    <EditDepartment 
                        departmentEdit={getEmployee.department}
                    />

                    <button
                        type="button"
                        className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900  `}
                        onClick={ () => updateInfoEmployee() }
                    >
                        Editar Empleado
                    </button>

                </div>
            </div>
        </Layout>
    );
}
 
export default EditEmployee;