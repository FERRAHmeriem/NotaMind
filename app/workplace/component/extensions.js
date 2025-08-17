'use client';

import ChatSession from '@/Configs/ModelAi';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useAction, useMutation } from 'convex/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  LoaderCircle,
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
  const [loading, setLoading] = useState(false);
  const {user} = useUser()
  const { fileId } = useParams();
  const addNotes = useMutation(api.notes.AddNote)
  
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

    setLoading(true); // ✅ Start loading

    try {
      const response = await Search({
        query: selectedText,
        fileId,
      });

      const unformattedAns = JSON.parse(response);
      console.log("importent", response);

      let answer = '';
      unformattedAns?.forEach((item) => (answer += item.pageContent + ' '));

      const fullPrompt = `
 "Answer the following question using the provided context.\n\nContext:\n${answer}\n\nQuestion: ${selectedText}"`;

      console.log('ChatSession:', ChatSession);
      const AiModelResult = await ChatSession.sendMessage(fullPrompt);
      const AllText = editor.getHTML();
      const finalAnswer = await AiModelResult.response.text();
      editor.commands.setContent(
        AllText +
          '<p>&nbsp;&nbsp;&nbsp;' +
          finalAnswer +
          '</br></br></p>'
      );
    } catch (error) {
      editor.commands.insertContent(
        `<p><strong>Erreur:</strong> Une erreur est survenue.</p>`
      );
    } finally {
      setLoading(false); // ✅ End loading
    }
    addNotes({
      notes : editor.getHTML(),
      fileId : fileId,
      createdBy : user?.primaryEmailAddress?.emailAddress
    })
  };

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

            {/* Sparkle AI Button */}
            <div className=" fixed z-20 bottom-10 right-15 group">
              <button
                onClick={handleClickAi}
                disabled={loading}
                className={`p-3 text-purple-600 bg-white rounded-full transition-all duration-300 shadow-md ${
                  loading
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:rotate-6 hover:scale-110 hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-purple-500 hover:text-white'
                }`}
              >
                {loading ? (
                  <span className="text-xs animate-pulse font-medium"><LoaderCircle className="animate-spin text-purple-500" /></span>
                ) : (
                  <Sparkle className="w-6 h-6 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                )}
              </button>
              {!loading && (
                <span className=" absolute -bottom-8  -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-purple-400 text-stone-800 text-xs px-2 py-1 rounded shadow">
                  Lancer l'IA ✨
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Extensions;
