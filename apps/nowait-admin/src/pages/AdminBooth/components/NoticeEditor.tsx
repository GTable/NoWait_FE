import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useRemoveEmoji } from "../../../hooks/useRemoveEmoji";
import boldIcon from "../../../assets/editorToolBar/bold.svg";
import italicIcon from "../../../assets/editorToolBar/italic.svg";
import sunderIcon from "../../../assets/editorToolBar/sunder.svg";
import underlineIcon from "../../../assets/editorToolBar/underline.svg";

const MenuBar = ({ editor }: { editor: any }) => {
  const [editorChanged, setEditorChanged] = useState(0);
  const exclusive = (tool: "bold" | "italic" | "underline" | "strike") => {
    if (!editor) return;

    const isActiveNow =
      (tool === "bold" && editor.isActive("bold")) ||
      (tool === "italic" && editor.isActive("italic")) ||
      (tool === "underline" && editor.isActive("underline")) ||
      (tool === "strike" && editor.isActive("strike"));
    // 전부해제
    const c = editor
      .chain()
      .focus()
      .unsetBold()
      .unsetItalic()
      .unsetUnderline()
      .unsetStrike();

    //이미 활성 상태였다면 툴 바 전체 해제 --> 즉 기본 글꼴
    if (isActiveNow) {
      c.run();
      return;
    }

    //활성 상태였던게 없다면 클릭한 툴 버튼 기능만 활성화
    if (tool === "bold") c.setBold();
    if (tool === "italic") c.setItalic();
    if (tool === "underline") c.setUnderline();
    if (tool === "strike") c.setStrike();

    c.run();
  };

  // 툴바 버튼 클릭시 리랜더링
  useEffect(() => {
    if (!editor) return;
    console.log(editorChanged);

    const update = () => setEditorChanged((prev) => prev + 1);
    editor.on("transaction", update);
    return () => editor.off("transaction", update);
  }, [editor]);

  if (!editor) return null;

  const baseBtnClass =
    "h-[34px] w-[34px] flex justify-center items-center rounded hover:bg-gray-100 transition-colors duration-200";

  return (
    <div className="flex px-[14px] py-[8px] border-b border-[#F4F4F4] text-gray-600">
      <button
        onClick={() => exclusive("bold")}
        className={`${baseBtnClass} ${
          editor.isActive("bold") ? "bg-gray-100" : ""
        }`}
      >
        <img src={boldIcon} />
      </button>
      <button
        onClick={() => exclusive("italic")}
        className={`${baseBtnClass} ${
          editor.isActive("italic") ? "bg-gray-100" : ""
        }`}
      >
        <img src={italicIcon} />
      </button>
      <button
        onClick={() => exclusive("underline")}
        className={`${baseBtnClass} ${
          editor.isActive("underline") ? "bg-gray-100" : ""
        }`}
      >
        <img src={underlineIcon} />
      </button>
      <button
        onClick={() => exclusive("strike")}
        className={`${baseBtnClass} ${
          editor.isActive("strike") ? "bg-gray-100" : ""
        }`}
      >
        <img src={sunderIcon} />
      </button>
    </div>
  );
};
const NoticeEditor = ({
  noticeTitle,
  setNoticeTitle,
  notice,
  setNotice,
}: {
  noticeTitle: string;
  setNoticeTitle: (val: string) => void;
  notice: string;
  setNotice: (val: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: notice || "",
  });
  const { removeEmojiAll } = useRemoveEmoji();

  // 부모로 내용 동기화
  useEffect(() => {
    if (!editor) return;
    editor.on("update", () => {
      setNotice(editor.getHTML());
    });
  }, [editor, setNotice]);

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (notice && notice !== current) {
      editor.commands.setContent(notice, { emitUpdate: false });
    }
  }, [notice, editor]);

  return (
    <div className="w-full bg-white border border-[#DDDDDD] rounded-xl max-w-[614px]">
      <input
        type="text"
        value={noticeTitle}
        onChange={(e) => {
          setNoticeTitle(removeEmojiAll(e.target.value));
        }}
        placeholder="제목을 입력해주세요"
        className="w-full px-5 py-3 text-14-regular text-black-90 placeholder:text-[#aaaaaa] bg-black-20 rounded-t-xl outline-none"
      />
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="editor-root min-h-[120px] h-[300px] px-[20px] py-[16px] focus:outline-none whitespace-pre-wrap"
      />
    </div>
  );
};

export default NoticeEditor;
