import React from 'react';
import './style/footer.scss';

export default function Footer (props) {
  return(
    <section className='footer-section'>
      <ul>
        <li>&copy; 2021 Dan Engel</li>
        <li><a href="https://www.linkedin.com/in/danengel-seattle/" target="_blank" rel="noreferrer"><img src='https://ricardoreadingmouse.com.au/wp-content/uploads/2018/04/linkedin-logo-copy.png'   alt='LinkedIn'/></a></li>
        <li><a href="https://github.com/daneng1" target='_blank' rel="noreferrer"><img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'  alt='GitHub'/></a></li>
      </ul>
    </section>
  )
}