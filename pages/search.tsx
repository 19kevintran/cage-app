import axios from 'axios';
import { assert } from 'console';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { getHeapSpaceStatistics } from 'v8';
import Layout from '../components/Layout';
import styles from '../styles/Search.module.scss';

export async function getServerSideProps(context) {
  const assetApi = new URL('asset', process.env.API).toString();
  const assetFetch = await axios.get(assetApi);
  const assetData = assetFetch.data;

  const res = await fetch(path.join(process.env.API, 'cage'));
  const data = await res.json();
  return {
    props: {
      data: assetData,
      base: process.env.API,
    },
  };
}
export default function Cage({ data, base }) {
  // const API = new URL('/asset', base);
  const filteredData = data.filter((el) => {});

  const [searchData, setSearchData] = useState(data);
  const [inputText, setInputText] = useState('');

  const getAssets = (userInput: string) => {
    const API = new URL('/asset', base);
    // const input = document.querySelector('#input') as HTMLInputElement | null;
    console.log(userInput);
    // const API = new URL(`asset/${data.name.attr("id")}`, base);
    fetch(API, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('not working');
  };
  let inputHandler = (e) => {
    const value: string = e.target.value;
    const needle = value.toLowerCase();
    setInputText(value);

    const filtered = data.filter((asset) => {
      const assetdata =
        `${asset.name}${asset.model}${asset.serial}`.toLowerCase();

      return assetdata.includes(needle);
    });

    setSearchData(filtered);
  };

  return (
    <Layout title='All Cages'>
      <div className='container'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <a href='#'>Home</a>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Searched_Item
            </li>
          </ol>
        </nav>
      </div>
      <div className='container'>
        <div className='input-group'>
          <input
            type='search'
            className='form-control rounded'
            placeholder='Search'
            aria-label='Search'
            aria-describedby='search-addon'
            onChange={inputHandler}
          />
          <Button
            type='button'
            className='btn btn-outline-primary'
            onClick={function () {
              getAssets(inputText);
            }}
          >
            search
          </Button>
        </div>
        <br></br>
        <h1 className='text-3xl font-bold underline'>Searched Item</h1>
        <br></br>
      </div>
      <div className='container'>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              {/* <th scope='col'>Cage</th> */}
              <th scope='col'>Name</th>
              <th scope='col'>Model</th>
              <th scope='col'>Serial</th>
            </tr>
          </thead>
          <tbody className='table-striped'>
            {searchData.map((entry) => {
              return (
                <tr key={entry._id}>
                  <td>{entry.name}</td>
                  <td>{entry.model}</td>
                  <td>{entry.serial}</td>
                </tr>
              );
            })}
            {/* {filteredData.map((asset) => {
              <tr key={asset.id}>
                <td>{<a href={'#' + asset['_id']}>{asset.name}</a>}</td>
                <td>{asset.model}</td>
                <td>{asset.serial}</td>
              </tr>;
            })} */}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
