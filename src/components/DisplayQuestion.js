import React, { useState } from "react";
import styled from "styled-components";

export default function DisplayQuestion({ question, id, handleFieldChange }) {
  const [value, setValue] = useState();
  const [set, setSet] = useState(new Set());

  function handleCheckbox(e) {
    if (set.has(e.target.value)) {
      set.delete(e.target.value);
      setSet(set);
    } else {
      setSet(set.add(e.target.value));
    }
    handleFieldChange(Array.from(set), id);
    // console.log(set);
  }
  return (
    <QuestionField>
      <h3 style={{"fontWeight":"normal"}}>{question.text}</h3>
      {question.hasOptions ? (
        <form>
          {question.options.map((option, i) => (
            <div class="state p-primary">
              {" "}
              <label key={i}>
                <input
                  type={question.inputType}
                  id={option}
                  name={question.text}
                  value={i}
                  onChange={
                    question.type === "Checkbox"
                      ? handleCheckbox
                      : (event) => handleFieldChange(event.target.value, id)
                  }
                />
                {"  "}{option}
              </label>
            </div>
          ))}
        </form>
      ) : question.hasDropdown ? (
        <select
          value={value}
          onChange={(event) => handleFieldChange(event.target.value, id)}
          style={{height:"50px"}}
        >
          <option value="" disabled selected>Select your option</option>
          {question.options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <textarea
          value={value}
          onChange={(event) => handleFieldChange(event.target.value, id)}
        />
      )}
    </QuestionField>
  );
}

const QuestionField = styled.div`
  margin-top: 1em;
  border-top: #ddd solid 1.5px
  padding-bottom: 1.5em;
`;
