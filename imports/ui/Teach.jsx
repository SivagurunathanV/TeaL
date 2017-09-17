import React, { Component, PropTypes } from 'react';

import { Questions } from '../api/questions.js';

export default class Question extends Component {
  handleSubmit(event) {
    const text = ReactDOM.findDOMNode(this.refs.qs).value.trim();
    Questions.update(
      {text: text},
      {tutor: true}
    );

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.course).value = '';
    ReactDOM.findDOMNode(this.refs.section).value = '';
    ReactDOM.findDOMNode(this.refs.tags).value = '';

  }

	render(){

//      if(this.props.question.tutor==false||this.props.question.tutor=='')
{
    return (

        <div className="ht">								<div className="col-xs-12 col-sm-12 col-md-6">

									<h3><a href="#" title="" ref="qs">{this.props.question.text}</a></h3>
			<p><span>{this.props.question.course}</span><span>{this.props.question.tutor}</span></p>
		<p>							<span>{this.props.question.sec}</span>
										</p>
									<h5>
									<span className="label label-default"><span>{this.props.question.tags}</span></span>
									</h5>
            <input type="submit" value="submit" onSubmit={this.handleSubmit.bind(this)}/>

					            </div>


		</div>
    );
  }
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
};
