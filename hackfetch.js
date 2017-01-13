var hnews = function() {

    if (typeof require === 'function') {
        var fetch = require('node-fetch');
        var exports = module.exports = {};

        var fetchReq = function(url) {
            return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .catch(function(err) {
                console.log('err: ' + err);
            });
        };

        /**
        * Requests 500 of the current TOP stories
        * @return returns the a Promise with the stories in an array by id
        * @example arr = [1337905, 137906, 11376777, ...];
        */
        exports.getTopItems = function() {
            return fetchReq('https://hacker-news.firebaseio.com/v0/topstories.json');
        };

        /**
        * Requests 500 of the current NEWS stories
        * @return returns the a Promise with the stories in an array by id
        * @example arr = [1337905, 137906, 11376777, ...];
        */
        exports.getNewItems = function() {
            return fetchReq('https://hacker-news.firebaseio.com/v0/newstories.json');
        };

        /**
        * Requests 500 of the current SHOW stories
        * @return returns the a Promise with the stories in an array by id
        * @example arr = [1337905, 137906, 11376777, ...];
        */
        exports.getShowItems = function() {
            return fetchReq('https://hacker-news.firebaseio.com/v0/showstories.json');
        };

        /**
        * Requests 500 of the current JOB stories
        * @return returns the a Promise with the stories in an array by id
        * @example arr = [1337905, 137906, 11376777, ...];
        */
        exports.getJobItems = function() {
            return fetchReq('https://hacker-news.firebaseio.com/v0/jobstories.json');
        };

        /**
        * Requests an array of ids from one of 3 categories
        * @return returns a complete array with story information from a selected category
        * @param {String} category - The category to get stories from.
        *  This is an optional param if no category is passed then automatically get  topstories.json
        * @param {Int}  numToGet - The number of items you'd like to receive starting from 0 -> Int
        * This is an optional param if no number is passed then return all results
        * this may be slow...
        * @example arr = [1337905, 137906, 11376777, ...];
        */
        exports.getIdsInCategory = function(category, numToGet) {
            numToGet = numToGet || 500;

            if (arguments.length === 2) {
                var num;
                if (numToGet === 500) {
                    console.warn('Gather information for 500 stories is very slow. Consider lowering the number to return');
                    num = numToGet.toString();
                    console.log(category);
                    return fetchReq('https://hacker-news.firebaseio.com/v0/' + category + '.json?orderBy="$key"&limitToFirst=' + num);
                } else {
                    num = numToGet.toString();
                    return fetchReq('https://hacker-news.firebaseio.com/v0/' + category + '.json?orderBy="$key"&limitToFirst=' + num);
                }
            } else {
                throw Error('You must pass 2 arguments to getIdsInCategory. Please see http://hackdot.co/developers#getDataForCategory');
            }
        };

        /*
        * @param {Int} item_id - The story id details to be requested
        * @return returns the a Promise with the request users details
        * @example returned object
        * {
              "by" : "dhouston",
              "descendants" : 71,
              "id" : 8863,
              "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671]
              "score" : 111,
              "time" : 1175714200,
              "title" : "My YC app: Dropbox - Throw away your USB drive",
              "type" : "story",
              "url" : "http://www.getdropbox.com/u/2/screencast.html"
          }
        */
        exports.getItemById = function(item_id) {
            var url = 'https://hacker-news.firebaseio.com/v0/item/' + item_id + '.json';
            return fetchReq(url);
        };

        /**
        * Request a username by with a case-sensitive id. Only users that have public activity (comments or story submissions) on the site are available through the API.
        * @param {String} username - The users id
        * @return returns the a Promise with the request users details
        */
        exports.getUser = function(username) {
            var url = 'https://hacker-news.firebaseio.com/v0/user/' + username + '.json';
            return fetchReq(url);
        };

        /**
        * The current largest item id
        * @return returns the item as a Promise
        */
        exports.getMaxItem = function() {
            return fetchReq('https://hacker-news.firebaseio.com/v0/maxitem.json');
        };

        /**
        * The item and profile changes
        * @return returns two arrays. One for item changes and another for profile changes
        * @example 'items': [1, 2, 3, ..., 5]; 'profiles': ['pg', 'colealanr'];
        */
        exports.getUpdates = function() {
            return fetchReq('https://hacker-news.firebaseio.com/v0/updates.json?print=pretty');
        };

        return exports;
    }
}();
