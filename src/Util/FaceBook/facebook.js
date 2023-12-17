const Axios = require('axios');

const accessToken ='EAARb9ZAy4uSYBOZCVspCDlQsQfEcVG88VV2IJ6y0pZAZAh3LG7xVkoC9UXFqhUZBY82mMve8LV8oki7oPcFAZAFcjoDl4WrNGC0uZAdZBPO5XmAZAcK54uo3uJrUjl76W2og2qQZCmYDZA0L3etSsFMxkZBZAFbENy9tnvru4tToxHMwV35loDWSz4wpSAZCZBqsihMyp9bJj9cuJZACvwxYj5pLjP3fDu0ZD';
const pageId = '127588653657712';
const apiUrl = `https://graph.facebook.com/v13.0/${pageId}?fields=fan_count&access_token=${accessToken}`;

Axios.get(apiUrl).then(res =>
{
    console.log(res.data);
})
