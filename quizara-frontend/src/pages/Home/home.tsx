import React from "react";
import { Link } from "react-router-dom";
import './home.css'
const Home = () => {
  return (
    <div className="Home">
      <h1>Quiz App ll</h1>

      <div className="links">
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
      <br />
      <Link to="/quizzes">Go to quiz</Link>
      <br />
      <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </div>
  );
};

export default Home;
