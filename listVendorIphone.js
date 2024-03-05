const puppeteer = require('puppeteer');
const fs = require('fs');
const scrapeCdiscountVendors = require('/home/app/serviceListVendors'); //call service
const targetURL = 'https://www.cdiscount.com/mp-3616-rcdbycds057cn.html';
const csvTitle = 'Iphone';
const csvFilePath = '/home/app/listOfVendorsIphone.csv';

scrapeCdiscountVendors(targetURL, csvTitle, csvFilePath);
