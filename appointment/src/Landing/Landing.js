import React, { Fragment } from 'react';
import { css, StyleSheet } from 'aphrodite';
import Home from '../Landing/Home/Home';
import Header from '../Landing/Header/Header';
import Services from '../Landing/Services/Services';
import About from '../Landing/About/About';
import Testimonials from '../Landing/Testimonials/Testimonials';
import Footer from '../Landing/Footer/Footer';
import { appColors } from '../styles/colors';

class Landing extends React.Component {
  render() {
    return (
      <Fragment>
        <div className={css(styles.app)}>
          <header>
            <Header />
          </header>
          <main>
            <section id="home"><Home /> </section>
            <section id="services"><Services /></section>
            <section id="about"><About /></section>
            <section id="testimonials"><Testimonials/></section>
          </main>
          <hr className={css(styles.hr)}/>
          <footer>
            <section id="footer"><Footer /></section>
          </footer>
        </div>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '7px',
  },
  hr: {
    border: 'none',
    width: '100%',
    height: '3px',
    backgroundColor: appColors.primaryText,
  },
});

export default Landing;
