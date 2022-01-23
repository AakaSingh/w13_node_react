import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Offices from './Offices.js'
import Header from './Header.js'
import Footer from './Footer.js'


ReactDOM.render(
  <React.StrictMode>
    <Header companyName="Final Practical Exam"/>
    <Offices />
    <Footer authorName="Aakash Singh"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
