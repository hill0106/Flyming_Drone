const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// 創建OAuth2客戶端
const oauth2Client = new OAuth2(
  '587435114250-5n4a6tg2r1uc2nkfk19i1ahvr3fsj70v.apps.googleusercontent.com',
  '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',
  'https://flymingdrone.azurewebsites.net/'
);

// 設置用戶授權URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/youtube.readonly'
});

// 將用戶導向授權頁面
console.log('Authorize this app by visiting this url:', authUrl);

// // 輸入從授權頁面返回的授權碼
// const authCode = 'YOUR_AUTHORIZATION_CODE';

// // 交換授權碼為訪問令牌
// oauth2Client.getToken(authCode, (err, tokens) => {
//   if (err) {
//     return console.error('Error retrieving access token', err);
//   }
//   // 設置OAuth2客戶端的訪問令牌
//   oauth2Client.setCredentials(tokens);

//   // 使用訪問令牌發送YouTube Analytics API請求
//   const youtubeAnalytics = google.youtubeAnalytics({
//     version: 'v2',
//     auth: oauth2Client
//   });

//   // 發送API請求
//   youtubeAnalytics.reports.query({
//     metrics: 'views',
//     dimensions: 'video',
//     ids: 'channel==YOUR_CHANNEL_ID',
//     sort: '-views',
//     maxResults: 10
//   }, (err, response) => {
//     if (err) {
//       console.error('The API returned an error:', err);
//       return;
//     }
//     console.log('Top 10 videos:', response.data);
//   });
// });
