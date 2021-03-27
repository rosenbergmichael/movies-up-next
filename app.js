// Movie Class: Represents a Movie

class Movie {
  constructor(movie, date, location) {
    this.movie = movie;
    this.date = date;
    this.location = location;
  }
}

// UI Class: Handle UI Tasks

class UI {
  static displayMovies() {
    const storedMovies = [
      {
        movie: 'Sopranos Sequel',
        date: 'July 15 2021',
        location: 'HBO Max'
      },
      {
        movie: 'Mortal Kombat',
        date: 'August 10 2021',
        location: 'In Theatres'
      }
    ];

    const movies = storedMovies;
  }
}

// Store Class: Handles Storage

// Event: Display Movies

// Event: Add a Movie

// Event: Remove a Movie