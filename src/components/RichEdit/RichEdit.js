import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = (props) => {
  const handleEditorChange1 = (editor) =>{
    props.setUpdateValue(editor)
    props.setValue(editor)
  };
  return (
    <p>
      <Editor
        apiKey="j90cubxfrexyhvf32nalebg32zjou49e7n7pd5pwgdb2czzq"
        cloudChannel="dev"
        init={{
          content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
          selector: "textarea",
          height: 180,
          statusbar: true,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
        }}

        onEditorChange={handleEditorChange1}
        initialValue={props?.value}
      />
    </p>
  );
};

export default TextEditor;
