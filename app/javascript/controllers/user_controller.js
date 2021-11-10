import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    if (localStorage.getItem("username") && localStorage.getItem("userid")) {
      const username = localStorage.getItem("username");
      document.getElementById("nav-username").innerHTML = username;
    }
  }


}


