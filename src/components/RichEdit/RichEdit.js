import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = (props) => {
  const handleEditorChange = (editor) => props.setValue(editor);
  return (
    <div>
      <Editor
        apiKey="j90cubxfrexyhvf32nalebg32zjou49e7n7pd5pwgdb2czzq"
        cloudChannel="dev"
        init={{
          selector: "textarea",
          plugins: "link image textpattern lists ",
          height: 180,
          statusbar: false,
          menubar: false,
        }}
        value={props.value}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}

export default TextEditor;
