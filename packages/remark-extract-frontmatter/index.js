import { matter } from "vfile-matter"

export default function remarkExtractFrontmatter() {
  return function (_, file) {
    matter(file)
  }
}
