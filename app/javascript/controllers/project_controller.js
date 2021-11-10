import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number }

  initialize() {
    this.highlightProject()
  }

  highlightProject() {
    document.getElementById(`project-${this.indexValue}`).classList.add('active')
  }
}


