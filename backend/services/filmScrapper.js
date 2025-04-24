const puppeteer = require('puppeteer');
const Movie = require('../models/Movie');

const baseUrl = 'https://letterboxd.com/julicake/films/by/entry-rating/page/1';

async function scrapeFilms() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(baseUrl);

        // Wait for images to load
        await page.waitForSelector('img[src*="resized/film-poster"]');

        const films = await page.evaluate(() => {
            const items = [];
            document.querySelectorAll('.poster-container').forEach(element => {
                const title = element.querySelector('img').alt;
                const titleYear = element.querySelector('a[data-original-title]')?.getAttribute('data-original-title');
                const ratingClass = element.querySelector('.poster-viewingdata .rating')?.className;
                const slug = element.querySelector('div[data-film-slug]')?.getAttribute('data-film-slug');
                const rating = ratingClass ? ratingClass.split(' ')[3]?.replace('rated-', '') : null;
                const smallImage = element.querySelector('img').src;

                if (rating !== null && smallImage && !smallImage.includes('empty-poster')) {
                    items.push({ 
                        title, 
                        titleYear,
                        rating, 
                        slug, 
                        smallImage
                    });
                }
            });
            return items;
        });

        // Fetch high-resolution images for each film
        for (let film of films) {
            const filmPage = await browser.newPage();
            await filmPage.goto(`https://letterboxd.com/film/${film.slug}/`);
            
            const highResImage = await filmPage.evaluate(() => {
                const poster = document.querySelector('.poster-list img');
                return poster ? poster.src : null;
            });

            const description = await filmPage.evaluate(() => {
                const description = document.querySelector('.truncate p').textContent;
                return description;
            });
            console.log(highResImage);

            film.image = highResImage || film.smallImage;
            film.description = description;
            await filmPage.close();
        }

        await browser.close();
        return films;
    } catch (error) {
        console.error(`Error scraping page`, error);
    }
}

// scrapeFilms().then(films => {
//     if (films.length === 49) {
//         Movie.insertMany(films)
//     }
// });

module.exports = {
    scrapeFilms
}
