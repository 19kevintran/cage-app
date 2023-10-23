import { useRouter } from 'next/router';
import path, { join } from 'path';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Inventory.module.scss';
import { Breadcrumb, BreadcrumbItem, Button, Modal } from 'react-bootstrap';
import * as url from 'url';
import Head from 'next/head';
import { ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import AssetAdd from '../../components/form/assetAdd';

export async function getServerSideProps(context) {
  const pid = context.params.pid;
  // const res = await fetch('http://localhost:3043/asset');

  // fetch cage information
  const apiPath = new URL(join('cage', pid), process.env.API).toString();
  const fetchCage = await axios.get(apiPath);
  // const fetchCage = await fetch(
  //   path.join(process.env.API, 'cage', pid as string)
  // );
  const cageData = fetchCage.data;
  console.log(cageData);

  // fetch asset information
  const fetchAssets = await fetch(path.join(process.env.API, 'asset'));
  const assetsData = await fetchAssets.json();

  return {
    props: {
      data: assetsData,
      cage: cageData,
      base: process.env.API,
    },
  };
}
export default function Cage({ data, cage, base }) {
  const { data: session, status } = useSession();

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (session) setIsOwner(cage.ownerID === session.user.name);
  });

  const [showModal, setShowModal] = useState(false);

  const pid = cage._id;
  const [modalOpen, setModalOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState('null');
  const [cageId, setCageId] = useState('null');
  const [editEName, setEName] = useState('Blackmagic URSA 4.6K Pro G2');
  const [editEModel, setEModel] = useState('BMURSA46G2');
  const [editESerial, setESerial] = useState('43R0MP-3432');
  const addClose = () => setShowAdd(false);
  const addShow = () => setShowAdd(true);
  const editClose = () => setShowEdit(false);
  const editShow = (assetId: string) => {
    // fill the edit info
    setEditId(assetId);
    setShowEdit(true);

    // getting the asset information
    const asset = data.find((item) => item._id == assetId);
    setEName(asset.name);
    setEModel(asset.model);
    setESerial(asset.serial);
  };

  const cageDelete = () => {
    const apiPath = new URL(`cage/${pid}`, base).toString();
    axios.delete(apiPath).then(() => {
      location.replace('/');
    });
  };

  const edit = (assetid: string) => {
    const API = new URL(`asset/${assetid}`, base);
    const name = document.querySelector('#editName') as HTMLInputElement | null;
    const model = document.querySelector(
      '#editModel'
    ) as HTMLInputElement | null;
    const serial = document.querySelector(
      '#editSerial'
    ) as HTMLInputElement | null;

    let data = {
      name: name.value,
      model: model.value,
      serial: serial.value,
      cage: pid,
      __v: 0,
    };
    Object.keys(data).forEach((key) => {
      if (data[key] === null || (data[key] as string).length < 1)
        delete data[key];
    });
    console.log(data);
    console.log(API);
    axios.put(API.toString(), data).then(() => {
      location.reload();
    });
  };
  const del = (assetId: string) => {
    const API = new URL(`asset/${assetId}`, base).toString();

    //localhost:3000/cage/
    console.log(API);

    axios.delete(API).then(() => {
      location.reload();
    });
    // fetch(API, {
    //   method: 'DELETE',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // }).then(() => {
    //   location.reload();
    // });
    // .then(res => res.json())
  };
  const submit = () => {
    const name = document.querySelector('#name') as HTMLInputElement | null;
    const model = document.querySelector('#model') as HTMLInputElement | null;
    const serial = document.querySelector('#serial') as HTMLInputElement | null;
    let data = {
      name: name.value,
      model: model.value,
      serial: serial.value,
      cage: pid,
    };

    Object.keys(data).forEach((key) => {
      if (data[key] === null || (data[key] as string).length < 1)
        delete data[key];
    });
    const API = new URL('asset', base).toString();

    axios.post(API, data).then(() => {
      location.reload();
    });
  };

  return (
    <Layout title={cage.name}>
      <div className='container'>
        <Breadcrumb>
          <BreadcrumbItem href='/'>Home</BreadcrumbItem>
          <BreadcrumbItem active>{cage.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className={`container d-flex justify-content-between`}>
        <span>
          <h1 className='text-3xl font-bold underline'>{`${cage.name}`}</h1>
          <p>
            Location: <b>{cage.location}</b>
          </p>
        </span>
        <span>
          {isOwner && (
            <ButtonGroup>
              <Button className={``} onClick={() => {}}>
                edit cage
              </Button>
              <Button className={``} onClick={cageDelete} variant='danger'>
                delete cage
              </Button>
            </ButtonGroup>
          )}
        </span>
      </div>
      <div className='container'>
        <hr />
        <div className='d-flex justify-content-between'>
          <span>
            <h3>Assets</h3>
          </span>
          <span>
            {isOwner && (
              <Button
                className={``}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                New Asset
              </Button>
            )}
          </span>
        </div>
        <div></div>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Model</th>
              <th scope='col'>Serial</th>
              {isOwner && <th scope='col'>Actions</th>}
            </tr>
          </thead>
          <tbody className='table-striped'>
            {data.map((asset) => {
              if (asset.cage == pid)
                return (
                  <tr key={asset['_id']}>
                    <td>
                      {
                        <a href={join('/cage', pid, asset['_id'])}>
                          {asset.name}
                        </a>
                      }
                    </td>
                    <td>{asset.model}</td>
                    <td>{asset.serial}</td>
                    {isOwner && (
                      <td>
                        <ButtonGroup>
                          <Button
                            variant='primary'
                            size='sm'
                            onClick={function () {
                              editShow(asset['_id']);
                            }}
                          >
                            edit
                          </Button>
                          <Button
                            variant='danger'
                            size='sm'
                            onClick={function () {
                              del(asset['_id']);
                            }}
                          >
                            X
                          </Button>
                        </ButtonGroup>
                      </td>
                    )}
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      <Modal // Add Form
        show={showAdd}
        onHide={addClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <div className={styles.formfloating}>
              <h5>Name of product</h5>
              <input
                type='name'
                className={styles.formcontrol}
                id='name'
                placeholder='BMX Bike'
              />
            </div>
            <br />
            <h5>Model</h5>
            <div className={styles.formfloating}>
              <input
                type='model'
                className={styles.formcontrol}
                id='model'
                placeholder='Mongoose Title'
              />
            </div>
            <br />
            <h5>Serial</h5>
            <div className={styles.formfloating}>
              <input
                id='serial'
                type='serial'
                className={styles.formcontrol}
                placeholder='Mongoose Title'
              />
            </div>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addClose}>Close</Button>
          <Button
            onClick={function () {
              submit();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              edit(editId);
            }}
          >
            <div className={styles.formfloating}>
              <h5>Name of product</h5>
              <input
                id='editName'
                name='editName'
                placeholder={editEName}
                className={styles.formcontrol}
              />
            </div>
            <br />
            <h5>Model</h5>
            <div className={styles.formfloating}>
              <input
                id='editModel'
                name='editModel'
                placeholder={editEModel}
                className={styles.formcontrol}
              />
            </div>
            <br />
            <h5>Serial</h5>
            <div className={styles.formfloating}>
              <input
                id='editSerial'
                name='editSerial'
                placeholder={editESerial}
                className={styles.formcontrol}
              />
            </div>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={editClose}>Close</Button>
          <Button
            onClick={function () {
              edit(editId);
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      <AssetAdd
        title='Example Form'
        onClose={() => setShowModal(false)}
        show={showModal}
        cage={cage}
        baseApi={base}
        onHide={() => setShowModal(false)}
      >
        .
      </AssetAdd>
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>
        <Modal.Body>World</Modal.Body>
      </Modal>
    </Layout>
  );
}
