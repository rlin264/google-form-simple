import React from 'react';
import './App.css';
import SurveyBuilder from './components/SurveyBuilder'
import SurveyView from './components/SurveyView'
import ResponseView from'./components/ResponseView'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SurveyList from './components/SurveyList';

function App() {
  return (
    <Router>
      <div className="App">
        <ul className="nav-hor">
          <li><Link className="active" to="/">Home</Link></li>
        </ul>
      <Switch>
          <Route path="/edit/:id" component={SurveyBuilder} />
          <Route path="/responses/:id" component={ResponseView} />
          <Route path="/:id" component={SurveyView} />
          <Route path="/survey">
            <Survey />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return(
      <>
        <h2>Not Google Forms</h2>
        <SurveyList/>
      </>
  );
}

function Survey() {
  return <SurveyBuilder />;
}

export default App;
