import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Home from '../Landing/Home/Home';
import Header from '../Landing/Header/Header';
import Services from '../Landing/Services/Services';
import About from '../Landing/About/About';
import Testimonials from '../Landing/Testimonials/Testimonials';
import Footer from '../Landing/Footer/Footer';

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
  }
});

export default App;
