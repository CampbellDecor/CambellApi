const fs = require('fs');
const BaseHtmlPath = "../../asserts/MailTemp/Mail/";

exports.getcontent = (filename) => {
    try {
        return htmlContent = fs.readFileSync(`${BaseHtmlPath}${filename}.html`, 'utf8');
    } catch (error) {
        throw error;
    }

};
