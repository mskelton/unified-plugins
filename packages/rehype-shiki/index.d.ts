import type { Root } from "mdast"
import type { Plugin } from "unified"

declare const rehypeShiki: Plugin<unknown[], Root, string>
export default rehypeShiki
