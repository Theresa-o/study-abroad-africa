import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useState } from "react";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import {
  Table2Icon,
  RowsIcon,
  ColumnsIcon,
  Trash2Icon,
  MergeIcon,
  Link2,
} from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  error?: boolean;
  placeholder?: string;
}

const disallowedProtocols = ["ftp", "file", "mailto"];
const disallowedDomains = ["malicious.com", "phishing.site"];
const noAutoLinkDomains = ["localhost"];

const isSafeProtocol = (protocol: string, allowedProtocols: string[]) =>
  allowedProtocols.includes(protocol) &&
  !disallowedProtocols.includes(protocol);

const isSafeDomain = (domain: string) => !disallowedDomains.includes(domain);

const shouldAutoLinkDomain = (domain: string) =>
  !noAutoLinkDomains.includes(domain);

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  error = false,
}) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable heading from StarterKit
        heading: false,
      }),
      ListItem,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Heading.configure({
        levels: [1, 2, 3],
      }).extend({
        addGlobalAttributes() {
          return [
            {
              types: [this.name],
              attributes: {
                class: {
                  default: null,
                  renderHTML: (attributes) => {
                    const level = attributes.level;
                    const levelClasses: Record<number, string> = {
                      1: "text-3xl font-bold mt-10 mb-5",
                      2: "text-2xl font-semibold mt-8 mb-4",
                      3: "text-xl font-medium mt-6 mb-3",
                    };
                    return {
                      class: levelClasses[level] || "",
                    };
                  },
                },
              },
            },
          ];
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-2",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            const protocol = parsedUrl.protocol.replace(":", "");
            const domain = parsedUrl.hostname;
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            return (
              ctx.defaultValidate(parsedUrl.href) &&
              isSafeProtocol(protocol, allowedProtocols) &&
              isSafeDomain(domain)
            );
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);
            return shouldAutoLinkDomain(parsedUrl.hostname);
          } catch {
            return false;
          }
        },
      }),
    ],

    content: content,
    onUpdate: ({ editor }) => {
      // Get HTML content
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[120px] p-3 ${
          error ? "border-red-500" : "border-gray-300"
        }`,
      },
    },
  });

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const applyLink = useCallback(() => {
    if (!linkInput) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkInput })
        .run();
    }
    setShowLinkInput(false);
  }, [editor, linkInput]);

  const cancelLinkInput = () => {
    setShowLinkInput(false);
    setLinkInput("");
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Toolbar */}
      {editor && (
        <div className="border-b bg-gray-50 p-3 flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("bold")
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("italic")
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Italic
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }
          >
            H1
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("heading", { level: 2 })
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("heading", { level: 3 })
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("bulletList")
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("orderedList")
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            1. List
          </button>
          <>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              title="Insert Table"
              className={`px-2 py-2 rounded text-sm font-medium ${
                editor.isActive("table")
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Table2Icon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().addRowAfter().run()}
              title="Add Row After"
              className="px-2 py-2 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
            >
              <RowsIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title="Add Column After"
              className="px-2 py-2 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
            >
              <ColumnsIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().mergeCells().run()}
              title="Merge Cells"
              className="px-2 py-2 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
            >
              <MergeIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteTable().run()}
              title="Delete Table"
              className="px-2 py-2 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
            >
              <Trash2Icon size={18} />
            </button>
          </>
          <>
            <button
              onClick={() => {
                if (editor?.isActive("link") && !showLinkInput) {
                  // Unset the link directly if one exists and input is not showing
                  editor.chain().focus().unsetLink().run();
                } else {
                  // Otherwise, open the input to set a new link
                  const previousUrl = editor?.getAttributes("link").href || "";
                  setLinkInput(previousUrl);
                  setShowLinkInput(true);
                }
              }}
              className={`text-xl px-3 py-1 rounded ${
                editor?.isActive("link")
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              title={
                editor?.isActive("link") && !showLinkInput
                  ? "Unset link"
                  : "Set link"
              }
            >
              <Link2 />
            </button>
          </>

          {showLinkInput && (
            <div className="absolute bg-white p-3 rounded shadow top-14 left-4 w-72 z-10 border">
              <input
                type="text"
                className="w-full border p-2 rounded text-sm"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="https://example.com"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={cancelLinkInput}
                  className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={applyLink}
                  className="text-sm px-3 py-1 rounded bg-primary text-white hover:bg-primary-dark"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Editor Content */}
      <div
        className={`border-0 ${error ? "border-primary" : "border-gray-300"}`}
      >
        {/* <EditorContent editor={editor} className="tiptap min-h-[120px]" /> */}
        <div className="overflow-auto">
          <EditorContent editor={editor} className="tiptap min-h-[150px]" />
        </div>
      </div>
    </div>
  );
};
