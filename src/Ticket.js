class Ticket {
  constructor(id, user_id, movie_id, event_id, movie_title, movie_category, event_type, event_date, event_time, event_location, event_image) {
    this.id = id
    this.user_id = user_id
    this.move_id = movie_id
    this.event_id = event_id
    this.movie_title = movie_title
    this.movie_category = movie_category
    this.event_type = event_type
    this.event_date = event_date
    this.event_time = event_time
    this.event_location = event_location
    this.event_image = event_image
  }

  renderTicket(){
          // <div class="ui link cards"
          // <div class="card">
          //   <div class="image">
          //     <img src="${this.image}">
          //   </div>
          //   <div class="content">
          //     <div class="header">${this.movie}</div>
          //     <div class="meta">
          //       <span class="date">Date: ${this.date}<br>Time: ${this.time}<br> Duration: ${this.duration}<br> Location: ${this.location}</span>
          //     </div>
          //     <div class="description">
          //       ${this.description}
          //     </div>
          //   </div>
          // </div>
          // </div>

    let ticketsDiv = document.querySelector(`.tickets`)

    let cardsDiv = document.querySelector('#allTickets')
    cardsDiv.className = `ui link cards`

    let indCardDiv = document.createElement('div')
    indCardDiv.className = `card`
    indCardDiv.id = `ticket-${this.id}`

    let contentDiv = document.createElement('div')
    contentDiv.className = `content`

    let headerDiv = document.createElement('div')
    headerDiv.className = `header`
    headerDiv.innerText = `${this.movie_title}`

    let metaDiv = document.createElement('div')
    metaDiv.className = `meta`

    let infoSpan = document.createElement('span')
    infoSpan.className = `date`
    infoSpan.innerHTML =
    `${this.movie_category}<br> Date: ${this.event_date.split('-')[1]}/${this.event_date.split('-')[2]} <br> Time: ${this.event_time} <br> Location: ${this.event_location}`

    let updateButton = document.createElement('button')
    updateButton.id = `update-${this.id}`
    updateButton.className = `ui basic button`
    updateButton.innerText = `Update`
    updateButton.addEventListener('click', this.updateEvent.bind(this))

    let deleteButton = document.createElement('button')
    deleteButton.id = `delete-${this.id}`
    deleteButton.className = `ui basic button`
    deleteButton.innerText = `Delete`
    deleteButton.addEventListener('click', this.deleteFetch.bind(this))

    ticketsDiv.appendChild(cardsDiv)
    cardsDiv.appendChild(indCardDiv)
    indCardDiv.appendChild(contentDiv)
    contentDiv.appendChild(headerDiv)
    contentDiv.appendChild(metaDiv)
    metaDiv.appendChild(infoSpan)
    contentDiv.appendChild(updateButton)
    contentDiv.appendChild(deleteButton)
  }

  updateEvent(){
    let cardInfo = event.currentTarget.parentNode
    cardInfo.innerHTML = ''

    let headerDiv = document.createElement('div')
    headerDiv.className = `header`
    headerDiv.innerText = `${this.movie_title}`

    let metaDiv = document.createElement('div')
    metaDiv.className = `meta`

    let form = document.createElement('form')
    let inputDiv = document.createElement('div')
    inputDiv.className = `field`
    let input1 = document.createElement('input')
    input1.id = `form-input-1`
    input1.placeholder = `${this.event_date}`

    let save = document.createElement('button')
    save.className = `ui button`
    save.innerText = `Save`
    save.id = `save-${this.id}`

    cardInfo.appendChild(headerDiv)
    headerDiv.appendChild(form)
    form.appendChild(inputDiv)
    inputDiv.appendChild(input1)
    inputDiv.appendChild(save)

    form.addEventListener('submit', this.patchFetch.bind(this))
  }

  patchFetch(event){
    event.preventDefault()
    this.event_date = document.querySelector(`#form-input-1`).value
    fetch(`http://localhost:3000/events/${this.event_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(
        {date: this.event_date}
    )
    }).then(response => response.json())
      .then(data => {
        Controller.fetchTickets()
    })
  }

  deleteFetch(){
    fetch(`http://localhost:3000/tickets/${this.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(data => {
        let cardDiv = document.querySelector(`#allTickets`)
        let specificCard = document.querySelector(`#ticket-${this.id}`)
        cardDiv.removeChild(specificCard)
    })
  }

}
