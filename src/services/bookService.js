const axios = require('axios');
const xml2js = require('xml2js');

const parser = xml2js.Parser({ explicitArray: false });

function goodReadsService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      axios.get('https://www.goodreads.com/book/show/656.xml?key=AVJNvCywwX9z4rmh1Y9bQ')
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) console.log(err);
            else {
              console.log(result);
              resolve(result.GoodreadsResponse.book);
            //   resolve({ description: 'Our Description' })
            }
          });
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  }
  return { getBookById };
}

module.exports = goodReadsService();
