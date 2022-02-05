import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: String }

  initialize() {
    const id = localStorage.getItem("selected-project");
    const uuid = localStorage.getItem("userid")

    // is selected
    if (id === this.idValue) {
      this.element.classList.add("active");
    }

    // user has voted on item
    const votesHash = JSON.parse(this.element.dataset.projectVotesValue)
    if (votesHash[uuid]) {
      this.element.classList.add("voted")
    }
  }
}


