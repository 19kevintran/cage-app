import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Login.module.scss';

export default function Register() {
  return (
    <Layout>
      <div className={styles.textcenter}>
        <div className={styles.formsignin}>
          <div className={styles.mauto}>
            <form className={styles.signinform}>
              <div className={styles.formbox}>
                <h1 className={styles.signin}>Recover Password</h1>
                <div className={styles.formfloating}>
                  <input
                    type='email'
                    className={styles.formcontrol}
                    id='floatingInput'
                    placeholder='name@example.com'
                  />
                </div>
                <br />
                <button className={styles.loginbutton} type='submit'>
                  Send email
                </button>
                <br />
                <br />
                <p>
                  <Link href='/login' replace>
                    Go back to Login
                  </Link>
                </p>
                <p className={styles.fromtoo}>UTD&copy; 2022–2022</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
