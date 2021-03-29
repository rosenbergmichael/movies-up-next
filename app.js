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

    const storedMovies = [
      {
        moviet: 'Sopranos Sequel',
        date: 'July 15 2021',
        location: 'HBO Max'
      },
      {
        moviet: 'Mortal Kombat',
        date: 'August 10 2021',
        location: 'In Theatres'
      }
    ];

    const movies = storedMovies;
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

  }

  static clearFields() {
    document.querySelector('#moviet').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#location').value = '';
  };

}

// Store Class: Handles Storage

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

    //clear fields
    UI.clearFields();
  }

});

// Event: Remove a Movie
document.querySelector('#movie-list').addEventListener('click', (e) => {
  UI.deleteMovie(e.target)
});