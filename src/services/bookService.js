
function goodReadsService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      resolve({ description: 'Our description' });
    });
  }
  return { getBookById };
}

module.exports = goodReadsService();
