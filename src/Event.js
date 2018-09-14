class Event {
  constructor(id, date, time, location) {
    this.id = id
    this.date = date
    this.time = time
    this.location = location
  }

  renderEvent(){
    console.log(`i got to renderEvent`, this.id)
  }
}
