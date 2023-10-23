import path from 'path';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Inventory.module.scss';

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
    <Layout title='Inventory'>
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
              Inventory
            </li>
          </ol>
        </nav>
      </div>
      <div className={`${styles.Header} container`}>
        <h1 className='text-3xl font-bold underline'>Cage Inventory</h1>
      </div>
      <div className={`${styles.center} container`}>
        <div className={`${styles.right} `}>Add</div>
        <div className={`${styles.right} `}>Edit</div>
        <div className='d-flex'>
          <div className={`${styles.button} `}>Packed: 0</div>
          <div className={`${styles.button} `}>Shipped: 0</div>
          <div className={`${styles.button} `}>Delivered: 0</div>
        </div>
      </div>

      <div className='container'>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Model</th>
              <th scope='col'>Serial</th>
            </tr>
          </thead>
          <tbody className='table-striped'>
            {data.map((asset) => {
              return (
                <tr key={asset['_id']}>
                  <td>{asset.name}</td>
                  <td>{asset.model}</td>
                  <td>{asset.serial}</td>
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
