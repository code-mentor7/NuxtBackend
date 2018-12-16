<template>
  <div>
    <label
      aria-hidden="true"
      class="v-label v-label--active">{{ label }}</label>
    <section class="container">
      <div
        v-quill:myQuillEditor="editorOption"
        :content="value"
        class="quill-editor"
        @change="onEditorChange($event)"/>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      default: "",
      required: true,
      type: String
    },
    value: {
      required: true
    }
  },
  data () {
    return {
      // content: this.value,
      editorOption: {
        placeholder: "Compose your description here",
        formats: [
          "align",
          "background",
          "blockquote",
          "bold",
          "code-block",
          "color",
          "header",
          "image",
          "indent",
          "italic",
          "link",
          "list",
          "script",
          "size",
          "strike",
          "underline",
          "video"
        ],
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image", "video"]
          ]
        }
      }
    }
  },
  // watch: {
  //   value (val) {
  //     console.log("### watch quill")
  //     this.content = val
  //   }
  // },
  mounted () {
  },
  methods: {
    onEditorBlur (editor) {

    },
    onEditorFocus (editor) {

    },
    onEditorReady (editor) {

    },
    onEditorChange ({ editor, html, text }) {
      this.$emit("input", html)
    }
  }
}
</script>

<style lang="scss">
  .container {
    .ql-toolbar {
      background-color: white !important;
    }
    .ql-editor {
      background-color: white;
      color: black;
      min-height: 200px;
      max-height: 200px;
      overflow: auto;
    }
  }
</style>
