Template.pageTitle.helpers({
  pageTitle: function () {
    
    var currentRoute;

    if (Router.current().route != undefined) {
      currentRoute = Router.current().route.getName();
    } else {
      currentRoute = "notFound";
    };

    switch (currentRoute){

        case 'voteDetail':
          return this.title;

        case 'notFound':
          return "Page Not Found";  

        default:
          return "QuickVote";
    };
    
    
  }
});
