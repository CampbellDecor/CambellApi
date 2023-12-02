const fs = require('fs');
const cheerio = require('cheerio');

const BaseHtmlPath = "../../asserts/MailTemp/";
const baseTemplete = fs.readFileSync(`${BaseHtmlPath}Templete.html`, 'utf8');

const $ = cheerio.load(baseTemplete);

const builContent = (page) => {
    const BlockContent = fs.readFileSync(`${BaseHtmlPath}${page}.html`, 'utf8');
    $('#content').append(BlockContent);
    fs.writeFileSync(`${BaseHtmlPath}/Mail/${page}.handlebars`, $.html(), 'utf8');
}

