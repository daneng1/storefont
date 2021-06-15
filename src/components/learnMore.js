import React from 'react';
import './style/learnMore.scss';

 export default function LearnMore () {
return (
  <section className='learn-more'>
    <section className='tab'>
      <h1>
        LEARN MORE
      </h1>
    </section>
    <section className='expanded'>
      <p>
        Welcome to my React Storefront! I built this using React, Redux and Material UI for the front end. The server uses Express, Node and MongoDB making this a MERN stack application.
      </p>
      <p>
        This is a Single Page Application and is scalable to add more products and categories. Thanks for stopping by!
      </p>
    </section>
  </section>
)

}