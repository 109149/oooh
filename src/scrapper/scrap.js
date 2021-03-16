const puppeteer = require("puppeteer");

/**
 * @author 109149
 * @time Thu 11 Mar 2021 22:19:53 +04
 *
 * Scraps trivia text.
 *
 * @param {string} id is the id of the imdb movie.
 * @returns {Object(string[], string[])} object of trivia and spoilers.
 */
const scrapTrivia = async (id) => {
  const browser = await puppeteer.launch({
    product: "chrome",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const url = `https://www.imdb.com/title/${id}/trivia`;
  await page.goto(url);

  const [trivia, spoilers] = await page.$$eval(".list", (divs) => {
    return divs.map((div) => {
      return Array.from(div.querySelectorAll(".sodatext")).map((div) =>
        div.textContent.trim()
      );
    });
  });

  await browser.close();

  return { trivia, spoilers };
};

/**
 * @author 109149
 * @time Thu 11 Mar 2021 21:47:58 +04
 *
 * Scraps image urls.
 *
 * Scrapped image urls have crop indicator (_V1_). scrapImageUrls removes this
 * indicator and instead gets url for full sized image.
 *
 * #media_index_thumbnail_grid
 * |
 *  -- a
 *     |
 *      -- img
 *
 * @param {string} id is id of the imdb movie.
 * @returns {Array<string>} array of image urls.
 */
const scrapImageUrls = async (id) => {
  const browser = await puppeteer.launch({
    product: "chrome",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const url = `https://www.imdb.com/title/${id}/mediaindex`;
  await page.goto(url);

  // gets how many images are there
  const numberOfImages = await page.$eval("#left", (div) => {
    return div.textContent.split(" ")[2]; // "1-48 of 333 photos", we need 333
  });
  // calculates how many pages are there
  let numberOfPages = (numberOfImages / 48) | 1; // there are 48 images per page
  numberOfPages = numberOfPages > 3 ? 3 : numberOfPages; // limit number of pages...for now...

  // url template for different pages
  const pagedURL = (url, page) => `${url}?page=${page}`;

  // array of urls for different pages
  const restURLs = [];
  for (let page = 2; page <= numberOfPages; page++) {
    restURLs.push(pagedURL(url, page));
  }

  async function getImageUrls() {
    const tmp = await page.$$eval(
      "#media_index_thumbnail_grid > a > img",
      (imgs) => {
        return imgs
          .map((img) => img.getAttribute("src"))
          .map(
            (url) => url.split("_V1_")[0]
          ) /* remove crop indicator for url */
          .map((url) => [url, "_V1_UY800_CR0,0,1200,800_AL_"].join(""))
          .map((url) => [url, ".jpg"].join(""));
      }
    );
    return tmp;
  }

  // final result
  let imgUrls = [];

  // page 1
  imgUrls.push(...(await getImageUrls()));

  // rest of the pages
  await Promise.all(
    restURLs.map(async (_url) => {
      await page.goto(_url);
      const tmp = await getImageUrls();
      imgUrls.push(...tmp);
      return tmp;
    })
  );

  await browser.close();

  return imgUrls;
};

module.exports = {
  scrapTrivia,
  scrapImageUrls,
};
