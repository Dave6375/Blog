// @ts-nocheck
import * as __fd_glob_2 from "../blog/content/shadcn-ui-components-guide.mdx?collection=docs"
import * as __fd_glob_1 from "../blog/content/react-portfolio-templates.mdx?collection=docs"
import * as __fd_glob_0 from "../blog/content/loom-video-communication.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "blog/content", {"loom-video-communication.mdx": __fd_glob_0, "react-portfolio-templates.mdx": __fd_glob_1, "shadcn-ui-components-guide.mdx": __fd_glob_2, });

export const meta = await create.meta("meta", "blog/content", {});