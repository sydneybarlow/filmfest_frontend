class Event {
  constructor(id, date, time, location) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.location = location;
  }

  renderEvent(event) {
    console.log(`this.time @`, this.time);
    console.log("event ---", event);
    debugger;
    let movieCard = document.querySelector(`#movie-${event.movies[0].id}`);
    movieCard.innerHTML = "";

    let timeCard = document.createElement("div");
    timeCard.className = "ui card";
    let cardContent = document.createElement("div");
    cardContent.className = "content";
    let cardHeader = document.createElement("div");
    cardHeader.className = "header";
    cardHeader.innerText = "Time";

    movieCard.appendChild(timeCard);
    timeCard.appendChild(cardContent);
    cardContent.appendChild(cardHeader);
  }
}
