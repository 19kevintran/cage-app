import Link from 'next/link';
import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Layout from '../components/Layout';
import styles from '../styles/Login.module.scss';
import axios from 'axios';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export async function getServerSideProps(context) {
  return {
    props: { base: process.env.API },
  };
}

export default function Register({ base }) {
  axios.defaults.headers['Accept'] = 'application/json';
  axios.defaults.headers['Content-Type'] = 'application/json';
  useEffect(() => {
    const token = window.localStorage.getItem('jwt_token');
    if (token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    family: '',
    email: '',
    password: '',
    verify: '',
  });

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // register the account
    const apiPath = new URL('auth/register', base);
    axios
      .post(apiPath.toString(), userInfo)
      .then((res) => {
        signIn('credentials', {
          ...userInfo,
          callbackUrl: '/',
        });
      })
      .catch((res) => {
        const alert = document.getElementById('alert');
        const errorMessage = res.response.data.message;
        alert.classList.remove('visually-hidden');
        alert.innerText = errorMessage;
      });
  };

  const onSubmit=() =>{
    const name = document.querySelector('#name') as HTMLInputElement | null;
    const family = document.querySelector('#family') as HTMLInputElement | null;
    const email = document.querySelector('#email') as HTMLInputElement | null;
    const password = document.querySelector('#password') as HTMLInputElement | null;
    const verify = document.querySelector('#verify') as HTMLInputElement | null;
    let data = {
      name: name.value,
      family: family.value,
      email: email.value,
      password: password.value,
      verify: verify.value,
    };
    // Object.keys(data).forEach((key) => {
    //   if (data[key] === null || (data[key] as string).length < 1)
    //     delete data[key];
    // });
    if(password.value === verify.value){
      console.log(data);
      const API = new URL('register', base);
      console.log(API, data);
      fetch(API, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(() => {
        console.log("everything right")
        // <a href={"#" + "/cage"}></a>
      });
    };
    if(password.value != verify.value){
      console.log("wrong password")
    }
  };

  return (
    <Layout title='Register'>
      <div className={styles.formsignin}>
        <div className={styles.mauto}>
          <Form
            className={(styles.signinform, styles.formbox)}
            onSubmit={handleSubmit}
          >
            <h1 className={styles.signin}>Register</h1>
            <hr />

            <Form.Group
              controlId='userName'
              className='mb-3'
              onSubmit={handleSubmit}
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                id='name'
                placeholder='Zhuge'
                value={userInfo.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='userFamily' className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                name='family'
                id='family'
                placeholder='Liang'
                value={userInfo.family}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='userEmail' className='mb-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                name='email'
                id='email'
                placeholder='zhuge@shu-han.org'
                value={userInfo.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='userPass' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                id='password'
                placeholder=''
                value={userInfo.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='userVerify' className='mb-3'>
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                type='password'
                name='verify'
                id='verify'
                placeholder=''
                value={userInfo.verify}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              className={styles.loginbutton}
              onClick={(function(){onSubmit()})}
            >
              
              Register
            </Button>

            <Alert
              id='alert'
              variant='danger'
              className='mt-3 visually-hidden'
            ></Alert>

            <hr />
            <br />
            <div className='text-center'>
              {'Already have an account? '}
              <Link href='/login' replace>
                Go back to Login
              </Link>
              <p className={styles.fromtoo}>UTD&copy; 2022–2022</p>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
