import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["text", "form"]

  initialize() {

  }

  toggleForm(event) {
    event.preventDefault()
    this.formTarget.style.display = "block"
  }

}


