import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
return (
  <nav className="blue accent-3" role="navigation">
    <div className="nav-wrapper">
      <div className="container">
      <p 
        id="nav-mobile" 
        className="right">
          <Link className="NavLink" to="/topten"
          >Top 10</Link>
      </p>
      <p 
        id="nav-mobile" 
        className="left">
          <Link className="NavLink" to="/library"
          >Library</Link>
      </p>
      <div>
      <Link to="/music" className="brand-logo center">Find Your Beat</Link></div>
      <a href="#" data-activates="mobile-demo" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
      <a href="/topten" data-activates="mobile-demo" className="button-collapse show-on-large"><i className="material-icons">top ten</i></a>
      </div>
    </div>
  </nav>
)
}

export default Navigation;