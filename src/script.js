document.addEventListener("DOMContentLoaded", function(event) {
  controller = new Controller();
  Controller.fetchTickets();
  controller.fetchMovies();
  controller.movieFormEvent();
});
let controller;
