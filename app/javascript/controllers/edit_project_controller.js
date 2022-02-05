import 'flowbite';
import { Controller } from "@hotwired/stimulus"
import { get } from "@rails/request.js"

export default class extends Controller {

  selectProject(event) {
    if (event.params.id) {
      get(`/projects/${event.params.id}/edit_form`, {
        responseKind: 'turbo-stream'
      })
      this.openModal();
    }
  }

  openModal() {
    toggleModal("project-edit-modal", true);
  }

  closeModal() {
    toggleModal("project-edit-modal", false);
  }
}