class Ticket {
  constructor(
    id,
    user_id,
    movie_id,
    event_id,
    movie_title,
    movie_category,
    event_type,
    event_date,
    event_time,
    event_location,
    event_image
  ) {
    this.id = id;
    this.user_id = user_id;
    this.move_id = movie_id;
    this.event_id = event_id;
    this.movie_title = movie_title;
    this.movie_category = movie_category;
    this.event_type = event_type;
    this.event_date = event_date;
    this.event_time = event_time;
    this.event_location = event_location;
    this.event_image = event_image;
  }

  renderTicket() {
    let ticketsDiv = document.querySelector(`.tickets`);

    let cardsDiv = document.querySelector("#allTickets");
    cardsDiv.className = `ui link cards`;

    let indCardDiv = document.createElement("div");
    indCardDiv.className = `card`;
    indCardDiv.id = `ticket-${this.id}`;

    let contentDiv = document.createElement("div");
    contentDiv.className = `content`;

    let headerDiv = document.createElement("div");
    headerDiv.className = `header`;
    headerDiv.innerText = `${this.movie_title}`;

    let metaDiv = document.createElement("div");
    metaDiv.className = `meta`;

    let infoSpan = document.createElement("span");
    infoSpan.className = `date`;
    infoSpan.innerHTML = `${this.movie_category}<br> Date: ${
      this.event_date.split("-")[1]
    }/${this.event_date.split("-")[2]} <br> Time: ${
      this.event_time
    } <br> Location: ${this.event_location}`;

    let updateButton = document.createElement("button");
    updateButton.id = `update-${this.id}`;
    updateButton.className = `ui basic button`;
    updateButton.innerText = `Change Date`;
    updateButton.addEventListener("click", this.updateEvent.bind(this));

    let deleteButton = document.createElement("button");
    deleteButton.id = `delete-${this.id}`;
    deleteButton.className = `ui basic button`;
    deleteButton.innerText = `Remove`;
    deleteButton.addEventListener("click", this.deleteFetch.bind(this));

    ticketsDiv.appendChild(cardsDiv);
    cardsDiv.appendChild(indCardDiv);
    indCardDiv.appendChild(contentDiv);
    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(metaDiv);
    metaDiv.appendChild(infoSpan);
    contentDiv.appendChild(updateButton);
    contentDiv.appendChild(deleteButton);
  }

  updateEvent() {
    let cardInfo = event.currentTarget.parentNode;
    cardInfo.innerHTML = "";

    let headerDiv = document.createElement("div");
    headerDiv.className = `header`;
    headerDiv.innerText = `${this.movie_title}`;

    let form = document.createElement("form");
    form.className = "ui form";

    let dateLabel = document.createElement("label");
    dateLabel.innerHTML = "New Date:";
    let selectDate = document.createElement("select");
    selectDate.id = `form-input-1`;
    let option1 = document.createElement("option");
    option1.value = "09/18";
    option1.innerHTML = "09/18";
    let option2 = document.createElement("option");
    option2.value = "09/19";
    option2.innerHTML = "09/19";
    let option3 = document.createElement("option");
    option3.value = "09/20";
    option3.innerHTML = "09/20";
    let option4 = document.createElement("option");
    option4.value = "09/21";
    option4.innerHTML = "09/21";

    let saveBtn = document.createElement("button");
    saveBtn.className = `ui button`;
    saveBtn.innerText = `Save`;
    saveBtn.id = `saveBtn-${this.id}`;

    cardInfo.appendChild(headerDiv);
    headerDiv.appendChild(form);
    form.appendChild(dateLabel);
    form.appendChild(selectDate);
    selectDate.appendChild(option1);
    selectDate.appendChild(option2);
    selectDate.appendChild(option3);
    selectDate.appendChild(option4);
    form.appendChild(saveBtn);

    form.addEventListener("submit", this.patchFetch.bind(this));
  }

  patchFetch(event) {
    console.log("event ==>", event);
    event.preventDefault();
    let date = event.currentTarget.elements[0].selectedOptions[0].value;
    this.event_date = `2018-${date.split("/").join("-")}`;
    fetch(`http://localhost:3000/events/${this.event_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        date: this.event_date
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("patch ++>", data);
        Controller.fetchTickets();
      });
  }

  deleteFetch() {
    fetch(`http://localhost:3000/tickets/${this.id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        let cardDiv = document.querySelector(`#allTickets`);
        let specificCard = document.querySelector(`#ticket-${this.id}`);
        cardDiv.removeChild(specificCard);
      });
  }
}
