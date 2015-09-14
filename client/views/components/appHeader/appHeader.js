// Template.appHeader.onRendered(function(){
//   this.$(".dropdown").dropdown();
//   this.$('.sidebar-menu-popup').popup();
// });

Template.appHeader.helpers({
  headerLeft: function(){
    var current_view = Router.current().route.getName();

    //display new vote button on homepage


    // display back to home button on other pages
  },
  headerCenter: function () {
      return "foo";

    // // TODO: Create a global 'current_view' helper
    // var current_view = Router.current().route.getName();
  
    // switch (current_view){
    //   case 'home':
    //     return "user_nav";      

    //   case 'login':
    //     return "page_title";

    //   case 'tag_matches':
    //     return "page_title";

    //   case 'edit_post':
    //     return "post_title";

    //   case 'show_post':
    //     return "post_title";

    //   case 'tags_list':
    //     return "page_title";

    //   case 'search_results':
    //      return "search_form";   

    //   default: 
    //     return "page_title";
    // };
  },
  showLogin: function(){
    return Router.current().route.getName() !== 'login';
  },
  addingNewVote: function(){
    return Router.current().route.getName() === 'createVote';
  }
});

Template.appHeader.events({

  "click .new-vote": function(){
    if (Meteor.user()) {
       Router.go('createVote');
    } else {
      console.log('show twbs login modal')
       // show twbs login modal $('#loginModal').modal('show');
    };
  }
  
});

// Template.app_header.helpers({
//   headerLeft: function () {
//     return LogdAppHeader[Router.current().route.getName()].headerLeft;
//   },

//   headerRight: function () {
//     return LogdAppHeader[Router.current().route.getName()].headerRight;
//   },
//     saveNotice: function() {

//       // GOAL: if save changes was displayed, wait 2s before displaying a save notice again
//       // if save notice + pause after is currently being displayed, ignore any requests to redisplay it until done

//       // if (Session.get("saveNotice") === "Changes Saved."){
//       //   return Session.get('saveNotice');
//       //     Meteor.setTimeout(function() {
//       //       Session.set("displaySaveNotice", false);
//       //     }, 2000);
//       // }

//       // every 2 seconds set notice to ""
//       // then get 
//     // if(Session.get("hasContent")){
//       //    Meteor.setTimeout(function() {
//       //   Session.set("displaySaveNotice", false);
//       //    // Session.set("saveNotice", "");
//       // }, 2000);

//    if(Session.get("hasContent")){
//       return Session.get('saveNotice');
//     }
//   },
//   // newPost: function () {
//   //   return LogdButtons.newPost;
//   // },
//     showRightButton: function() {
//       if(Router.current().route.getName() === 'edit_post'){

//         return Session.get("hasContent");
//       } else {
//         return true;
//       };
//   },
//     disableCreate: function(){
//     if (Session.get("disableCreate")) {
//       return "disabled";
//     } else{
//        return "";
//     };
//   }
// });