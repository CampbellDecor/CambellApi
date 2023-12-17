const Facebook = require('facebook-node-sdk');

const F = new Facebook({
    appId: "1227010361309478",
    secret: '2f62645902ab2918bd3dcfe07d6de2df',
    accessToken:"EAARb9ZAy4uSYBO9RVThlJg0fjX5OVw59vEC7uV6WntNjAZAV4Qiz6xGIlsnGSC299kNRdmqYuL2l9CGWMkjnQPPZBewsTTg06KXZASmIa4Llc8sJwfbBLO8vNMEiwHYF0BBDCLDyCjQMVRTf92qjQfxFbEZBkzmvk8IQG9J1IRKWKb1HZBmLQtVhuwXvuSR4diUq5Y27xzdDYnyRb0ZBQZDZD"
});

facebook.api(`/${"127588653657712"}`, 'get', {
    fields: 'fan_count'
}, function (res) {
    if (res && res.error) {
        console.error(res.error);
    } else {
        console.log(`Number of likes for the page: ${res.fan_count}`);
    }
});
