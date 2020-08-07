import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyTitle from "./SurveyTitle";
import SurveyQuestion from "./SurveyQuestion";
import DisplayQuestion from "./DisplayQuestion";
import Question from "../models/Question";
import ListController from "../controllers/ListController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles.css";

export default function SurveyBuilder(props) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([new Question()]);
  const [preview, setPreview] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
      console.log(`q${i}`);
      console.log(q);
    }
    setQuestions(q_arr);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/surveys/" + props.match.params.id)
      .then((response) => {
        console.log(response.data);
        handleLoadQuestions(response.data.questions);
        setTitle(response.data.name);
        setIsLoaded(true);
      });
  }, []);

  function onSave(e) {
    e.preventDefault();

    const survey = {
      name: title,
      questions: questions,
    };
    console.log("saved");
    console.log(survey);

    axios
      .post(
        "http://localhost:5000/surveys/update/" + props.match.params.id,
        survey
      )
      .then((res) => console.log(res.data));
  }

  function togglePreview() {
    setPreview(!preview);
  }

  const listController = new ListController(questions, setQuestions);

  return (
    <div >
      {isLoaded && (
        <div>
          <div>
            <button
              onClick={togglePreview}
              style={{
                position: "absolute",
                float: "right",
                right: "0",
                clear: "both",
                "margin-top": "3.7vh",
                "margin-right": "1vh",
              }}
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
          </div>
          <div></div>
          {preview ? (
            <div className="small-container" style={{"alignItems":"center"}}>
              <SurveyTitle
                title={title}
                handleChangeTitle={handleChangeTitle}
                preview={true}
              />
              <div>
                {questions.map((question, i) => (
                  <DisplayQuestion question={question} />
                ))}
              </div>
            </div>
          ) : (
            <div className="small-container" style={{"alignItems":"center"}}>
              <SurveyTitle
                title={title}
                handleChangeTitle={handleChangeTitle}
              />

              <div>
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
              </div>
              <button onClick={() => listController.add(new Question())}>
                <FontAwesomeIcon icon={["fas", "plus"]} fixedWidth />
                Add Question
              </button>
              <button
                onClick={onSave}
                style={{
                  "margin-left": "1vh",
                }}
              >
                Save Form
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
