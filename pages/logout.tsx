import { useEffect } from 'react';

export function getServerSideProps(context) {
  return {
    props: { base: process.env.API },
  };
}
export default function Logout({ base }) {
  useEffect(() => {
    window.localStorage.removeItem('jwt_token');
    window.location.replace('/login');
  });
}
