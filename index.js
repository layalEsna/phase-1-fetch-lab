

//document.addEventListener('DOMContentLoaded', function () {
//To pass the tests, don't forget to return your fetch!

function fetchBooks(callback) {

  return fetch('https://anapioficeandfire.com/api/books')
    .then(res => res.json())
    .then(data =>


      callback(data))
    .catch(error => console.error('Error fetching books:', error)); // Optional: Handle errors
}


function renderBooks(books) {
  const main = document.querySelector('main')
  books.forEach(book => {
    const h2 = document.createElement('h2')
    h2.innerHTML = book.name
    main.appendChild(h2)
  })
}

document.addEventListener('DOMContentLoaded', function () {
  fetchBooks(renderBooks)
})

