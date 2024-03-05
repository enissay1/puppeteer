const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (request.resourceType() === 'xhr') {
                console.log('AJAX request:', request.url());
            }
            request.continue();
        });
        // Set User-Agent header
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto('https://www.cdiscount.com/informatique/r-apple+imac.html#_his_');
        // Wait for the selector to appear on the page and selected all elements
        await page.waitForSelector('#lpBloc');
        const hrefValues = await page.evaluate(() => {
            const elements = document.querySelectorAll('.lpSeeMoreOffers');
            return Array.from(elements, element => element.getAttribute('href'));
        });
        console.log(hrefValues);
        await page.$('.btn.btn--action.btn--md.jsNxtPage', { visible: true });
        await page.screenshot({ path: `/home/app/example.png`, fullPage: true });

        //     // console.log(nextButton);
        //const liElements = await page.$$('#PaginationForm_ul li');
        // Obtenir la taille du tableau (le nombre d'éléments <li>)
        // const liElementsCount = liElements.length;
        //  Définissez un tableau pour stocker les résultats de tous les pages
        //let allElementArray = [];
        //console.log(liElements);
        //lastElement = liElements[liElementsCount - 1]
        // Obtenez le contenu du dernier élément
        // const textContent = await lastElement.evaluate(el => el.textContent);
        // console.log(`Contenu du dernier élément à l index $ ${textContent}`);
        // console.log(liElementsCount);
        // allElementArray = [];
        //  Itérez sur chaque page
        // for (let i = 0; i < textContent; i++) {
        // for (let i = 0; i < 5; i++) {

        //     console.log(i);

        //     const hrefValues = await page.evaluate(() => {
        //         const elements = document.querySelectorAll('.lpSeeMoreOffers');
        //         return Array.from(elements, element => element.getAttribute('href'));
        //     });
        //     console.log(hrefValues, 'hrefValues : ', i);
        //     // Prendre une capture d'écran de la page actuelle
        //     await page.screenshot({ path: `/home/app/example${i}.png`, fullPage: true });

        //     // Si l'élément est trouvé, récupère et imprime le contenu de son attribut 'href'
        //     // Si des liens sont trouvés, les ajouter au tableau global
        //     if (hrefValues.length > 0) {
        //         allElementArray = allElementArray.concat(hrefValues);
        //     }

        //     // Cliquer sur le bouton "Suivant" pour passer à la page suivante
        //     const nextButton = await page.$('.btn.btn--action.btn--md.jsNxtPage', { visible: true });
        //     // console.log(nextButton);
        //     if (nextButton) {
        //         await nextButton.click();
        //         //await page.goto('https://www.cdiscount.com/informatique/r-apple+imac.html#_his_', { waitUntil: 'load' });
        //         await new Promise(resolve => setTimeout(resolve, 5000));

        //         await page.waitForSelector('#lpBloc', { waitUntil: 'load' });

        //         //hrefValues = [];
        //         // await new Promise(resolve => setTimeout(resolve, 3000));
        //         // await page.goto('url'+tableCell04Val, {waitUntil: 'load'});

        //         // let hrefValueNew = await page.evaluate(() => {
        //         //     const elements = document.querySelectorAll('.lpSeeMoreOffers');
        //         //     return Array.from(elements, element => element.getAttribute('href'));
        //         // });
        //         // console.log(JSON.stringify(hrefValues).trim(), JSON.stringify(hrefValueNew).trim());
        //         // while (JSON.stringify(hrefValues).trim() === JSON.stringify(hrefValueNew).trim()) {
        //         //     //await nextButton.click();

        //         //     await new Promise(resolve => setTimeout(resolve, 3000));

        //         //     hrefValueNew = await page.evaluate(() => {
        //         //         const elements = document.querySelectorAll('.lpSeeMoreOffers');
        //         //         return Array.from(elements, element => element.getAttribute('href'));
        //         //     });
        //         //     console.log('jatt', hrefValueNew);

        //         // }
        //         ////////////////////////////////
        //         // Wait for the new links to load
        //         // await page.waitForFunction((oldHrefValues) => {
        //         //     const elements = document.querySelectorAll('.lpSeeMoreOffers');
        //         //     const newHrefValues = Array.from(elements, element => element.getAttribute('href'));
        //         //     return JSON.stringify(newHrefValues) !== JSON.stringify(oldHrefValues);
        //         // }, { polling: 'mutation', timeout: 60000 }, hrefValues);

        //         // console.log('New page loaded')
        //         ///////////////////:
        //         //console.log('je click');
        //         // Ajouter une pause de 5 secondes
        //         // Attendre que la nouvelle page soit complètement chargée avant de continuer



        //         //await page.waitForSelector('.prdtBlocInline', { visible: true });

        //     }
        // }
        // const csvData = allElementArray.map(Content => ({ Content }));
        // console.log(csvData);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Fermez le navigateur
        await browser.close();
        console.log('done');
    }
})();


// Utilisez page.$$ pour obtenir un tableau de tous les éléments <li> enfants de <ul>
//         const liElements = await page.$$('#OfferListPaginationForm ul li');

//         // Obtenez la taille du tableau (le nombre d'éléments <li>)
//         const liElementsCount = liElements.length;

//         // Définissez un tableau pour stocker les résultats de tous les pages
//         let allContentArray = [];

//         // Itérez sur chaque page
//         for (let i = 0; i < liElementsCount; i++) {
//             // Utilisez page.evaluate pour extraire le contenu de chaque élément .slrName sur la page actuelle
//             const contentArray = await page.evaluate(() => {
//                 const elements = document.querySelectorAll('.slrName');
//                 return Array.from(elements, element => element.innerText);
//             });

//             // Ajoutez le contenu de la page actuelle au tableau global
//             allContentArray = allContentArray.concat(contentArray);

//             // Cliquez sur le bouton "Suivant" pour passer à la page suivante
//             await page.click('.mpNext');

//             // Attendez que la nouvelle page soit complètement chargée avant de continuer
//             await page.waitForSelector('.lpSeeMoreOffers');
//         }

//         // Créer un tableau d'objets pour le fichier CSV
//         const csvData = allContentArray.map(titleContent => ({ 'SMARTPHONE': titleContent }));
//         console.log(csvData);
//         //
//         // Vérifiez si le fichier existe
//         const filePath = path.resolve('/home/app/listOfVendors.csv');
//         // const fileExists = fs.existsSync(filePath);
//         console.log(filePath);
//         let fileExists = false;

//         // Créez le fichier avec l'en-tête s'il n'existe pas
//         if (!fileExists) {
//             fs.writeFileSync(filePath, 'SMARTPHONE\n');
//         }
//         console.log(filePath);
//         // Si le fichier existe, append les données
//         fs.appendFileSync('/home/app/listOfVendors.csv', csvData.map(item => item.SMARTPHONE).join('\n') + '\n');

//     } catch (error) {
//         console.error('An error occurred:', error);
//     } finally {
//         // Fermez le navigateur
//         await browser.close();
//         console.log('done');
//     }
// })();
