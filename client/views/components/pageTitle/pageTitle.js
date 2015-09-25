Template.pageTitle.helpers({
  pageTitle: function () {
    var currentView;

    if (Router.current().route != undefined) {
     currentView = Router.current().route.getName();
    } else {
     currentView = "notFound";
    };

    return QV.pageTitles[currentView];
    
  }
});
