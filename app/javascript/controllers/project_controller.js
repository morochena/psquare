import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number }
  name = ""

  initialize() {
    this.highlightProject()
  }

  setCurrentProjectFormName() {
    document.getElementById("current-project-name").innerHTML = this.name;
    document.getElementById("vote-form").action = `/projects/${this.indexValue}/scores`;
  }

  highlightProject() {
    document.querySelectorAll(".list-group-item").forEach(item => {
      item.classList.remove("active")
    })
    document.getElementById(`project_${this.indexValue}`).classList.add('active')
  }

  select(event) {
    const { id, name } = event.params
    this.indexValue = id;
    this.name = name;
    this.setCurrentProjectFormName();
    this.highlightProject();
  }
}


