import React from "react";
import QuestionForm from "./question-form";
import QuestionList from "./question-list";

const Wrapper = () => {
  return (
    <div className="container wrapper">
      <h1>Awesome Q/A App</h1>
      <QuestionForm />
      <QuestionList />
    </div>
  );
};

export default Wrapper;
