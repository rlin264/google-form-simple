import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SurveyTitle from "./SurveyTitle";
import DisplayResponse from "./DisplayResponse";
import Question from "../models/Question";

import "../styles.css";

export default function ResponseView(props) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([new Question()]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({});
  const [responses, setResponses] = useState({});
  const [hasResponses, setHasResponses] = useState(false);

  const history = useHistory();
  const handleFieldChange = (val, fieldId) => {
    let newFields = { ...fieldsValues };
    newFields[fieldId] = val;
    console.log(newFields);
    setFieldsValues(newFields);
  };

  function handleLoadQuestions(questions) {
    var q_arr = [];
    for (var i = 0; i < questions.length; i++) {
      var q = new Question({
        text: questions[i].text,
        type: questions[i].type,
        options: questions[i].options,
        id: questions[i].id,
      });
      q_arr.push(q);
      responses[questions[i].id] = [];
    }
    setQuestions(q_arr);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/surveys/" + props.match.params.id)
      .then((response) => {
        // console.log(response.data);
        handleLoadQuestions(response.data.questions);
        setTitle(response.data.name);
        setIsLoaded(true);
      })
      .then(() => {
        axios
          .get(
            "http://localhost:5000/responses/survey/" + props.match.params.id
          )
          .then((response) => {
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
              console.log("ABC");
              console.log(response.data[i].responses);
              Object.keys(response.data[i].responses).forEach(function (
                key,
                index
              ) {
                console.log(key);
                responses[key].push(response.data[i].responses[key]);
              });
            }
            setHasResponses(true);
          });
      });
  }, []);

  function onSubmit() {
    history.goBack();
  }

  return (
    <div>
      {isLoaded && hasResponses && (
        <div className="small-container">
          <SurveyTitle title={title} preview={true} />
          <div>
            {questions.map((question, i) => (
              <DisplayResponse
                key={i}
                // survey={props.match.params.id}
                id={question.id}
                hasResponses={hasResponses}
                question={question}
                responses={responses[question.id]}
                handleFieldChange={handleFieldChange}
              />
            ))}
          </div>
          <button onClick={onSubmit}>Back</button>
        </div>
      )}
    </div>
  );
}
