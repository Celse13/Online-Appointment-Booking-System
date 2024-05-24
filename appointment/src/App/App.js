import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Auth from '../Auth/Auth';


class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </>
    );
  }
}


export default App;
