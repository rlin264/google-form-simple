import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function DisplayResponse({
  question,
  id,
  handleFieldChange,
  responses,
  hasResponses,
}) {
  const [value, setValue] = useState();
  const [set, setSet] = useState(new Set());

  useEffect(() => {
    console.log("ASDSADSA");
    console.log(responses);
  }, []);

function printArr(arr){
    var ret = []
    for(var i of arr){
        ret.push(question.options[parseInt(i)]);
    }
    return(ret.join(","));
}
  return (
    <QuestionField>
      <p>{question.text}</p>
      {hasResponses && (
        <div>
          {responses.map((response, i) => (
            <div>
              {question.hasOptions ? (
                <>
                  {question.type === "Multiple Choice" ? (
                    <p>{question.options[parseInt(response)]}</p>
                  ) : (
                  <p>{printArr(response)}</p>)
                }
                </>
              ) : question.hasDropdown ? (
                <p>{response}</p>
              ) : (
                <p>{response}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </QuestionField>
  );
}

const QuestionField = styled.li`
  margin-top: 1em;
  border-top: #ddd solid 1.5px
  padding-bottom: 1.5em;
`;
