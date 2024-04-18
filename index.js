function fetchBooks(callback) {
  // To pass the tests, don't forget to return your fetch!
  fetch('https://anapioficeandfire.com/api/books')
    .then(res => {
      return res.json()
    })
    .then(data => callback(data))
}

function renderBooks(books) {
  const main = document.querySelector('main');
  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.innerHTML = book.name;
    main.appendChild(h2);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetchBooks(renderBooks);
});
///////// I can see a list of Game Of Thrones titles on the webpage.