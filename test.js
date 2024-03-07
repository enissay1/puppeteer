const puppeteer = require('puppeteer');
process.setMaxListeners(40); // ou une valeur plus grande si nécessaire

const scrapeCdiscountVendors = require('/home/app/serviceListVendors'); //call service

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
        ],
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    try {
        await page.goto('https://www.cdiscount.com/informatique/r-apple+imac.html#_his_', {
            waitUntil: 'domcontentloaded'
        });

        let pageNum = 1;

        while (true) {
            await page.waitForSelector('#lpBloc', { visible: true });

            await new Promise(resolve => setTimeout(resolve, 1000));

            const allTitles = await extractData(page);

            // console.log(allTitles);
            allTitles.forEach(element => {

                // const targetURL = element;
                // const csvTitle = 'Imac';
                // const csvFilePath = '/home/app/listOfVendorsImac.csv';
                // if (targetURL) {
                //     scrapeCdiscountVendors(targetURL, csvTitle, csvFilePath);
                // }
                console.log('element :', element);

            });
            pageNum++;

            const clicked = await page.evaluate((pageNum) => {

                const links = document.querySelectorAll('#PaginationForm_ul li a');
                for (const link of links) {
                    if (link.textContent.trim() === pageNum.toString()) {
                        link.click();
                        return link.textContent;

                    }
                }

                console.log(links);
                exist();
                return false;
            }, pageNum);
            if (!clicked) {
                console.log('Pas de bouton suivant. Arrêt.');
                break;
            }

            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    } finally {
        await browser.close();
    }
})();

async function extractData(page) {

    return await page.evaluate(() => {
        const elements = document.querySelectorAll('.lpSeeMoreOffers');
        return Array.from(elements, element => element.getAttribute('href'));
    });
}
