import React, { useState } from 'react';
import { Editor, EditorContent, EditorMenuBar } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TiptapEditor = () => {
  const [content, setContent] = useState('');

  return (
    <div>
      <Editor
        editorProps={{
          extensions: [
            StarterKit
          ],
          onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
          }
        }}
      >
        <EditorMenuBar />
        <EditorContent />
      </Editor>
      <div>
        <h2>Editor Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default TiptapEditor;
