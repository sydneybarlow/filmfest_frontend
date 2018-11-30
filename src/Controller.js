class Controller {
  constructor() {}

  static fetchTickets() {
    fetch(`http://localhost:3000/tickets`)
      .then(response => response.json())
      .then(tickData => {
        let cardDiv = document.querySelector(".cards");
        cardDiv.innerHTML = "";
        tickData.forEach(ticket => {
          let ticketObj = new Ticket(
            ticket.id,
            ticket.user_id,
            ticket.movie.id,
            ticket.event.id,
            ticket.movie.title,
            ticket.movie.category,
            ticket.event.eventType,
            ticket.event.date,
            ticket.event.time,
            ticket.event.location,
            ticket.event.image
          );
          ticketObj.renderTicket();
        });
      });
  }

  fetchMovies() {
    fetch(`http://localhost:3000/movies`)
      .then(response => response.json())
      .then(movieData => {
        movieData.forEach(movie => {
          let movieObj = new Movie(
            movie.id,
            movie.title,
            movie.category,
            movie.duration,
            movie.description,
            movie.image
          );
          movieObj.renderMovies();
        });
      });
  }

  static fetchEvents(event) {
    const movieCardID = event.currentTarget.parentNode.parentElement.id.split(
      "-"
    )[1];
    console.log("movieCardID -->", movieCardID);
    fetch(`http://localhost:3000/events`)
      .then(response => response.json())
      .then(eventData => {
        eventData.forEach(event => {
          if (event.movies.length === 0) {
            let getTickButton = document.querySelector(
              `#buyButton-${movieCardID}`
            );
            getTickButton.innerText = "Sold Out";
          } else {
            event.movies.forEach(movieObj => {
              console.log("movieObj ID **", movieObj.id);
              console.log("movieCardID ==>", movieCardID);
              if (movieCardID === movieObj.id) {
                debugger;
                let eventObj = new Event(
                  event.id,
                  event.date,
                  event.time,
                  event.location
                );
                eventObj.renderEvent(event);
              }
            });
          }
        });
      });
  }

  createTicket() {
    let data = {
      id: id,
      user_id: user_id,
      movie_id: movie_id,
      event_id: event_id
    };
    fetch(`http://localhost:3000/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(tickData => {
        renderTicket(tickData);
      });
  }

  movieFormEvent() {
    let movieForm = document.querySelector(`#movieForm`);

    movieForm.addEventListener("submit", function(event) {
      event.preventDefault();
      let newTitle = document.querySelector(`#title`).value;
      let newImage = document.querySelector(`#image_url`).value;
      let category = document.querySelector(`#category`);
      let newCategory = category[category.selectedIndex].value;
      let newDuration = document.querySelector(`#duration`).value;
      let newDescrip = document.getElementsByTagName(`textarea`)[0].value;

      // t.string "title"
      // t.string "category"
      // t.time "duration"
      // t.string "description"
      // t.string "image"
      Controller.createMovie(
        newTitle,
        newCategory,
        newDuration,
        newDescrip,
        newImage
      );
      movieForm.reset();
    });
  }

  static createMovie(title, category, duration, description, image) {
    let data = {
      title: title,
      category: category,
      duration: duration,
      description: description,
      image: image
    };
    fetch(`http://localhost:3000/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(movieData => {
        let movieObj = new Movie(
          movieData.id,
          movieData.title,
          movieData.category,
          movieData.duration,
          movieData.description,
          movieData.image
        );
        movieObj.renderMovies(movieData);
      });
  }
}
