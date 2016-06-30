searchApp.filter('toMinutes', function() {
    return function(seconds) {
        var minutes = parseInt(seconds / 60, 10);
        return minutes + ' min'
    };
})