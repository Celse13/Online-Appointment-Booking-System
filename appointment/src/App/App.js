import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Home from '../Landing/Home/home';
import Header from '../Landing/Header/header';

class App extends React.Component {
  render() {
    return (
      <div className={css(styles.app)}>
        <header>
          <Header />
        </header>
        <main>
          <Home />
        </main>
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
