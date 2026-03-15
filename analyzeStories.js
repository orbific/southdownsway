"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var filePath = path.join(process.cwd(), 'src/sdw.json');
fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    var jsonData = JSON.parse(data);
    var collectionCounts = {};
    var totalWords = 0;
    jsonData.stories.forEach(function (story) {
        var collection = story.collection || 'Uncategorized';
        collectionCounts[collection] = (collectionCounts[collection] || 0) + 1;
        if (story.words) {
            totalWords += parseInt(story.words, 10);
        }
    });
    console.log('Collection counts:');
    for (var _i = 0, _a = Object.entries(collectionCounts); _i < _a.length; _i++) {
        var _b = _a[_i], collection = _b[0], count = _b[1];
        console.log("".concat(collection, ": ").concat(count));
    }
    console.log("Total words: ".concat(totalWords));
});
