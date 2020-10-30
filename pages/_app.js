import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import DepartmentState from '../context/departments/DepartmentState';
import EmployeeState from '../context/employees/EmployeeState';

import '../styles/spinner.css';
import '../styles/logout.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={ client }>
      <DepartmentState>
        <EmployeeState>
          <Component {...pageProps} />
        </EmployeeState>
      </DepartmentState>
    </ApolloProvider>
  )
}

export default MyApp
