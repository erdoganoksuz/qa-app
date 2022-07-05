import React, { SyntheticEvent, useState } from "react";
import { editQuestion } from "../features/question/question-slice";
import { useAppDispatch } from "../hooks";
import { Question } from "../models/question";

interface Props {
  detail: Question;
}

const EditQuestion: React.FC<Props> = ({ detail }: Props) => {
  const [question, setQuestion] = useState(detail.question);
  const [answer, setAnswer] = useState(detail.answer);

  const dispatch = useAppDispatch();

  const saveChanges = (e: SyntheticEvent<HTMLFormElement>) => {
    if (!e.currentTarget.checkValidity()) return;
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      editQuestion({
        id: detail.id,
        question,
        answer,
      })
    );
  };

  return (
    <form onSubmit={saveChanges}>
      <div className="question-row">
        <div className="row">
          <div className="six columns">
            <label>Question</label>
            <input
              className="u-full-width"
              type="text"
              required
              placeholder="What Does the Fox Say?"
              value={question}
              onChange={(e) => setQuestion(e.currentTarget.value)}
            />
          </div>
        </div>
        <label>Question</label>
        <textarea
          className="u-full-width"
          placeholder="But there's one sound
        That no one knows
        What does the fox say?"
          required
          value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}
        ></textarea>
        <input type="submit" value="Save Changes" className="button-green" />
      </div>
    </form>
  );
};

export default EditQuestion;
