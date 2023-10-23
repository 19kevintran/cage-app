import React from 'react';

export default function Footer() {
  const dateStart = 2022;
  const date = new Date().getFullYear();
  const dateDisplay = date > dateStart ? `${dateStart} - ${date}` : `2022`;
  return (
    <div className='footer'>
      <div className='container'>&copy; {`Copyright ${dateDisplay}`}</div>
    </div>
  );
}
