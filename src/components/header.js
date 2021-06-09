import React from 'react';
import Categories from './categories.js';
import './style/header.scss';

export default function Header (props) {
  return (
    <section className='header'>
      <h1>Brand</h1>
      <Categories/>
    </section>
  )
}
