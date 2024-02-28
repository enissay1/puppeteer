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

    // Utilisez page.$$ pour obtenir un tableau de tous les éléments <li> enfants de <ul>
    const liElements = await page.$$('#OfferListPaginationForm ul li');

    // Obtenez la taille du tableau (le nombre d'éléments <li>)
    const liElementsCount = liElements.length;

    // Définissez un tableau pour stocker les résultats de tous les pages
    let allContentArray = [];

    // Itérez sur chaque page
    for (let i = 0; i < liElementsCount; i++) {
        // Utilisez page.$$eval pour extraire le contenu de chaque élément .slrName sur la page actuelle
        const contentArray = await page.$$eval('.slrName', elements => {
            // Map over the selected elements and return their inner text
            return elements.map(element => element.innerText);
        });

        // Ajoutez le contenu de la page actuelle au tableau global
        allContentArray = allContentArray.concat(contentArray);

        // Cliquez sur le bouton "Suivant" pour passer à la page suivante
        await page.click('.mpNext');

        // Attendez que le nouveau contenu apparaisse avant de continuer
        await page.waitForSelector('.slrName');
    }

    // Log the extracted content from all pages
    console.log(allContentArray);

    // Take a screenshot for verification (optional)
    await page.screenshot({ path: '/home/app/example.png', fullPage: true });

    // Close the browser
    await browser.close();
    console.log('done');
})();
