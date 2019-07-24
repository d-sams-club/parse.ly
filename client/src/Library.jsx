import React from 'react';
import axios from 'axios';
import Navigation from './navbar.jsx';

class Library extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className="container">
          <h4>This Is The Library</h4>
          </div>
        <ul className="list-group">
        {/* Map Song List Entry ??  */}
        {/* Include Song Video Player */}
      </ul>
      </React.Fragment>
    );
  }
}

export default Library;
