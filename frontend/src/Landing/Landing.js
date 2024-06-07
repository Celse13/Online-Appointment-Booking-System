import React, { Fragment } from 'react';
import { css } from 'aphrodite';
import Home from '../Landing/Home/Home';
import Header from '../Landing/Header/Header';
import Services from '../Landing/Services/Services';
import About from '../Landing/About/About';
import Testimonials from '../Landing/Testimonials/Testimonials';
import Footer from '../Landing/Footer/Footer';
import { testimonialsStyles } from '../styles/landingStyles';

class Landing extends React.Component {
  render() {
    return (
      <Fragment>
        <div>
          <header>
            <Header />
          </header>
          <main>
            <section id="home"><Home /></section>
            <section id="services"><Services /></section>
            <section id="about"><About /></section>
            <section id="testimonials"><Testimonials /></section>
          </main>
          <footer>
            <hr className={css(testimonialsStyles.hr)} />
            <section id="contacts"><Footer /></section>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Landing;
