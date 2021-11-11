import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  addUsername() {
    if (this.element.querySelector("input[name='score[username]']")) {
      this.element.querySelector("input[name='score[username]']").remove();
    }
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "score[username]");
    input.setAttribute("value", localStorage.getItem("username"));
    this.element.appendChild(input);
  }

  addUUid() {
    if (this.element.querySelector("input[name='score[uuid]']")) {
      this.element.querySelector("input[name='score[uuid]']").remove();
    }
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "score[uuid]");
    input.setAttribute("value", localStorage.getItem("userid"));
    this.element.appendChild(input);
  }

  prepareParams(event) {
    if (localStorage.getItem("username") && localStorage.getItem("userid")) {
      this.addUsername();
      this.addUUid();
    } else {
      event.preventDefault();
    }

    setTimeout(() => {
      this.buttonTarget.disabled = false;
    }, 500)

  }
}