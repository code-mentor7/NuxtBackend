<template>
  <div>
    <label
      aria-hidden="true"
      class="v-label v-label--active">{{ label }}</label>
    <div
      :id="id"
      placeholder="Enter description here"/>
  </div>
</template>

<script>
import trumbowyg from "trumbowyg"
$.trumbowyg.svgPath = false
$.trumbowyg.hideButtonTexts = true
export default {
  props: ["data", "id", "label"],
  watch: {
    data (val) {
      this.data = val
      if (val) {
        $(`#${this.id}`).trumbowyg("html", this.data)
      }
      else {
        $(`#${this.id}`).trumbowyg("empty")
      }
    }
  },
  mounted () {
    $(`#${this.id}`).trumbowyg({
      removeformatPasted: true
    })
    $(`#${this.id}`).trumbowyg("html", this.data)
  }
}
</script>

<style>
.trumbowyg-button-pane {
    z-index: 1 !important;
}

.trumbowyg-viewHTML-button:after {
	font-family: FontAwesome;
	content: "\f121";
    color: black;
}

.trumbowyg-undo-button:after {
	font-family: FontAwesome;
	content: "\f0e2";
    color: black;
}

.trumbowyg-redo-button:after {
	font-family: FontAwesome;
	content: "\f01e";
    color: black;
}

.trumbowyg-formatting-button:before {
	font-family: FontAwesome;
	content: "\f1dd";
    color: black;
}

.trumbowyg-strong-button:after {
	font-family: FontAwesome;
	content: "\f032";
    color: black;
}

.trumbowyg-em-button:after {
	font-family: FontAwesome;
	content: "\f033";
    color: black;
}

.trumbowyg-del-button:after {
	font-family: FontAwesome;
	content: "\f0cc";
    color: black;
}

.trumbowyg-superscript-button:after {
	font-family: FontAwesome;
	content: "\f12b";
    color: black;
}

.trumbowyg-subscript-button:after {
	font-family: FontAwesome;
	content: "\f12c";
    color: black;
}

.trumbowyg-link-button:before {
	font-family: FontAwesome;
	content: "\f0c1";
    color: black;
}

.trumbowyg-insertImage-button:after {
	font-family: FontAwesome;
	content: "\f03e";
    color: black;
}

.trumbowyg-justifyLeft-button:after {
	font-family: FontAwesome;
	content: "\f036";
    color: black;
}

.trumbowyg-justifyCenter-button:after {
	font-family: FontAwesome;
	content: "\f037";
    color: black;
}

.trumbowyg-justifyRight-button:after {
	font-family: FontAwesome;
	content: "\f038";
    color: black;
}

.trumbowyg-justifyFull-button:after {
	font-family: FontAwesome;
	content: "\f039";
    color: black;
}

.trumbowyg-unorderedList-button:after {
	font-family: FontAwesome;
	content: "\f03a";
    color: black;
}

.trumbowyg-orderedList-button:after {
	font-family: FontAwesome;
	content: "\f0cb";
    color: black;
}

.trumbowyg-horizontalRule-button:after {
	font-family: FontAwesome;
	content: "\f068";
    color: black;
}

.trumbowyg-removeformat-button:after {
	font-family: FontAwesome;
	content: "\f12d";
    color: black;
}

.trumbowyg-fullscreen-button:after {
	font-family: FontAwesome;
	content: "\f0b2";
    color: black;
}

.trumbowyg-bold-button:after {
	font-family: FontAwesome;
	content: "\f032";

}

.trumbowyg-italic-button:after {
	font-family: FontAwesome;
	content: "\f033";
}

.trumbowyg-underline-button:after {
	font-family: FontAwesome;
	content: "\f0cd";
}

.trumbowyg-strikethrough-button:after {
	font-family: FontAwesome;
	content: "\f0cc";
}

.trumbowyg-foreColor-button:before {
	font-family: FontAwesome;
	content: "\f031";
}

.trumbowyg-backColor-button:before {
	font-family: FontAwesome;
	content: "\f031";
	color: black;
	background-color: #555555;
	padding: 1px;
	font-size: 85%;
	line-height: 200%;
}

/*===== DROPDOWN BUTTONS =====*/

.trumbowyg-p-dropdown-button:before {
	font-family: FontAwesome;
	content: "\f1dd";
	margin-right: 10px;
}

.trumbowyg-blockquote-dropdown-button:before {
	font-family: FontAwesome;
	content: "\f10d";
	margin-right: 10px;
}

.trumbowyg-h1-dropdown-button:before,
.trumbowyg-h2-dropdown-button:before,
.trumbowyg-h3-dropdown-button:before,
.trumbowyg-h4-dropdown-button:before {
	font-family: FontAwesome;
	content: "\f1dc";
	margin-right: 10px;
}

.trumbowyg-createLink-dropdown-button:before {
	font-family: FontAwesome;
	content: "\f0c1";
	margin-right: 10px;
}

.trumbowyg-unlink-dropdown-button:before {
	font-family: FontAwesome;
	content: "\f127";
	margin-right: 10px;
}
</style>
