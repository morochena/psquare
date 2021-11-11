import * as bootstrap from 'bootstrap';
import * as uuid from 'uuid'
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  username = null;
  userid = null;
  model = null;
  static targets = ["username"]

  connect() {
    if (localStorage.getItem("username") && localStorage.getItem("userid")) {
      this.username = localStorage.getItem("username")
      this.userid = localStorage.getItem("userid")
    } else {
      this.modal = new bootstrap.Modal(document.getElementById("usernameModal"))
      this.modal.show();
    }
    console.log(this.username)
    console.log(this.userid)
  }

  save() {
    const element = this.usernameTarget;
    const username = element.value.trim();

    if (username.length > 0) {
      localStorage.setItem("username", username);
      localStorage.setItem("userid", uuid.v4());
      document.getElementById("nav-username").innerHTML = username;
      this.modal.toggle();
    }

  }
}


