import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { signOut, useSession } from 'next-auth/react';

export interface NavbarItem {
  name: string;
  page: string;
}

export default function NavigationBar({ ...props }) {
  const { data: session, status } = useSession();

  // convert menu to an array
  const navItems: NavbarItem[] = [
    { name: 'Cage', page: '/cages' },
    { name: 'Inventory', page: '/inventory' },
    { name: 'Reports', page: '/history' },
    { name: 'Search', page: '/search' },
    { name: 'Logout', page: '/logout' },
  ];

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>CAGE</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href='/search'>Search</Nav.Link>
            </Nav>
            <Nav style={{ maxHeight: '100px' }} navbarScroll>
              {session ? (
                <>
                  {/* {session.user.name} */}
                  <Nav.Link href='#' onClick={() => signOut()}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href='/login'>Login</Nav.Link>
                  <Nav.Link href='/register'>Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
