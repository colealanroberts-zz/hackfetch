# Hackfetch

A Promise based Javascript wrapper for the HackerNews API. Follows all endpoints for the official [HackerNews Firebase API](https://github.com/HackerNews/API/).



## Installation
Installation is straightforward and simple.

npm
```
npm install hackfetch-js
```

NodeJS
```
var hnews = require('hackfetch-js');
```

## API Usage

Every response returned to the API is done through using the `node-fetch` module and is returned as a Promise.

### Methods


#### .getTopStories()

Returns an array ids for the top 500 stories on HackerNews

Example
```
hnews.getTopStories().then(function(topStories) {
    console.log(topStories) // [0, 1, 2, ..., 499];
});
```
#### .getNewsStories()

Returns an array ids for the top 500 news stories on HackerNews

Example
```
hnews.getNewsStories().then(function(newsStories) {
    console.log(newsStories) // [0, 1, 2, ..., 499];
});
```
#### .getShowStories()

Returns an array ids for the top 500 showHN stories on HackerNews

Example
```
hnews.getShowStories().then(function(showStories) {
    console.log(showStories) // [0, 1, 2, ..., 499];
});
```
#### .getJobStories()

Returns an array ids for the top 500 job stories on HackerNews

Example
```
hnews.getJobStories().then(function(jobs) {
    console.log(jobs) // [1, 2, 3, ..., 500];
});
```
#### .getIdsInCategory(category, numToGet)

Requests an array of ids from one of 4 categories above.

***@param {String}*** _category_ `required`  - The category to get stories from.

**@param {Int}**  _numToGet_ `optional` - The number of items you'd like to receive starting from 0 -> Int. This is an optional param if no number is passed then return all results for the category chosen. This should be relatively quick even when requesting 500 stories.

Example
```
hnews.getIdsInCategory('newstories', 100).then(function(firstOneHundredStories) {
    console.log(firstOneHundredStories); // [0, 1, 2, ..., 99];
});
```
#### .getItemById(id)
This is a powerful method which can be used to look up anything found on HackerNews. From the HN Firebase documentation:
> Stories, comments, jobs, Ask HNs and even polls are just items. They're identified by their ids, which are unique integers

***@param {Int}*** _id_ - The id of the item to be requested

All items have some of the following properties, with required properties in bold:

Field | Description
------|------------
**id** | The item's unique id.
deleted | `true` if the item is deleted.
type | The type of item. One of "job", "story", "comment", "poll", or "pollopt".
by | The username of the item's author.
time | Creation date of the item, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time).
text | The comment, story or poll text. HTML.
dead | `true` if the item is dead.
parent | The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll.
kids | The ids of the item's comments, in ranked display order.
url | The URL of the story.
score | The story's score, or the votes for a pollopt.
title | The title of the story, poll or job.
parts | A list of related pollopts, in display order.
descendants | In the case of stories or polls, the total comment count.

##### Story

```javascript
{
  "by" : "dhouston",
  "descendants" : 71,
  "id" : 8863,
  "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
  "score" : 111,
  "time" : 1175714200,
  "title" : "My YC app: Dropbox - Throw away your USB drive",
  "type" : "story",
  "url" : "http://www.getdropbox.com/u/2/screencast.html"
}
```

##### Comment

```javascript
{
  "by" : "norvig",
  "id" : 2921983,
  "kids" : [ 2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141 ],
  "parent" : 2921506,
  "text" : "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
  "time" : 1314211127,
  "type" : "comment"
}
```


Example
```
hnews.getItemById(8863).then(function(item) {
    console.log(item);
    // Item
        {
          "by" : "dhouston",
          "descendants" : 71,
          "id" : 8863,
          "kids" : [ 8952, 9224, 8917]
          "score" : 111,
          "time" : 1175714200,
          "title" : "My YC app: Dropbox - Throw away your USB drive",
          "type" : "story",
          "url" : "http://www.getdropbox.com/u/2/screencast.html"
      }
});
```

#### getMaxItem()
The current largest item's id

Example
```
hnews.getMaxItem().then(function(maxId) {
    console.log(maxId); // 113379847
});

```
#### getUpdates()
The item and profile changes
***@return*** Returns two arrays. One for item changes and another for profile changes.

Example
```
hnews.getUpdates().then(function(updates) {
    console.log(updates);

    // 'items    : [1, 2, 3, ..., 5];
    // 'profiles : ['pg', 'colealanr'];
});
```

## Powering

[Hackdot API](http://api.hack.co/) - A _free_ RESTful API powering data for the iOS client, Hackdot.

## Contributing

Please read submit a pull request or open an issue if you'd like to contribute and fix any bugs.

## Author
Please feel free to contact me—
**Cole Alan Roberts**  [coleroberts.design](http://coleroberts.design/) or [@colealan](https://twitter.com/colealan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
