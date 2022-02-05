import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number, }
  static targets = ["projects", "vform"]

  name = ""

  initialize() {
    this.highlightVotedProjects();

    if (document.querySelectorAll(".p-list-item").length > 0) {
      setTimeout(() => {
        document.querySelectorAll(".p-list-item")[0].click();
      }, 300);
    }
  }

  highlightVotedProjects() {
    const uuid = localStorage.getItem("userid")

    document.querySelectorAll(".p-list-item").forEach(item => {
      const votesHash = JSON.parse(item.dataset.projectVotesValue)
      if (votesHash[uuid]) {
        item.classList.add("voted")
      }
    })
  }

  setCurrentProjectFormName() {
    document.getElementById("current-project-name").innerHTML = this.name;
    document.getElementById("vote-form").action = `/projects/${this.indexValue}/scores`;
  }

  highlightProject() {
    document.querySelectorAll(".p-list-item").forEach(item => {
      item.classList.remove("active")
    })
    document.getElementById(`project_${this.indexValue}`).classList.add('active')
  }

  selectNext() {
    setTimeout(() => {
      const currentIndex = this.projectsTargets.findIndex(project => parseInt(project.dataset.projectIdParam) === this.indexValue)
      if (this.projectsTargets[currentIndex + 1]) {
        const selectedProject = this.projectsTargets[currentIndex + 1]
        this.indexValue = parseInt(selectedProject.dataset.projectIdParam);
        this.name = selectedProject.dataset.projectNameParam;

        const uuid = localStorage.getItem("userid")
        const votesHash = JSON.parse(document.getElementById(`project_${this.indexValue}`).dataset.projectVotesValue)

        let effortSelect = document.getElementById("score_effort_score");
        let impactSelect = document.getElementById("score_impact_score");

        if (votesHash[uuid]) {
          effortSelect.value = votesHash[uuid]["effort_score"];
          impactSelect.value = votesHash[uuid]["impact_score"];
        } else {
          effortSelect.value = null;
          impactSelect.value = null;
        }
      }

      this.setCurrentProjectFormName();
      this.highlightProject();
      this.highlightVotedProjects();
    }, 300)

  }

  select(event) {
    const { id, name } = event.params
    this.indexValue = id;
    this.name = name;
    this.vformTarget.style.display = "flex"

    const selectedItem = localStorage.setItem("selected-project", id);

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
    this.highlightVotedProjects();
  }
}


