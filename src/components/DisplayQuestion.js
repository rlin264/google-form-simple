import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DisplayQuestion({question}){
    return(
        <QuestionField>
          <p>{question.text}</p>
          {question.hasOptions ? (
            <form>
            {question.options.map((option, i) => (
              <label key={i}>
                <input
                  type={question.inputType}
                  id={option}
                  name={question.text}
                  value={option}
                />
                {option}
              </label>
            ))}
            </form>
          ) : (question.hasDropdown ? (
            <select>
              {question.options.map((option, i) =>(
                  <option key={i} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <textarea/>
          ))}
        </QuestionField>
    );
}

const QuestionField = styled.li`
  margin-top: 1em;
  border-top: #ddd solid 1.5px
  padding-bottom: 1.5em;
`;