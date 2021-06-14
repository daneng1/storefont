import React from 'react';
import { Link } from 'react-router-dom';

import './style/header.scss';

export default function Header (props) {
  return (
    <section className='header'>
      <Link to='/' style={{ textDecoration: 'none' }}>
      <h1>Brand</h1>
      </Link>

    </section>
  )
}
