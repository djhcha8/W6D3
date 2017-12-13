/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__ (1);
const UsersSearch = __webpack_require__ (3);

$(() => { 
  $('.follow-toggle').each((idx, button) => {
    new FollowToggle(button);
  });
  
  $('.user-search').each((idx, nav) => {
    new UsersSearch(nav);
  });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {


const APIUtil = {
  followUser: (id) => {
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'JSON'
    });
  },
  
  unfollowUser: (id) => {
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'JSON'
    });
  },
  
  searchUsers: (queryVal) => {
    return $.ajax({
      method: 'GET',
      url: '/users/search',
      dataType: 'JSON',
      data: {query: queryVal}
    });
  }
};

// prom = new Promise(success)

module.exports = APIUtil;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__ (2);
const FollowToggle = __webpack_require__ (1);

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map