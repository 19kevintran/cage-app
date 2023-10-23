import { useRouter } from 'next/router';
import axios from 'axios';
import path, { join } from 'path';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Inventory.module.scss';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Modal,
} from 'react-bootstrap';
import * as url from 'url';

export async function getServerSideProps(context) {
  const pid = context.params.pid;
  

  const baseApi = process.env.API;
  const cageID = context.params.slug[0];
  const assetID = context.params.slug[1];

  const assetApi = new URL(join('asset', assetID), baseApi).toString();
  const assetFetch = await axios.get(assetApi);
  const assetData = assetFetch.data;

  const cageApi = new URL(join('cage', cageID), baseApi).toString();
  const cageFetch = await axios.get(cageApi);
  const cageData = cageFetch.data;

  const historyApi = new URL(join('history'), baseApi).toString();
  const historyFetch = await axios.get(historyApi);
  const historyData = historyFetch.data;

  console.log('MY DATA', assetData, cageData);

  //fetch asset information
  return {
    props: {
      data: historyData,
      base: baseApi,
      asset: assetData,
      cage: cageData,
    },
  };
}
export default function Cage({ data, base, asset, cage }) {
  const router = useRouter();
  const { slug } = router.query;
  const pid = slug[0];
  console.log(slug);
  const [showAdd, setAdd] = useState(false);
  const [showEdit, setEdit] = useState(false);

  // Get Cage Name

  // Get Asset Information
  // const assetID = slug[1];
  // const assetAPI = new URL(`asset/${assetID}`, base).toString();
  // const assetGet = await axios.get(assetAPI);
  // const asset = assetGet.data;

  // console.log('asset info', asset);

  const addShow = () => setAdd(true);
  const addClose = () => setAdd(false);
  const editShow = () => setEdit(true);
  const editClose = () => setEdit(false);

  const [showDescriptionAdd, setDescriptionAdd] = useState(false);
  const [showDescriptionEdit, setDescriptionEdit] = useState(false);
  const addDescriptionShow = () => setDescriptionAdd(true);
  const addDescriptionClose = () => setDescriptionAdd(false);
  const editDescriptionShow = () => setDescriptionEdit(true);
  const editDescriptionClose = () => setDescriptionEdit(false);

  const [showImageAdd, setImageAdd] = useState(false);
  const [showImageEdit, setImageEdit] = useState(false);
  const addImageShow = () => setImageAdd(true);
  const addImageClose = () => setImageAdd(false);

  const addButton = () => {
    const addTitleReport = document.querySelector(
      '#title'
    ) as HTMLInputElement | null;
    const addStatusReport = document.querySelector(
      '#meta'
    ) as HTMLInputElement | null;
    const addMessageReport = document.querySelector(
      '#message'
    ) as HTMLInputElement | null;
    const date = new Date().toISOString();

    let body = {
      title: addTitleReport.value,
      meta: addStatusReport.value,
      date,
      assetId: slug[1],
      authorId: slug[0],
      message: addMessageReport.value,
    };

    console.log(JSON.stringify(body));
    const API = new URL('history', base).toString();
    axios.post(API, body).then((res) => {
       location.reload();
    });
    // const assetID = slug[1];
    // const cageURL = `/cage/${assetID}`;
    // location.replace(cageURL);
    // const cageID = res.data._id;
    // const cageURL = `/history/${cageID}`;
    // location.replace(cageURL);
    //  });
  };
  /*
    console.log(API);
    fetch(API, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => {
      console.log(res);
    // location.reload();
    });
  };*/
  const editButton = () => {
    const oldTitleReport = document.querySelector(
      '#oldtitle'
    ) as HTMLInputElement | null;
    const addTitleReport = document.querySelector(
      '#title'
    ) as HTMLInputElement | null;
    const addStatusReport = document.querySelector(
      '#meta'
    ) as HTMLInputElement | null;
    const addMessageReport = document.querySelector(
      '#message'
    ) as HTMLInputElement | null;
    const date = new Date().toISOString();

    let editBody = {
      oldtitle: oldTitleReport.value,
      title: addTitleReport.value,
      meta: addStatusReport.value,
      date,
      assetId: slug[1],
      authorId: slug[0],
      message: addMessageReport.value,
    };

    console.log(editBody);
    const API = new URL('history', base);
    console.log(API);
    fetch(API, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editBody),
    }).then((res) => {
      console.log(res);
      location.reload();
    });
  };

  const addDescriptionButton = () => {
    const addDescription = document.querySelector(
      '#description'
    ) as HTMLInputElement | null;
    const date = new Date().toISOString();

    let bodyDescription = {
      description: addDescription.value,
    };
    console.log(JSON.stringify(bodyDescription));
    const API = new URL('history', base).toString();
    console.log(API);
    axios.post(API, bodyDescription).then((res) => {});
  };

  const editDescriptionButton = () => {
    const description = document.querySelector(
      '#description'
    ) as HTMLInputElement | null;

    let editDesBody = {
      description: description.value,
    };
    console.log(editDesBody);
    const API = new URL('history', base);
    console.log(API);
    fetch(API, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editDesBody),
    }).then((res) => {
      console.log(res);
      location.reload();
    });
  };
  const addImageButton = () => {
    const addImageUrl = document.querySelector(
      '#url'
    ) as HTMLInputElement | null;

    let bodyImage = {
      image: addImageUrl.value,
    };
    console.log(JSON.stringify(bodyImage));
    const API = new URL('history', base).toString();
    console.log(API);
    axios.post(API, bodyImage).then((res) => {});
  };
  return (
    <Layout title={slug[1]}>
      <div className='container'>
        <Breadcrumb>
          <BreadcrumbItem href='/'>Home</BreadcrumbItem>
          <BreadcrumbItem href={join('/cage', cage._id)}>
            {cage.name}
          </BreadcrumbItem>
          <BreadcrumbItem active>{asset.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className={`${styles.Header} container`}>
        <h1 className='text-3xl font-bold underline'>{asset.name}</h1>
        <div className='d-flex'>
          <img
            src='https://via.placeholder.com/150/00000/000000?Text=WebsiteBuilders.com
C/O https://placeholder.com/'
            alt='Picture of asset'
          ></img>
          <Button variant='primary' onClick={addImageShow}>
            Add Image
          </Button>

          {/* Modal */}
          <Modal
            show={showImageAdd}
            onHide={addImageClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Enter a picture of {asset.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Enter the photo URL for {asset.name}:{' '}
              <div className='form-group'>
                <textarea
                  placeholder='https://via.placeholder.com/150/00000/000000?Text=WebsiteBuilders.com
                  C/O https://placeholder.com/'
                  className='form-control'
                  id='url'
                ></textarea>
              </div>
              <br />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addImageButton();
                }}
              ></form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={addDescriptionClose}>
                Close
              </Button>
              <Button
                onClick={function () {
                  addImageButton();
                }}
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <hr />
        <span className='d-flex'>
          <Button variant='primary' onClick={addDescriptionShow}>
            Add Features
          </Button>
          <Button variant='primary' onClick={editDescriptionShow}>
            Edit Features
          </Button>

          {/* Modal */}
          <Modal
            show={showDescriptionAdd}
            onHide={addDescriptionClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add {asset.name} features</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Add features for {asset.name}:{' '}
              <div className='form-group'>
                <textarea
                  placeholder='great for night shots'
                  className='form-control'
                  id='description'
                ></textarea>
              </div>
              <br />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addDescriptionButton();
                }}
              ></form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={addDescriptionClose}>
                Close
              </Button>
              <Button
                onClick={function () {
                  addDescriptionButton();
                }}
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showDescriptionEdit}
            onHide={editDescriptionClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit {asset.name} features</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Edit features for {asset.name}:{' '}
              <div className='form-group'>
                <textarea
                  placeholder='great for night shots'
                  className='form-control'
                  id='description'
                ></textarea>
              </div>
              <br />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editDescriptionButton();
                }}
              ></form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={editDescriptionClose}>
                Close
              </Button>
              <Button
                onClick={function () {
                  editDescriptionButton();
                }}
              >
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
          <br />
        </span>
        <div className='d-flex'>
          <dl>
            <dt>
              <li>Description #1</li>
            </dt>
            <dt>
              <li>Description #2</li>
            </dt>
            <dt>
              <li>Description #3</li>
            </dt>
          </dl>
        </div>

        <span className='d-flex'>
          <Button variant='primary' onClick={addShow}>
            Add History
          </Button>
          <Button variant='primary' onClick={editShow}>
            Edit History
          </Button>
        </span>
      </div>

      <div className={`${styles.center} container`}>
        <hr />
        <div className='d-flex'>
          <h3 className='text-3xl font-bold underline'>History </h3>
        </div>
      </div>
      <div className='container'>
        {data.map((record) => {
          if (record.authorId == asset._id)
            return (
              <Card className='mb-2'>
                <Card.Header>
                  {record.meta} | {record.title}
                </Card.Header>
                <Card.Body>
                  <p>
                    <i>
                      By {record.authorId} on {record.date}
                    </i>
                  </p>
                  <p>
                    <i></i>
                  </p>
                  <p>
                    <i>{record.status}</i>
                  </p>
                  <p>{record.message}</p>
                  <code>{JSON.stringify(record)}</code>
                </Card.Body>
              </Card>
            );
        })}
      </div>
      {/* Modal */}
      <Modal
        show={showAdd}
        onHide={addClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter report title for {asset.name}:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='Monthly Maintinance'
            aria-label='Search'
            aria-describedby='search-addon'
            id='title'
          />
          <br />
          Enter status of {asset.name}:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='MAINTINANCE'
            aria-label='Search'
            aria-describedby='search-addon'
            id='meta'
          />
          <br />
          Enter report message for {asset.name}:{''}
          <div className='form-group'>
            <textarea
              placeholder='lens cap missing'
              className='form-control'
              id='message'
            ></textarea>
          </div>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addButton();
            }}
          ></form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={addClose}>
            Close
          </Button>
          <Button
            onClick={function () {
              addButton();
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
          <Modal.Title>Edit {asset.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter the report title to edit for {asset.name}:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='Monthly Maintinance'
            aria-label='Search'
            aria-describedby='search-addon'
            id='oldtitle'
          />
          <br />
          Enter the new report title for {asset.name}:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='Monthly Maintinance'
            aria-label='Search'
            aria-describedby='search-addon'
            id='title'
          />
          <br />
          Enter the new status of {asset.name}:{' '}
          <input
            type='search'
            className='form-control rounded'
            placeholder='MAINTINANCE'
            aria-label='Search'
            aria-describedby='search-addon'
            id='meta'
          />
          <br />
          Enter the new report message for {asset.name}:{''}
          <div className='form-group'>
            <textarea
              placeholder='lens cap missing'
              className='form-control'
              id='message'
            ></textarea>
          </div>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editButton();
            }}
          ></form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={editClose}>
            Close
          </Button>
          <Button
            onClick={function () {
              editButton();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
