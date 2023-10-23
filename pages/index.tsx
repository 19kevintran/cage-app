import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import * as url from 'url';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Cages.module.scss';
import { Breadcrumb, BreadcrumbItem, Button, Modal } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export async function getServerSideProps(context) {
  // const res = await fetch('http://localhost:3043/cage');
  const res = await fetch(path.join(process.env.API, 'cage'));
  const data = await res.json();
  return {
    props: { data, base: process.env.API },
  };
}
export default function Cage({ data, base }) {
  const { data: session, status } = useSession();
  const [cages, setCages] = useState(data);

  const inventory = [1, 2, 3, 4, 5];

  const [showAdd, setAdd] = useState(false);
  const [showEdit, setEdit] = useState(false);
  const addShow = () => setAdd(true);
  const addClose = () => setAdd(false);
  const editShow = () => setEdit(true);
  const editClose = () => setEdit(false);

  const onAdd = () => {
    const addCageName = document.querySelector(
      '#addCageName'
    ) as HTMLInputElement | null;
    const addLocation = document.querySelector(
      '#addCageLocation'
    ) as HTMLInputElement | null;
    const addDescription = document.querySelector(
      '#addCageDescription'
    ) as HTMLInputElement | null;

    let body = {
      name: addCageName.value,
      location: addLocation.value,
      description: addDescription.value,
      ownerID: session.user['id'],
    };

    const API = new URL('cage', base).toString();
    axios.post(API, body).then((res) => {
      const cageID = res.data._id;
      const cageURL = `/cage/${cageID}`;
      location.replace(cageURL);
    });
  };

  const onEdit = () => {
    const oldCageName = document.querySelector(
      '#oldCageName'
    ) as HTMLInputElement | null;
    const newCageName = document.querySelector(
      '#newCageName'
    ) as HTMLInputElement | null;
    const newLocation = document.querySelector(
      '#newCageLocation'
    ) as HTMLInputElement | null;
    const newDescription = document.querySelector(
      '#newCageDescription'
    ) as HTMLInputElement | null;

    let changeData = {
      oldName: oldCageName.value,
      newName: newCageName.value,
      newLocation: newLocation.value,
      newDescription: newDescription.value,
    };
    const API = new URL('cage', base);

    fetch(API, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changeData),
    });
  };

  return (
    <Layout title='All Cages'>
      <div className='container'>
        <Breadcrumb>
          <BreadcrumbItem href='/' active>
            Home
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className='container '>
        <div className='d-flex justify-content-between mb-3'>
          <span className='d-flex align-items-end'>
            <h3 className='text-3xl font-bold underline'>Cages</h3>
          </span>
          <span className=''>
            {session && (
              <>
                <Button variant='primary' onClick={addShow}>
                  Add
                </Button>
              </>
            )}
          </span>
        </div>
      </div>

      <div className={`container d-flex flex-wrap ${styles['cage-container']}`}>
        {Array.from(cages).map((inv, count) => {
          const image = `https://source.unsplash.com/random/256x256?office&${count}`;
          return (
            <Link
              href={`/cage/${inv['_id']}`}
              as={`/cage/${inv['_id']}`}
              key={`${inv['_id']}`}
            >
              <div
                key={inv['name']}
                className={`d-flex flex-row ${styles.cage}`}
              >
                <div className={styles['cage-img']}>
                  <Image
                    className='cage-image p-3'
                    src={image}
                    alt='Company Image'
                    width={128}
                    height={128}
                  />
                </div>
                <div className={`${styles['cage-body']} p-3`}>
                  <h3>{inv['name']}</h3>
                  <div className={`${styles['cage-details']}`}>
                    <p className=''>Located at {inv['location']}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className='d-flex justify-content-center'>
        <div className='pagination'>
          <li className='page-item'>
            <a className='page-link' href='#'>
              1
            </a>
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              2
            </a>
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              3
            </a>
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              4
            </a>
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              5
            </a>
          </li>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showAdd}
        onHide={addClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Cage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter name of the Cage:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='My Film Cage'
            aria-label='Search'
            aria-describedby='search-addon'
            id='addCageName'
          />
          <ul></ul>
          Enter description of the Cage:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='Film Equipment'
            aria-label='Search'
            aria-describedby='search-addon'
            id='addCageDescription'
          />
          <ul></ul>
          Enter location of the Cage:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='New York, NY'
            aria-label='Search'
            aria-describedby='search-addon'
            id='addCageLocation'
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAdd();
            }}
          ></form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={addClose}>
            Close
          </Button>
          <Button
            onClick={function () {
              onAdd();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        onHide={editClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Cage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter old name of the Cage:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='Name of the Cage...'
            aria-label='Search'
            aria-describedby='search-addon'
            id='oldCageName'
          />
          <ul></ul>
          Enter new name of the Cage:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='New name of the Cage...'
            aria-label='Search'
            aria-describedby='search-addon'
            id='newCageName'
          />
          <ul></ul>
          Enter description of the Cage:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='Description of Cage...'
            aria-label='Search'
            aria-describedby='search-addon'
            id='newCageDescription'
          />
          <ul></ul>
          Enter location of the Cage:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='Location of the Cage...'
            aria-label='Search'
            aria-describedby='search-addon'
            id='newCageLocation'
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAdd();
            }}
          ></form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={editClose}>
            Close
          </Button>
          <Button
            onClick={function () {
              onEdit();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
