const APIUtil = require ('./api_util');
const FollowToggle = require ('./follow_toggle');

function UsersSearch(nav) {
  this.$nav = $(nav);
  this.$ul = $('nav ul');
  this.$input = $('nav input');
  this.$input.on('keyup', (event) => this.handleInput(event));
}

UsersSearch.prototype.handleInput = function(event) {
  APIUtil.searchUsers($(event.currentTarget).val()).then((res) => this.renderResults(res));
};

UsersSearch.prototype.renderResults = function(response) {
  this.$ul.empty();
  
  
  for (var i = 0; i < response.length; i++) {
    let user = response[i];
    let $li = $(`<li><a href='/users/${user.id}'>${user.username}</a></li>`);
    
    this.$ul.append($li);
    
  }
  
};


module.exports = UsersSearch;