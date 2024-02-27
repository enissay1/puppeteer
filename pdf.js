const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set User-Agent header
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    await page.goto('https://www.cdiscount.com/mp-3616-samgalaxya10nn.html');

    // Wait for the selector to appear on the page
    await page.waitForSelector('.slrName');

    // Use page.$$eval to extract the content of each element matching the selector
    const contentArray = await page.$$eval('.slrName', elements => {
        // Map over the selected elements and return their inner text
        return elements.map(element => element.innerText);
    });

    // Log the extracted content
    console.log(contentArray);

    // Take a screenshot for verification
    await page.screenshot({ path: '/home/app/example.png', fullPage: true });

    // Close the browser
    await browser.close();
    console.log('done');
})();
