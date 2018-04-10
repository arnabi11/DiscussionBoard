import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.message.onCreated(function bodyOnCreated() {
  Meteor.subscribe('messages')
})


Template.registerHelper('formatDate', function (date) {
  return moment(date).format('DD/MM/YYY')
})

Template.message.helpers({
  messages: function () {
    return Messages.find({}, { sort: { createAt: -1 } })
  }
})


Template.add.events({
  'submit #messageForm'(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;

    Meteor.call('messages.insert', text)
    return false;
  }
});
Template.message.events({
  'dblclick .messageText'() {
    Meteor.call('message.remove', 'this._id')
  }
})