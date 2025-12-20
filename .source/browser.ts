// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"loom-video-communication.mdx": () => import("../blog/content/loom-video-communication.mdx?collection=docs"), "react-portfolio-templates.mdx": () => import("../blog/content/react-portfolio-templates.mdx?collection=docs"), "shadcn-ui-components-guide.mdx": () => import("../blog/content/shadcn-ui-components-guide.mdx?collection=docs"), }),
};
export default browserCollections;