import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SurveyItem = props => (
    <tr>
      <td>{props.survey.name}</td>
      <td>
        <Link to={"/edit/"+props.survey._id}>edit</Link> |  <Link to={"/"+props.survey._id}>view form</Link> | <a href="#" onClick={() => { props.deleteSurvey(props.survey._id) }}>delete</a>
      </td>
    </tr>
  )

export default class SurveyList extends React.Component {
    constructor(props) {
      super(props);
  
      this.deleteSurvey = this.deleteSurvey.bind(this);
      this.newSurvey = this.newSurvey.bind(this);
  
      this.state = {surveys: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:5000/surveys/')
        .then(response => {
          this.setState({ surveys: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    componentDidUpdate() {
      axios.get('http://localhost:5000/surveys/')
        .then(response => {
          this.setState({ surveys: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
  
    deleteSurvey(id) {
      axios.delete('http://localhost:5000/surveys/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        surveys: this.state.surveys.filter(el => el._id !== id)
      })
    }
  
    surveyList() {
      return this.state.surveys.map(currentsurvey => {
        return <SurveyItem survey={currentsurvey} deleteSurvey={this.deleteSurvey} key={currentsurvey._id}/>;
      })
    }

    newSurvey(){
      const survey = {
        name: "New Survey",
      };
      axios
        .post(
          "http://localhost:5000/surveys/add/",
          survey
        )
        .then((res) => {
        //   console.log(res.data)
        });
    }
  
    render() {
      return (
        <div>
          <button onClick={this.newSurvey}>New Survey</button>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Survey Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.surveyList() }
            </tbody>
          </table>
        </div>
      )
    }
  }