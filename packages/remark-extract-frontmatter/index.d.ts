import type { Root } from "mdast"
import type { Plugin } from "unified"

declare const remarkExtractFrontmatter: Plugin<unknown[], Root, string>
export default remarkExtractFrontmatter
