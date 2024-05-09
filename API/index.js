let getYoutube = require("./youtube");
exports.getYoutubeDataByPlaylist = getYoutube.getYoutubeDataByPlaylist;
exports.getChannelData = getYoutube.getChannelData;
exports.getTopViewedData = getYoutube.getTopViewedData;

let email = require("./email");
exports.sendEmail = email.sendEmail;