import React, { SyntheticEvent, useState } from "react";
import {
  addQuestionToList,
  disableDelay,
  enableDelay,
} from "../features/question/question-slice";
import { useAppDispatch } from "../hooks";
import SectionHeader from "./ui/section-header";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [delay, setDelay] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const saveQuestion = async (e: SyntheticEvent<HTMLFormElement>) => {
    if (!e.currentTarget.checkValidity()) return;

    e.preventDefault();
    setLoading(true);
    await dispatch(
      addQuestionToList({
        question,
        answer,
        id: Math.random(),
      })
    );

    setQuestion("");
    setAnswer("");
    setLoading(false);
  };

  const handleDelayCheckbox = () => {
    const status = !delay;
    setDelay(status);
    dispatch(status ? enableDelay() : disableDelay());
  };

  return (
    <form onSubmit={saveQuestion}>
      <SectionHeader
        text="Create a new question"
        desc="Here you can create new questions and their answers"
      />
      <div className="row">
        <div className="six columns">
          <label htmlFor="question">Question</label>
          <input
            className="u-full-width"
            type="text"
            required
            placeholder="What Does the Fox Say?"
            value={question}
            onChange={(e) => setQuestion(e.currentTarget.value)}
            id="question"
          />
        </div>
      </div>
      <label htmlFor="answer">Answer</label>
      <textarea
        className="u-full-width"
        placeholder="But there's one sound
        That no one knows
        What does the fox say?"
        id="answer"
        required
        value={answer}
        onChange={(e) => setAnswer(e.currentTarget.value)}
      ></textarea>
      <div className="row">
        <label className="delay-checkbox">
          <input
            checked={delay}
            value={String(delay)}
            onChange={handleDelayCheckbox}
            type="checkbox"
          />
          <span className="label-body">Enable 5s delay</span>
        </label>
        <input
          type="submit"
          className="button-green"
          value={loading ? "Saving..." : "Save"}
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default QuestionForm;
