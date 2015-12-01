#!/usr/bin/env node
"use strict";
const request    = require("request-promise");
const open       = require("open");
const jsonUrl    = "https://www.reddit.com/r/LastWeekTonight/.json";

console.log("Opening the most recent Last Week Tonight video...");
//  Go get our JSON data
request(jsonUrl)
  .then( data => {
    let parsed   = JSON.parse(data).data.children
    if( parsed[0].data.domain !== 'self.lastweektonight' ){
      return open(parsed[0].data.url);
    }else {
      open(parsed[1].data.url);
    }
    process.exit(1);
  })
  .catch( err => {
    console.warn(err);
    process.exit(0);
  });
