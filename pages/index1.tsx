import styles from '../styles/Index.module.scss';
import Layout from '../components/Layout';
export default function Register() {
  const dashboard = [
    { name: 'My Cage', page: '/inventroy' },
    { name: 'Rental Tracking', page: '/tracking' },
    { name: 'Statistics', page: '/statistics' },
    { name: 'Tasks', page: '/tasks' },
    { name: 'Business', page: '/business' },
    { name: 'History', page: 'History' },
  ];
  return (
    <Layout>
      <div className={styles.container}>
        <form action='/inventory'>
          <input
            type='submit'
            className={styles.dashbaordButton}
            value='My Cage'
          />
        </form>
        <form action='/tracking'>
          <input
            type='submit'
            className={styles.dashbaordButton}
            value='Rental Tracking'
          />
        </form>
        <form action='/statistics'>
          <input
            type='submit'
            className={styles.dashbaordButton}
            value='Statistics'
          />
        </form>
        <form action='/tasks'>
          <input
            type='submit'
            className={styles.dashbaordButton}
            value='Tasks'
          />
        </form>
        <form action='/business'>
          <input
            type='submit'
            className={`${styles.dashbaordButton}`}
            value='Business'
          />
        </form>
        <form action='/history'>
          <input
            type='submit'
            className={styles.dashbaordButton}
            value='History'
          />
        </form>
      </div>
    </Layout>
  );
}
