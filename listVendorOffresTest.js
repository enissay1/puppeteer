const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('https://www.cdiscount.com/informatique/r-apple+imac.html#_his_', { waitUntil: 'load' });

        // Exemple : Naviguer de la page 2 à la page 5
        for (let pageNumber = 2; pageNumber <= 5; pageNumber++) {
            // Cliquer sur le bouton "Suivant"
            //btn btn--action btn--md jsNxtPage


            const nextButton = await page.$('.btn.btn--action.btn--md.jsNxtPage', { visible: true });
            console.log('next :', nextButton);
            if (nextButton) {
                // Intercepter la requête Ajax que vous attendez
                const expectedUrl = `https://www.cdiscount.com/ProductListUC.mvc/UpdateJsonPage?page=${pageNumber}`;
                await page.setRequestInterception(true);

                page.on('request', interceptedRequest => {
                    if (interceptedRequest.url() === expectedUrl) {
                        interceptedRequest.continue();
                    } else {
                        interceptedRequest.abort();
                    }
                });

                // Cliquer sur le bouton "Suivant"
                await nextButton.click();

                // Attendre la réponse de la requête Ajax
                const ajaxResponse = await page.waitForResponse(expectedUrl);

                // Traiter la réponse comme nécessaire
                console.log(`Page ${pageNumber} chargée. Réponse de la requête Ajax :`, await ajaxResponse.text());
            } else {
                console.log('Pas de bouton suivant trouvé. Fin de la collecte.');
                break;
            }
        }
        //Prendre une capture d'écran de la page actuelle
        await page.screenshot({ path: `/home/app/example.png`, fullPage: true });
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
        console.log('done');
    }
})();
