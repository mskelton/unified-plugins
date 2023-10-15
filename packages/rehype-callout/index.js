import { SKIP, visit } from "unist-util-visit";

function applyClass(className, type) {
  return typeof className === "string"
    ? className
    : [className?.default, className?.[type]].flat().filter(Boolean);
}

export default function rehypeCallout(options) {
  const types = options?.types ?? ["INFO", "WARN", "ERROR"];
  const regex = new RegExp(`\\[!(${types.join("|")})(\\s.*)?\\]`);

  return (tree) =>
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "blockquote",
      (node, index, parent) => {
        const children = node.children
          .filter((child) => child.type === "element")
          .flatMap((child) => child.children);

        const [first] = children;
        const match = first?.type === "text" ? first.value.match(regex) : null;
        if (!match) {
          return;
        }

        const [_, type, title] = match;
        const icon = options?.icons?.[type];

        parent.children.splice(index, 1, {
          type: "element",
          tagName: "aside",
          children: [
            icon && {
              ...icon,
              properties: {
                ...icon.properties,
                class: applyClass(options?.class, type),
              },
            },
            {
              type: "element",
              tagName: "strong",
              properties: {
                class: applyClass(options?.titleClass, type),
              },
              children: [{ type: "text", value: title || type }],
            },
            {
              type: "element",
              tagName: "div",
              properties: {
                class: applyClass(options?.contentClass, type),
              },
              children: children.slice(2),
            },
          ].filter(Boolean),
          properties: {
            class: options?.class,
          },
        });

        return SKIP;
      },
    );
}
