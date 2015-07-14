// chrome.webRequest.onBeforeRequest.addListener(
//   function(info) {
//     console.log("Catch u: " + info.url);
//     var m = info.method;
//     if (m == 'POST')
//     {
//     	console.log('p!');
//     }
//     console.log("-------------------------------------------------");
//     return ;
//   },
//   {
//     urls: [
//       "https://ssl.ptlogin2.qq.com/login*",
//       "https://xui.ptlogin2.qq.com/*"
//     ],
//     types: [
//     "main_frame",
//     "sub_frame"
//     ]
//   },
//   ['requestBody']
// );
