import React, { Component, PropTypes } from 'react';

import { Questions } from '../api/questions.js';

import { User_Qn } from '../api/user_qn.js';

export default class Question extends Component {
  
  incrementCounter(event){
    Questions.update(this.props.question._id,  {$inc : {'vote' : 1}});
    User_Qn.insert({
      username : "test",
      question_id : this.props.question._id,
      tutor : false
    });
  }

  render() {
    return (
      <div class="col-xs-12 col-sm-12 col-md-6">
      <p>{this.props.question.text}</p>
      <h5><i id="up_vote" className="glyphicon glyphicon-thumbs-up" onClick = {this.incrementCounter.bind(this)}></i>&nbsp;&nbsp;{this.props.question.vote}</h5>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
};
