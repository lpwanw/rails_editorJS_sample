import { Controller } from "@hotwired/stimulus"
import EditorJS from "@editorjs/editorjs"

// Connects to data-controller="editor"
export default class extends Controller {
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
      document.getElementById("post_body").value = data
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  getInitialContent() {
    const hiddenContentField = document.getElementById(
      "post_body"
    );
    if (hiddenContentField && hiddenContentField.value) {
      return JSON.parse(hiddenContentField.value);
    }
    return {};
  }

  readOnly() {
    return document.getElementById("editor").hasAttribute("readonly")
  }
}
