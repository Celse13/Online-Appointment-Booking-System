import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Auth from '../Auth/Auth';
import Client from '../Profile/Client';
import Staff from '../Profile/Staff';
import Admin from '../Profile/Admin';
import { css, StyleSheet } from 'aphrodite';

class App extends React.Component {
  render() {
    return (
      <div className={css(styles.app)}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile/client" element={<Client />} />
            <Route path="/profile/admin" element={<Admin />} />
            <Route path="/profile/staff" element={<Staff />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default App;
