import React, { useState } from "react";
import SurveyTitle from "./SurveyTitle";
import SurveyQuestion from "./SurveyQuestion";
import DisplayQuestion from "./DisplayQuestion";
import Question from "../models/Question";
import ListController from "../controllers/ListController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles.css";

export default function SurveyBuilder() {
  const [title, handleChangeTitle] = useInputValue("Edit Survey Title");
  const [questions, setQuestions] = useState([new Question()]);
  const [preview, setPreview] = useState(false);

  function useInputValue(initial) {
    const [value, setValue] = useState(initial);
    const handleChangeValue = (e) => setValue(e.target.value);
    return [value, handleChangeValue];
  }

  function togglePreview() {
    setPreview(!preview);
  }

  const listController = new ListController(questions, setQuestions);

  return (
    <div>
      <button
        onClick={togglePreview}
        style={{ float: "right", "margin-top": "3.7vh", "margin-right": "1vh" }}
      >
        {preview ? (
          <>
            <FontAwesomeIcon icon={["fas", "sign-out-alt"]} fixedWidth />
            Exit Preview
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={["fas", "eye"]} fixedWidth />
            View Preview
          </>
        )}
      </button>
      {preview ? (
        <div className="small-container">
          <SurveyTitle title={title} handleChangeTitle={handleChangeTitle} preview={true} />
          <ol>
            {questions.map((question, i) => (
              <DisplayQuestion
                question={question}
              />
            ))}
          </ol>
        </div>
      ) : (
        <div className="small-container">
          <SurveyTitle title={title} handleChangeTitle={handleChangeTitle} />

          <ol>
            {questions.map((question, i) => (
              <SurveyQuestion
                key={question.id}
                question={question}
                setQuestion={(question) => listController.set(i, question)}
                removeQuestion={() => listController.remove(i)}
                moveQuestionUp={() => listController.moveUp(i)}
                moveQuestionDown={() => listController.moveDown(i)}
              />
            ))}
          </ol>
          <button onClick={() => listController.add(new Question())}>
            <FontAwesomeIcon icon={["fas", "plus"]} fixedWidth />
            Add Question
          </button>
        </div>
      )}
    </div>
  );
}
