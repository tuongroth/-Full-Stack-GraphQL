// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none' }}>
        <li style={{ margin: '0 10px' }}>
          <Link to="/authors">Authors</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/books">Books</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/add-book">Add Book</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/set-birth-year">Set Birth Year</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/select-author">Select Author</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
