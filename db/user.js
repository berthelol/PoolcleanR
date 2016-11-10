// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
mongoose.connect('localhost', 'poolcleaner');
// define schema
var UserSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    photo: {
        data: Buffer,
        contentType: String
    }
});
var User = mongoose.model('User', UserSchema);

var App = function() {

    var self = this;
    //create a user
    this.add = function(data, callback) {
      self.find(function(_err, user) {
          //User already exist
          if (user) {
              callback("User already exist", null);
          } else {
              newuser = new User({firstname:data.firstname,lastname:data.firstname});
              newuser.save(function(err) {
                  if (err) return error(err, callback);
                  callback(null, newuser);
              });
          }
      });
    };
    //find user
    this.find = function(callback) {
        User.findOne({}, function(err, user) {
          if (err)
          {
            callback(err,null);
          }else if(user == null){
            callback("No user found",null)
          }else {
            callback(null, user);
          }
        });
    };
    this._Model = User;
    this._Schema = UserSchema;
}

module.exports = new App();
