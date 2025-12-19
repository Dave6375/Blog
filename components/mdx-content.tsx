"use client";

import type { MDXContent as MDXContentType } from "mdx/types";

export function MDXContent({ body }: { body: MDXContentType }) {
    const Component = body;
    return <Component />;
}
