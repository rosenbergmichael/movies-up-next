class Movie {
  constructor(moviet, date, location) {
    this.moviet = moviet;
    this.date = date;
    this.location = location;
  }
}


class UI {

  static displayMovies() {
    const movies = Store.getMovies();
    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.querySelector('#movie-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${movie.moviet}</td>
      <td>${movie.date}</td>
      <td>${movie.location}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static deleteMovie(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#movie-form');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#moviet').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#location').value = '';
  };

}


class Store {

  static getMovies() {
    let movies;
    if(localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }
    return movies;
  }

  static addMovie(movie) {
    const movies = Store.getMovies();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static removeMovie(moviet) {
    const movies = Store.getMovies();
    movies.forEach((movie, index) => {
      if(movie.moviet === moviet) {
        movies.splice(index, 1);
      }
    });
    localStorage.setItem('movies', JSON.stringify(movies));
  }

}


document.addEventListener('DOMContentLoaded', UI.displayMovies);

document.querySelector('#movie-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const moviet = document.querySelector('#moviet').value;
  const date = document.querySelector('#date').value;
  const location = document.querySelector('#location').value;
  if(moviet === '' || date === '' || location === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    const movie = new Movie(moviet, date, location);
    UI.addMovieToList(movie);
    Store.addMovie(movie);
    UI.showAlert('Movie Added', 'success');
    UI.clearFields();
  }
});

document.querySelector('#movie-list').addEventListener('click', (e) => {
  UI.deleteMovie(e.target)
  Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert('Movie Removed', 'success');
});