import React, { SyntheticEvent, useState } from "react";
import { removeQuestion } from "../features/question/question-slice";
import { useAppDispatch } from "../hooks";
import { Question } from "../models/question";
import EditQuestion from "./edit-question";

interface Props {
  detail: Question;
}

const QuestionRow: React.FC<Props> = ({ detail }: Props) => {
  const [isAnswerActive, setAnswerActive] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const handleRemove = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(removeQuestion(detail.id));
  };

  if (editMode) return <EditQuestion detail={detail} />;

  return (
    <div
      onClick={() => setAnswerActive(!isAnswerActive)}
      className="centered-flex-box question-row"
    >
      <div>
        <b>{detail.question}</b>
        {isAnswerActive && <div>{detail.answer}</div>}
      </div>
      <div>
        <button onClick={() => setEditMode(true)} className="button-blue">
          Edit
        </button>
        <button onClick={handleRemove} className="button-red red">
          Remove
        </button>
      </div>
    </div>
  );
};

export default QuestionRow;
