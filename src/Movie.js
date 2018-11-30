class Movie {
  constructor(id, title, category, duration, description, image) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.duration = duration;
    this.description = description;
    this.image = image;
  }

  renderMovies() {
    let moviesDiv = document.querySelector(`.movies`);

    let cardsDiv = document.querySelector(`#allMovies`);
    cardsDiv.className = `ui cards`;

    let indCardDiv = document.createElement("div");
    indCardDiv.className = `card`;
    indCardDiv.id = `movie-${this.id}`;

    let imageDiv = document.createElement("div");
    imageDiv.className = `image`;
    let imageEl = document.createElement("img");
    imageEl.src = `${this.image}`;

    let contentDiv = document.createElement("div");
    contentDiv.className = `content`;

    let headerDiv = document.createElement("div");
    headerDiv.className = `header`;
    headerDiv.innerText = `${this.title}`;

    let metaDiv = document.createElement("div");
    metaDiv.className = `meta`;

    let infoSpan = document.createElement("span");
    infoSpan.className = `date`;
    infoSpan.innerHTML = `Duration: ${this.duration}<br>Category: ${
      this.category
    }`;

    let descDiv = document.createElement("div");
    descDiv.className = `description`;
    descDiv.innerText = `${this.description}`;

    let buttonDiv = document.createElement("div");
    buttonDiv.className = `content`;

    let buyTicket = document.createElement("button");
    buyTicket.className = `ui basic button`;
    buyTicket.id = `buyButton-${this.id}`;
    buyTicket.innerHTML = `Get Tickets`;

    moviesDiv.appendChild(cardsDiv);
    cardsDiv.appendChild(indCardDiv);
    indCardDiv.appendChild(imageDiv);
    imageDiv.appendChild(imageEl);
    indCardDiv.appendChild(contentDiv);
    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(metaDiv);
    metaDiv.appendChild(infoSpan);
    contentDiv.appendChild(descDiv);
    indCardDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(buyTicket);

    let getTickets = document.querySelector(`#buyButton-${this.id}`);
    getTickets.addEventListener("click", function(event) {
      Controller.fetchEvents(event);
    });
  }
}
