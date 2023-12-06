import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
        <h1> PageNotFound</h1>
        <h3> Go to Homepage:  <Link to="/">Homepage</Link> </h3>
    </div>
  )
}

export default PageNotFound