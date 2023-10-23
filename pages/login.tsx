import styles from '../styles/Login.module.scss';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const { callbackUrl } = context.query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl || '/',
        premanent: false,
      },
    };
  }

  return {
    props: {
      base: process.env.API,
    },
  };
}

export default function Login({ base, ...data }) {
  const router = useRouter();
  const { callbackUrl } = router.query;

  const [userInfo, setUserInfo] = useState({
    email: 'kongmin@shuhan.org',
    password: 'SunRen',
    callbackUrl: callbackUrl || '/',
  });

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn(
      'credentials',
      userInfo as { email: string; password: string; callbackUrl: string }
    );
  };

  return (
    <Layout title='Login'>
      <div className={styles.formsignin}>
        <div className={styles.mauto}>
          <Form
            className={(styles.signinform, styles.formbox)}
            onSubmit={handleSubmit}
          >
            <h1 className={styles.signin}>Login</h1>
            <hr />

            <Form.Group controlId='userEmail' className='mb-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='kongming@shuhan.org'
                value={userInfo.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='userPass' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder=''
                value={userInfo.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='userRemember' className='mb-3'>
              <Form.Check type='checkbox' label='Remember Me' />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className={styles.loginbutton}
            >
              Login
            </Button>

            <hr />

            <div className='text-center'>
              <p>
                <Link href='/forgotpassword'>Forgot Password</Link>
              </p>
              <p>
                Need to make an account?{' '}
                <Link href='/register' replace>
                  Create an account
                </Link>
              </p>
              <p className={styles.fromtoo}>
                UTD &copy; 2022
                {new Date().getFullYear() > 2022 &&
                  ` - ${new Date().getFullYear()}`}
              </p>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
