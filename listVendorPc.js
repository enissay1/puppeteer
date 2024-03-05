const puppeteer = require('puppeteer');
const fs = require('fs');
const scrapeCdiscountVendors = require('/home/app/serviceListVendors'); //call service
const targetURL = 'https://www.cdiscount.com/mp-252999-hp3664870368522.html';
const csvTitle = 'PC';
const csvFilePath = '/home/app/listOfVendorsPc.csv';

scrapeCdiscountVendors(targetURL, csvTitle, csvFilePath);
