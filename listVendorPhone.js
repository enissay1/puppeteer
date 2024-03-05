const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');


(async () => {
    const browser = await puppeteer.launch();

    try {
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
            // Utilisez page.evaluate pour extraire le contenu de chaque élément .slrName sur la page actuelle
            const contentArray = await page.evaluate(() => {
                const elements = document.querySelectorAll('.slrName');
                return Array.from(elements, element => element.innerText);
            });

            // Ajoutez le contenu de la page actuelle au tableau global
            allContentArray = allContentArray.concat(contentArray);

            // Cliquez sur le bouton "Suivant" pour passer à la page suivante
            await page.click('.mpNext');

            // Attendez que la nouvelle page soit complètement chargée avant de continuer
            await page.waitForSelector('.slrName');
        }

        // Créer un tableau d'objets pour le fichier CSV
        const csvData = allContentArray.map(titleContent => ({ 'SMARTPHONE': titleContent }));
        console.log(csvData);
        //
        // Vérifiez si le fichier existe
        const filePath = path.resolve('/home/app/listOfVendors.csv');
        // const fileExists = fs.existsSync(filePath);
        console.log(filePath);
        let fileExists = false;
        try {
            await fs.promises.access(filePath);
            console.log('Le fichier existe.');
            fileExists = true;
        } catch (error) {
            console.log('Le fichier n\'existe pas.');
            fileExists = false;
        }
        // Créez le fichier avec l'en-tête s'il n'existe pas
        if (!fileExists) {
            fs.writeFileSync(filePath, 'SMARTPHONE\n');
        }
        console.log(filePath);
        // Si le fichier existe, append les données
        fs.appendFileSync('/home/app/listOfVendors.csv', csvData.map(item => item.SMARTPHONE).join('\n') + '\n');

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Fermez le navigateur
        await browser.close();
        console.log('done');
    }
})();
