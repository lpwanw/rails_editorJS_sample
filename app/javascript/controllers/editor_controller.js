import { Controller } from "@hotwired/stimulus"
import EditorJS from "@editorjs/editorjs"

// Connects to data-controller="editor"
export default class extends Controller {
  static targets = [ "body" ]

  connect() {
    this.editor = new EditorJS({
      holder: 'editor',
      data: this.getInitialContent(),
      readOnly: this.readOnly()
    })
    console.log(this.getInitialContent())
  }

  saveData() {
    this.editor.save().then((outputData) => {
      const data = JSON.stringify(outputData)
      this.bodyTarget.value = data
      console.log(data)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  getInitialContent() {
    const hiddenContentField = this.bodyTarget;
    if (hiddenContentField && hiddenContentField.value) {
      return JSON.parse(hiddenContentField.value);
    }
    return {};
  }

  readOnly() {
    return document.getElementById("editor").hasAttribute("readonly")
  }
}
