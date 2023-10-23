import path from 'path';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Tracking.module.scss';

export async function getServerSideProps(context) {
  // const res = await fetch('http://localhost:3043/asset');
  const res = await fetch(path.join(process.env.API, 'asset'));
  const data = await res.json();
  return {
    props: { data },
  };
}
export default function Cage({ data }) {
  return (
    <Layout title='Tracking'>
      <div className='container'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <a href='#'>Home</a>
            </li>
            <li className='breadcrumb-item'>
              <a href='#'>Cages</a>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Tracking
            </li>
          </ol>
        </nav>
      </div>
      <div className={`${styles.Header} container`}>
        <h1 className='text-3xl font-bold underline'>Tracking</h1>
      </div>
      <div className='container'>
        <div className='input-group'>
          <input
            type='search'
            className='form-control rounded'
            placeholder='Enter Order Number #'
            aria-label='Search'
            aria-describedby='search-addon'
          />
          <button type='button' className='btn btn-outline-primary'>
            Track
          </button>
        </div>
      </div>

      <div className='container'>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Order #</th>
              <th scope='col'>Name</th>
              <th scope='col'>Model</th>
              <th scope='col'>Serial</th>
              <th scope='col'>Date/Time</th>
              <th scope='col'>Location</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody className='table-striped'>
            {data.map((asset) => {
              return (
                <tr key={asset['_id']}>
                  <td>{asset.orderNumber}</td>
                  <td>{asset.name}</td>
                  <td>{asset.model}</td>
                  <td>{asset.serial}</td>
                  <td>{asset.date}</td>
                  <td>{asset.location}</td>
                  <td>{asset.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </Layout>
  );
}
