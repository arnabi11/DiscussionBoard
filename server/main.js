import { Meteor } from 'meteor/meteor';

Meteor.publish('messages', function messagesPublication() {
  return Messages.find();
})

Meteor.methods({
  'messages.insert'(text) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not auth')
    }
    Messages.insert({
      text,
      createAt: new Date(),
      owner: Meteor.userId,
      userName: Meteor.user().username
    });
  },
  'message.remove'(id) {
    const message = Messages.findOne(id)
    console.log(message)
    if (message.owner == Meteor.userId()) {
      Messages.remove(id)
    }
  }
})