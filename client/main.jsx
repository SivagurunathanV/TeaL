import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';


import Login from '../imports/ui/Login.jsx';

Meteor.startup(() => {
  $("#center").hide();
  render(<Login />, document.getElementById('loginPage'));
});
