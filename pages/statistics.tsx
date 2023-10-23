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
    <Layout title='Statistics'>
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
              Statistics
            </li>
          </ol>
        </nav>
      </div>
      <div className={`${styles.Header} container`}>
        <h1 className='text-3xl font-bold underline'>Statistics</h1>
      </div>
    </Layout>
  );
}
