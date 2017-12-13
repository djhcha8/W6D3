const FollowToggle = require ('./follow_toggle');
const UsersSearch = require ('./users_search');

$(() => { 
  $('.follow-toggle').each((idx, button) => {
    new FollowToggle(button);
  });
  
  $('.user-search').each((idx, nav) => {
    new UsersSearch(nav);
  });
});
