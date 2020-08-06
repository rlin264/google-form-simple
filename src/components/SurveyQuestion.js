import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SurveyQuestion({
  question,
  setQuestion,
  removeQuestion,
  moveQuestionUp,
  moveQuestionDown
}) {
  const [editing, setEditing] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <QuestionField>
      {editing ? (
        <QuestionForm question={question} setQuestion={setQuestion} />
      ) : (
        <>
          <p>{question.text}</p>
          <form>
          {question.hasOptions ? (
            question.options.map((option, i) => (
              <label key={i}>
                <input
                  type={question.inputType}
                  id={option}
                  name={question.text}
                  value={option}
                  disabled
                />
                {option}
              </label>
            ))
          ) : question.hasDropdown ? (
            <select>
              {question.options.map((option, i) =>(
                  <option key={i} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <textarea disabled />
          )}
          </form>
        </>
      )}
      <Button onClick={toggleEditing}>
        {editing ? (
          <>
            <FontAwesomeIcon icon={["fas", "save"]} fixedWidth />
            Save Question
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={["fas", "pen"]} fixedWidth />
            Edit Question
          </>
        )}
      </Button>
      <Button onClick={removeQuestion}>
      <FontAwesomeIcon icon={["fas", "trash-alt"]} fixedWidth />
        Delete Question
      </Button>
      <br />
      Move Question:{" "}
      <Button onClick={moveQuestionUp}>
      <FontAwesomeIcon icon={["fas", "angle-up"]} fixedWidth />
        Up
      </Button>
      <Button onClick={moveQuestionDown}>
      <FontAwesomeIcon icon={["fas", "angle-down"]} fixedWidth />
        Down
      </Button>
    </QuestionField>
  );
}

const QuestionField = styled.li`
  margin-top: 1em;
  border-top: #ddd solid 1.5px
  padding-bottom: 1.5em;
`;

const Button = styled.button`
  margin: 0.3em;
`;
