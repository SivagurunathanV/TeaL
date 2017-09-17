import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Questions } from '../api/questions.js';
import { Feedbacks } from '../api/feedbacks.js';


import Feedback from './Feedback.jsx';
import Question from './Question.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

   incrementCounter(event){
    Questions.update(this.props.questions._id,  {$inc : {'vote' : 1}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const course = ReactDOM.findDOMNode(this.refs.course).value.trim();
    const sec = ReactDOM.findDOMNode(this.refs.section).value.trim();
    const tags = ReactDOM.findDOMNode(this.refs.tags).value.trim();
    Questions.insert({
      text: text,
      course: course,
      sec: sec,
      tags:tags,
      createdAt: new Date(),
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.course).value = '';
    ReactDOM.findDOMNode(this.refs.section).value = '';
    ReactDOM.findDOMNode(this.refs.tags).value = '';
  }

  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }

  render() {
    return (
      <div className="container-fluid">
        <div id="askaquestion" className="row">
          <h2>Ask a Question</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <table>
              <tr>
                <td><label for="question">Question:</label></td>
                <td><input type="text" ref="textInput" name="question" id="question" /></td>
              </tr>
              <tr>
                <td><label for="tags">Tags:</label></td>
                <td>
                  <select name="tags" id="tags" ref="tags">
                  <option value="j-query">j-query</option>
                  <option value="machine learning">machine learning</option>
                  <option value="Entity Relation">Entity Relation</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label for="course">Course:</label></td>
                <td><select name="course" ref="course" id="course">
                  <option value="6360">6360</option>
                  <option value="6314">6314</option>
                  <option value="6330">6330</option>
                </select></td>
              </tr>
              <tr>
                <td><label for="section">Section:</label></td>
                <td><select name="section" ref="section" id="section">
                <option value="001">001</option>
                <option value="002">002</option>
                <option value="003">003</option>
                </select></td>
              </tr>
            </table>
            <input type="submit" value="submit" />
          </form>
        </div>
        <hr />
        <div id="attendingclass" className="row">
            <h2>Attending Classes</h2>
            <div>
            <table className="table">
              {this.renderQuestions()}
            </table>
            </div>
        </div>
        <hr/>
        <div id="posts" className="row">
          <h2>Existing Questions</h2>
          <table className="table">{this.renderQuestions()}</table>
        </div>
      </div>
    );
  }
}

App.propTypes = {
    questions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    questions: Questions.find({},{sort:{createdAt: -1}}).fetch(),
  };
}, App);