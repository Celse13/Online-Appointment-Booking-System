import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Home from '../Landing/Home/Home';
import Header from '../Landing/Header/Header';
import Services from '../Landing/Services/Services';
import About from '../Landing/About/About';
import Testimonials from '../Landing/Testimonials/Testimonials';
import Footer from '../Landing/Footer/Footer';
import { appColors } from '../styles/colors';

class App extends React.Component {
  render() {
    return (
      <div className={css(styles.app)}>
        <header>
          <Header />
        </header>
        <main>
          <Home />
          <Services />
          <About />
          <Testimonials/>
        </main>
        <hr className={css(styles.hr)}/>
        <footer>
          <Footer />
        </footer>
      </div>
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

export default App;
