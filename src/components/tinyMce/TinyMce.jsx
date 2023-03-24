import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import parse from "html-react-parser";

export default function TinyMce({ isMenubar }) {
  const [contentEditor, setContentEditor] = useState("");
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  };
  return (
    <div className="post-editor">
      <Editor
        apiKey={process.env.REACT_APP_TINY_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Write your post content here.</p>"
        init={{
          height: 500,
          menubar: isMenubar,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          image_caption: true,
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleEditorChange}
        value={contentEditor}
      />
      <div className="content">{parse(contentEditor)}</div>
    </div>
  );
}
