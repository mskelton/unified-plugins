import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Node } from "unist";

export type CalloutType = "INFO" | "WARN" | "ERROR";

export type ClassValue = string | string[] | null | undefined;

export type CalloutClass<T extends CalloutType> =
  | ClassValue
  | Partial<Record<T | "default", ClassValue>>;

export interface Options<T extends CalloutType = CalloutType> {
  /**
   * Custom class name for the callout element.
   */
  class?: CalloutClass<T>;
  /**
   * Custom class name for the title element.
   */
  titleClass?: CalloutClass<T>;
  /**
   * Custom class name for the content element.
   */
  contentClass?: CalloutClass<T>;
  /**
   * Icons for the callout.
   */
  icons?: Partial<Record<T, Node>>;
  /**
   * Allowed types of callouts.
   * @default ["INFO", "WARN", "ERROR"]
   */
  types?: T[];
}

declare const rehypeCallout: Plugin<
  [(undefined | null | Options)?],
  Root,
  string
>;
export default rehypeCallout;
