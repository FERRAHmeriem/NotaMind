'use client';

import { api } from '@/convex/_generated/api';
import { useAction } from 'convex/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  Sparkle,
  Strikethrough,
  Underline,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Extensions({ editor }) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [activeAlign, setActiveAlign] = useState(null);
  const { fileId } = useParams();
  useEffect(() => {
    if (!editor) return;

    const updateActiveStyles = () => {
      setIsBold(editor.isActive('bold'));
      setIsItalic(editor.isActive('italic'));

      const alignments = ['left', 'center', 'right', 'justify'];
      const found = alignments.find((align) =>
        editor.isActive({ textAlign: align })
      );
      setActiveAlign(found || null);
    };

    updateActiveStyles();
    editor.on('selectionUpdate', updateActiveStyles);
    editor.on('transaction', updateActiveStyles);

    return () => {
      editor.off('selectionUpdate', updateActiveStyles);
      editor.off('transaction', updateActiveStyles);
    };
  }, [editor]);

  const buttonClass = (active) =>
    `p-2 rounded hover:bg-gray-100 transition ${
      active ? 'text-purple-600' : 'text-gray-600'
    }`;

    const Search = useAction(api.myAction.Search);

    const handleClickAi = async () => {
      const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from, 
        editor.state.selection.to, 
        ' ',
      );
      console.log(selectedText , fileId);
      

      const response = await Search({ 
        query: selectedText,
        fileId: fileId,
      });
      console.log('response' , response);
      
    }
  return (
    editor && (
      <div className="p-5">
        <div className="control-group">
          <div className="button-group flex gap-4 items-center flex-wrap">
            {/* Text Styles */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={buttonClass(isBold)}
            >
              <Bold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={buttonClass(isItalic)}
            >
              <Italic />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()
              }
              className={buttonClass(
                editor.isActive('highlight', { color: '#b197fc' })
              )}
            >
              <Highlighter />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={buttonClass(editor.isActive('underline'))}
            >
              <Underline />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={buttonClass(editor.isActive('strike'))}
            >
              <Strikethrough />
            </button>

            {/* Alignments */}
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={buttonClass(activeAlign === 'left')}
            >
              <AlignLeft />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={buttonClass(activeAlign === 'center')}
            >
              <AlignCenter />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={buttonClass(activeAlign === 'right')}
            >
              <AlignRight />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={buttonClass(activeAlign === 'justify')}
            >
              <AlignJustify />
            </button>
            <div className="relative group">
              <button
                onClick={handleClickAi}
                className="p-3 text-purple-600 bg-white rounded-full transition-all duration-300 shadow-md hover:rotate-6 hover:scale-110 hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-purple-500 hover:text-white"
              >
                <Sparkle className="w-6 h-6 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-purple-400 text-stone-800 text-xs px-2 py-1 rounded shadow">
                Lancer l'IA ✨
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Extensions;
