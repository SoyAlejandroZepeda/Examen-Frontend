import React from 'react';
import Layout from '../components/Layout';
import Admins from './admins';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_USER = gql`
  query getUser{
    getUser{
      id
      name
      surname
    }
  }
`;

export default function Index() {

  //Routing
  const router = useRouter();

  //Get user query
  const { data, loading, error } = useQuery(GET_USER);

  //Loading spinner
  if(loading) return null;

  //if doesn't exist usar data
  if(data.getUser === null) {
    router.push('/login');
    return null;
  }

  return (
    <div>
      <Layout>
        <Admins />
      </Layout>
    </div>
  )
}
