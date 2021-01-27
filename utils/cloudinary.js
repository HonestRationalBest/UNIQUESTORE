require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'ds8hydjea',
    api_key: '264245126166349',
    api_secret: 'cIcjXDPCkLssmtz4C_eZvOKWl3g'
});

module.exports = { cloudinary };
