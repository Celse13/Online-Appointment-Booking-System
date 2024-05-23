import React from 'react';
import Auth from '../Auth/Auth';
import { css, StyleSheet } from 'aphrodite';

class App extends React.Component {
  render() {
    return (
      <div className={css(styles.app)}>
        <Auth />
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
