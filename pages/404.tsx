import Layout from '../components/Layout';

export default function Custom404() {
  const names = ['John', 'Elijah', 'Kevin'];
  const randomName = Math.floor(Math.random() * names.length);
  const name = names[randomName];
  return (
    <Layout>
      <div
        className='container'
        style={{
          paddingTop: '10vh',
        }}
      >
        <div className='d-flex justify-content-center'>
          <div>
            <h1>404: Page Not Found</h1>
            <p>Dang, I think Elijah forgot to make this page</p>
            <hr />
          </div>
        </div>
      </div>
    </Layout>
  );
}
