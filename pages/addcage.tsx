import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/addform.module.scss';

export async function getServerSideProps(context) {
  // const res = await fetch('http://localhost:3043/cage');
  const res = await fetch(path.join(process.env.API, 'cage'));
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function Cage({ data }) {
  const inventory = [1, 2, 3, 4, 5];
  return (
    <Layout title='History'>
        <div className={styles.formsignin}>
            <form className={styles.signinform}>
              <div className={styles.formbox}>
                <h1 className={styles.signin}>Add Item</h1>
                <div className={styles.formfloating}>
                    <h5>Name of product</h5>
                  <input 
                    type='Name of product'
                    className={styles.formcontrol}
                    id='floatingInput'
                    placeholder='BMX Bike'
                  />
                </div>
                <br />
                <h5>Model</h5>
                <div className={styles.formfloating}>
                  <input
                    type='Model'
                    className={styles.formcontrol}
                    id='floatingInput'
                    placeholder='Mongoose Title'
                  />
                </div>
                <br />
                <h5>Serial</h5>
                <div className={styles.formfloating}>
                  <input
                    type='Model'
                    className={styles.formcontrol}
                    id='floatingInput'
                    placeholder='Mongoose Title'
                  />
                </div>
                <br />
                <button className={styles.loginbutton} type='submit'>
                  Add
                </button>
                <br />
              </div>
            </form>
          </div>
    </Layout>
  );
}