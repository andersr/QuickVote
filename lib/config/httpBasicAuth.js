var basicAuth = new HttpBasicAuth(function(username, password) {
    return 'guest' == username & 'password' == password;
});
basicAuth.protect();