const Axios = require('axios');

const accessToken = 'EAARb9ZAy4uSYBO8Rmp82IfSmfvZBZBGAwKrCG4lAES9xRgN3sWvam2uA21GUb9bwg23sNFocUp7vGoBAuSgQn3GlMN2ZAk8aCLdoKNZAshKNkTQesZCpnCZBtgiebh9wJ0HKQctX60aLTw7Iv4nglZB5ZAZBt0GJpKUY8tg5h5384cSZAMa6btDLJGu9zZBtBVrOc29JrrFDWovputWF3MM8G6vgYC5zVx0ZD';
const pageId = '';
const apiUrl = `https://graph.facebook.com/v13.0/${pageId}?fields=fan_count&access_token=${accessToken}`;

exports.fbLikes = async () => {
    try {
  const res = await Axios.get(apiUrl);
  return res.data.fan_count
    } catch (error) {
        throw error;
    }

};
