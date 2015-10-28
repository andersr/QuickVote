BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();

var trusted = [
  '*.google-analytics.com',
  '*.googleapis.com',
  '*.gstatic.com',
  '*.googleusercontent.com',
  'graph.facebook.com',
  '*.fbcdn.net',
  'secure.gravatar.com',
  'i0.wp.com'
];

_.each(trusted, function(origin) {
  // origin = "https://" + origin;
  BrowserPolicy.content.allowOriginForAll(origin);
});