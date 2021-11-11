import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number, }
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

    const uuid = localStorage.getItem("userid")
    const votesHash = JSON.parse(document.getElementById(`project_${id}`).dataset.projectVotesValue)

    let effortSelect = document.getElementById("score_effort_score");
    let impactSelect = document.getElementById("score_impact_score");

    if (votesHash[uuid]) {
      effortSelect.value = votesHash[uuid]["effort_score"];
      impactSelect.value = votesHash[uuid]["impact_score"];
    } else {
      effortSelect.value = null;
      impactSelect.value = null;
    }

    this.setCurrentProjectFormName();
    this.highlightProject();
  }
}


