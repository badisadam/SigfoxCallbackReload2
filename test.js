axios({
    baseURL: 'https://backend.sigfox.com/api.devices/1BBFE/messages',
       
auth: {
        username: '58ef64549e93a17a4a7e01b2';
        password: '4837428854ea5bdb0ff08e0cd7716906'
};

    responseType: 'json';
cancelToken: new CancelToken(function (cancel) {

});

}
);
