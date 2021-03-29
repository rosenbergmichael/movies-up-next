// Movie Class: Represents a Movie

class Movie {
  constructor(moviet, date, location) {
    this.moviet = moviet;
    this.date = date;
    this.location = location;
  }
}

// UI Class: Handle UI Tasks

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
    //vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);

  }

  static clearFields() {
    document.querySelector('#moviet').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#location').value = '';
  };

}

// Store Class: Handles Storage

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

// Event: Display Movies

document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: Add a Movie

document.querySelector('#movie-form').addEventListener('submit', (e) => {
  //prevent actual submit

  e.preventDefault();

  // get form values
  const moviet = document.querySelector('#moviet').value;
  const date = document.querySelector('#date').value;
  const location = document.querySelector('#location').value;

  //Validate
  if(moviet === '' || date === '' || location === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // instantiate movie
    const movie = new Movie(moviet, date, location);

    //add movie to UI
    UI.addMovieToList(movie);

    //show success message
    UI.showAlert('Movie Added', 'success');

    //clear fields
    UI.clearFields();
  }

});

// Event: Remove a Movie
document.querySelector('#movie-list').addEventListener('click', (e) => {
  UI.deleteMovie(e.target)

  //show success message
  UI.showAlert('Movie Removed', 'success');
});