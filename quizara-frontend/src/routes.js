import React from "react";

import { Routes, Route } from "react-router-dom";
import {
  Home,
  Signup,
  Login,
  Quizzes,
  Quiz,
  Result,
  Leaderboard,
  User,
} from "./pages/index";
import Redirect from "./services/redirect";

const RoutesHolder = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Redirect path="/quizzes" element={<Quizzes />} />
        <Redirect path="/quizzes/:quizId" element={<Quiz />} />
        <Redirect path="/quizzes/:quizId/result" element={<Result />} />
        <Redirect path="/leaderboard" element={<Leaderboard />} />
        <Redirect path="/user" element={<User />} />
      </Routes>
    </div>
  );
};
export default RoutesHolder;
