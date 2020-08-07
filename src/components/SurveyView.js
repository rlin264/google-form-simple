import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import SurveyTitle from "./SurveyTitle";
import DisplayQuestion from "./DisplayQuestion";
import Question from "../models/Question";

import "../styles.css";

export default function SurveyView(props) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([new Question()]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({});

  const history = useHistory()
  const handleFieldChange = (val, fieldId) => {
    let newFields = { ...fieldsValues };
    newFields[fieldId] = val;
    console.log(newFields);
    setFieldsValues(newFields);
  };

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

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
      });
  }, []);

  function onSubmit(){
      console.log("ASD");
      console.log(fieldsValues)
      const response = {
        survey: props.match.params.id,
        responses: fieldsValues
      };
      console.log(response)
      axios
        .post(
          "http://localhost:5000/responses/add/",
          response
        )
        .then((res) => {
          console.log(res.data)
          history.goBack()
        });
      /*
      TODO: Edit router to allow retrieval of user responses
      TODO: Display answers to questions on a separate page using question id and survey id (props.match.params.id)
      */
  }

  return (
    <div>
      {isLoaded && (
        <div className="small-container">
          <SurveyTitle
            title={title}
            handleChangeTitle={handleChangeTitle}
            preview={true}
          />
          <ol>
            {questions.map((question, i) => (
              <DisplayQuestion key={i} id = {question.id} question={question} handleFieldChange={handleFieldChange} />
            ))}
          </ol>
          <button onClick={onSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}
