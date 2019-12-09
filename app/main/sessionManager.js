import {session} from "electron";

//过滤bing的图片搜索,bing,有道词典首页
function filters(url) {
  let regex = /https?:\/\/cn\.bing\.com\/images\/.*/;
  return !!('https://cn.bing.com/dict/search?q=' === url || regex.exec(url) || 'https://m.youdao.com/dict?le=eng&q=' === url);
}


export function setSession() {
  const filter = {urls: ["http://*/*", "https://*/*"]};
  const ses = session.defaultSession;
  ses.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    if (filters(details.url)) {
      callback({cancel: true});
      return;
    }
    details.requestHeaders['User-Agent'] = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
    details.requestHeaders['accept-language'] = "zh-CN,zh;q=0.9";
    details.requestHeaders['accept-encoding'] = "gzip,deflate,br";
    callback({cancel: false, requestHeaders: details.requestHeaders});
  });
  ses.setProxy({proxyBypassRules: 'http://*/*'}, () => {
  });
}

