'use client'

import Extensions from './extensions'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Color from '@tiptap/extension-color'
import { api } from '@/convex/_generated/api';

const TextEditor = ({fileId}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Pose une question …',
      }),
      Highlight.configure({ multicolor: true }),
      Underline,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none p-5 h-[90vh]',
      },
    },
    immediatelyRender: false,
  })



  const getNotes = useQuery(api.notes.getNotes, fileId : fileId);

  return (
    <div className="overflow-auto h-[90vh] mb-6">
      <Extensions editor={editor } />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TextEditor
