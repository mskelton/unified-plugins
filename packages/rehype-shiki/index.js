import { toText } from "hast-util-to-text"
import { getSingletonHighlighter } from "shiki"
import { SKIP, visit } from "unist-util-visit"

export default function rehypeShiki({ highlighterOptions, codeToHastOptions }) {
  let highlighter

  return async (ast) => {
    if (!highlighter) {
      highlighter = await getSingletonHighlighter(highlighterOptions)
    }

    function highlight(source, lang) {
      try {
        return highlighter.codeToHast(source, { lang, ...codeToHastOptions })
      } catch {
        return null
      }
    }

    visit(
      ast,
      (node) => {
        return (
          node.tagName === "pre" &&
          Array.isArray(node.children) &&
          node.children.length === 1 &&
          node.children[0].tagName === "code"
        )
      },
      (node, index, parent) => {
        const source = toText(node).slice(0, -1)
        const language = node.children[0].properties?.className?.[0]
          ?.split("language-")
          .at(-1)

        let output =
          highlight(source, language ?? "text") ?? highlight(source, "text")

        if (output) {
          parent.children[index] = output.children[0]

          // Copy any metadata from the original node to the new node
          parent.children[index].data = node.data
        }

        return SKIP
      },
    )
  }
}
