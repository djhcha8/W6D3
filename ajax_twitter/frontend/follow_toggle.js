const APIUtil = require("./api_util");

function FollowToggle(button) { 
  this.$button = $(button); 
  this.userId = this.$button.data("user-id");
  this.followState = this.$button.data("initial-follow-state");
  this.render();
  this.$button.on('click',() => this.handleClick());
}

FollowToggle.prototype.render = function() {
  if (this.followState === "unfollowed") {
    this.changeButton("Follow");
  } else if (this.followState === "followed"){
    this.changeButton("Unfollow!");
  } else {
    this.$button.attr("disabled", "disabled");
  }
};

FollowToggle.prototype.changeButton = function(string) {
  this.$button.removeAttr("disabled");
  this.$button.text(string);
};

FollowToggle.prototype.handleClick = function() {
  if (this.followState === "unfollowed") {
    this.followState = "following";
    this.render();
    this.changeState("followed");
  } else {
    this.followState = "unfollowing";
    this.render();
    this.changeState("unfollowed");
  }
};

FollowToggle.prototype.changeState = function(string) {
  if (string === "followed") {
    APIUtil.followUser(this.userId).then(() => {
      this.followState = string;
      this.render();
    });
  } else {
    APIUtil.unfollowUser(this.userId).then(() => {
      this.followState = string;
      this.render();
    });
  }
};

module.exports = FollowToggle;
