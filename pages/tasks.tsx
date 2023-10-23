import path from 'path';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Tasks.module.scss';

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
    <Layout title='Tasks'>
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
              Tasks
            </li>
          </ol>
        </nav>
      </div>
      <div className={`${styles.Header} container`}>
        <h1 className='text-3xl font-bold underline'>Tasks</h1>
      </div>

      <div className='container'>
        <div className='input-group'>
          <input
            type='search'
            className='form-control rounded'
            placeholder='Enter Task'
            aria-label='Search'
            aria-describedby='search-addon'
          />
          <ul></ul>
          <div className={`${styles.right} `}>Add</div>
          <div className={`${styles.right} `}>Delete</div>
        </div>
      </div>
      <div className='container'>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            id='flexCheckDefault'
          />
          <label className='form-check-label' form='flexCheckDefault'>
            Default checkbox
          </label>
        </div>
      </div>
    </Layout>
  );
}
