import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Questions } from '../api/questions.js';
import { Feedbacks } from '../api/feedbacks.js';

import App from './App.jsx';
import App2 from './App2.jsx';

import Feedback from './Feedback.jsx';
import Question from './Question.jsx';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

 handleSubmit(event) {
    event.preventDefault();
    let text = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    ReactDOM.findDOMNode(this.refs.userName).value = '';
    $("#loginPage").hide();
    $("#center").show();
    ReactDOM.render(<App username={text} />, document.getElementById('homecontent'));
    ReactDOM.render(<App2 />, document.getElementById('teach'));
  }

 render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Enter your Username" ref="userName" align = "center"/>
      </form>
    );
  }
}