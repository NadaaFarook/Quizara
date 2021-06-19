import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom"; 
import AuthContextProvider from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QuizProvider>
    <Router>
    <App />
    </Router>
    </QuizProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
