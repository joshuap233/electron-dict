//无法取消订阅,可能造成内存泄漏,使用fetch方法可取消
function fetchData(url) {
  const {net} = require('electron');
  return new Promise(((resolve, reject) => {
    let result = {
      data: '',
      statusCode: 0,
    };
    const data = [];
    net.request(url)
      .on('response', (response) => {
        result.statusCode = response.statusCode;
        response.on('error', (error) => {
          reject(error);
        })
          .on('end', () => {
            result.data = Buffer.concat(data).toString();
            resolve(result);
          })
          .on('data', (chunk) => {
            data.push(chunk);
          });
      })
      .end();
  }));
}

export default function requests(url, sign) {
  return new Promise((resolve, reject) => {
    let result = {
      statusCode: 0,
      data: '',
    };
    fetch(url, sign).then(res => {
      result.statusCode = res.status;
      res.text().then(data => {
        result.data = data;
        resolve(result);
      });
    }).catch(err => {
      reject(err);
    });
  });
}
