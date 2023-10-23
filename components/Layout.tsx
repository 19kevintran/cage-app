import axios from 'axios';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Footer from './Footer';
import NavigationBar from './Navbar';

export default function App(props) {
  const title = !props.title ? 'Cage App' : `Cage | ${props.title}`;

  // Load User Session
  const { data: session, status } = useSession();
  useEffect(() => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';

    if (session?.user) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${session?.user['token']}`;
    }
  });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='flex-wrapper'>
        <div>
          <NavigationBar></NavigationBar>
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  );
}
