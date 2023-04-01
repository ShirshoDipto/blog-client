import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./tinyMce.css";

export default function TinyMce({
  isMenubar,
  contentEditor,
  handleEditorChange,
}) {
  // const [contentEditor, setContentEditor] = useState("");
  // const handleEditorChange = (content, editor) => {
  //   console.log(editorRef.current);
  //   console.log(content);
  // };
  const editorRef = useRef(null);
  const initialValue = useRef(contentEditor);

  return (
    <div className="post-editor">
      <Editor
        apiKey={process.env.REACT_APP_TINY_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue.current}
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
            "image code",
            "media",
          ],
          automatic_uploads: true,
          image_caption: true,
          file_picker_types: "image",
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function () {
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                // var img = new Image();
                // img.src = reader.result;
                // editorRef.current.insertContent(
                //   '<img data-name="' + file.name + '" src="' + img.src + '"/>'
                // );

                var id = "blobid" + new Date().getTime();
                var blobCache = editorRef.current.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
          iframe_template_callback: (data) =>
            `<iframe title="${data.title}" width="${data.width}" height="${data.height}" src="${data.source}"></iframe>`,
        }}
        onEditorChange={handleEditorChange}
        value={contentEditor}
      />
      {/* <div>{parse(contentEditor)}</div> */}
    </div>
  );
}
