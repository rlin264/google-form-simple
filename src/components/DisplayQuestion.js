import React, {useState} from "react";
import styled from "styled-components";

export default function DisplayQuestion({question, id, handleFieldChange}){
    const [value, setValue] = useState();
    const [set, setSet] = useState(new Set());

    function handleCheckbox(e){
      if(set.has(e.target.value)){
        set.delete(e.target.value);
        setSet(set);
      } else {
        setSet(set.add(e.target.value))
      }
      handleFieldChange(Array.from(set), id)
      // console.log(set);
    }
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
                  value={i}
                  onChange={question.type === 'Checkbox' ? handleCheckbox : event => handleFieldChange(event.target.value, id) }
                />
                {option}
              </label>
            ))}
            </form>
          ) : (question.hasDropdown ? (
            <select value={value} onChange={event => handleFieldChange(event.target.value, id)}>
              {question.options.map((option, i) =>(
                  <option key={i} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <textarea value={value} onChange={event => handleFieldChange(event.target.value, id)}/>
          ))}
        </QuestionField>
    );
}

const QuestionField = styled.li`
  margin-top: 1em;
  border-top: #ddd solid 1.5px
  padding-bottom: 1.5em;
`;