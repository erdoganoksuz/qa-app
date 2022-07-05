import React from "react";
import {
  removeAllQuestions,
  sortByQuestion,
} from "../features/question/question-slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import QuestionRow from "./question-row";
import ErrorBar from "./ui/error-bar";
import SectionHeader from "./ui/section-header";

const QuestionList = () => {
  const questions = useAppSelector((state) => state.question.questionList);
  const dispatch = useAppDispatch();

  if (!questions.length) return <ErrorBar text="Questions not found :(" />;

  return (
    <div>
      <div className="centered-flex-box">
        <SectionHeader
          text="Created Questions"
          desc="Here you can find the created questions and their answers"
        />
        <div>
          <button
            onClick={() => dispatch(sortByQuestion())}
            className="button-blue blue"
          >
            Sort Questions
          </button>
          <button
            onClick={() => dispatch(removeAllQuestions())}
            className="button-red red"
          >
            Remove Questions
          </button>
        </div>
      </div>
      {questions.map((q) => (
        <QuestionRow key={q.id} detail={q} />
      ))}
    </div>
  );
};

export default QuestionList;
