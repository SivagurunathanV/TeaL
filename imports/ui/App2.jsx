import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Questions } from '../api/questions.js';
import { Feedbacks } from '../api/feedbacks.js';


import Feedback from './Feedback.jsx';
import Question from './Question.jsx';
import Teach from './Teach.jsx';



class App extends Component {
  constructor(props) {
    super(props);
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

  renderResults(){
  	 return this.props.questions.map((question) => (
      <Teach key={question._id} question={question} />
    ));
  }
  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }

  render() {
    return (
		<div className="overlay">
							<h2>Teachers</h2>
				<div className = "dropdown">
					<div className = "btn-group">
						<button className = "btn btn-primary dropdown-toggle" type = "button" data-toggle = "dropdown">
						<i className="glyphicon glyphicon-filter"></i>
						</button>
						<ul className="dropdown-menu">
							<li><a href='#'>j-query</a></li>
							<li><a href='#'>machine learning</a></li>
							<li><a href='#'>Entity Relation</a></li>
						</ul>
					</div>
					<div className = "btn-group">
						<button className = "btn btn-default dropdown-toggle" type = "button" data-toggle = "dropdown">
						<i className="glyphicon glyphicon-sort"></i>
						</button>
						<ul className="dropdown-menu">
							<li><a href='#'>time</a></li>
							<li><a href='#'>upvotes</a></li>
						</ul>
					</div>
				</div>
				<div id ="result">
					<div className="container">
						<hgroup className="mb20">
							<h1>Search Results</h1>
						</hgroup>

					    <section className="col-xs-12 col-sm-6 col-md-12">
							<article className="search-result row">

								{this.renderResults()}


							</article>
						</section>

					</div>



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
