import React from "react";
import Question from "../models/Question";
import ListController from "../controllers/ListController";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from "styled-components";

export default function QuestionForm({ question, setQuestion }) {
  function handleChangeText(e) {
    setQuestion(question.merge({ text: e.target.value }));
  }

  function handleChangeType(e) {
    setQuestion(question.merge({ type: e.target.value }));
  }

  function setOptions(options) {
    setQuestion(question.merge({ options }));
  }

  const listController = new ListController(question.options, setOptions);

  return (
    <div>
      <label>Question Text:</label>
      <input type="text" value={question.text} onChange={handleChangeText} />

      <label htmlFor="question-type">Question Type:</label>
      <select
        id="question-type"
        value={question.type}
        onChange={handleChangeType}
      >
        {Object.values(Question.TYPES).map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {(question.hasOptions || question.hasDropdown)   && (
        <fieldset>
          <legend>Options</legend>

          {question.options.map((option, i) => (
            <Option key={i}>
              <input
                type="text"
                placeholder="Enter option"
                name={option}
                value={option}
                onChange={e => listController.set(i, e.target.value)}
              />
              <Buttons>
                <Button onClick={() => listController.moveUp(i)}>
                  <FontAwesomeIcon icon={["fas", "angle-up"]} fixedWidth />
                </Button>
                <Button onClick={() => listController.moveDown(i)}>
                  <FontAwesomeIcon icon={["fas", "angle-down"]} fixedWidth />
                </Button>
                <Button onClick={() => listController.remove(i)}>
                  <FontAwesomeIcon icon={["fas", "trash-alt"]} fixedWidth />
                </Button>
              </Buttons>
            </Option>
          ))}
          <p>
            <Button onClick={() => listController.add("")}>
              <FontAwesomeIcon icon={["fas", "plus"]} fixedWidth />
              Add Option
            </Button>
          </p>
        </fieldset>
      )}
    </div>
  );
}

const Option = styled.div`
  display: flex;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: none;
  color: #0366ee;
  margin-left: 0.2em;
  &:focus {
    background-color: white;
    color: #0366ee;
  }
`;
