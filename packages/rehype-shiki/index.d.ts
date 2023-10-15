import type { Root } from "mdast";
import type { Plugin } from "unified";

declare const remarkShiki: Plugin<unknown[], Root, string>;
export default remarkShiki;
