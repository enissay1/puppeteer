const puppeteer = require('puppeteer');
const fs = require('fs');
const scrapeCdiscountVendors = require('/home/app/serviceListVendors'); //call service
const targetURL = 'https://www.cdiscount.com/mp-228394-hp15fc0071nf.html';
const csvTitle = 'PcGamer';
const csvFilePath = '/home/app/listOfVendorsPcGamer.csv';

scrapeCdiscountVendors(targetURL, csvTitle, csvFilePath);
