import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

const nextConfig: NextConfig = {
    output: 'export', // Tells Next.js to make static HTML files
    trailingSlash: true, // Creates folders for better routing on Hostinger
    images: {
        unoptimized: true, // Required because Hostinger doesn't run the Next.js image server
    },
}

export default withMDX(nextConfig);
//Hay i also wanted to ask what improvments would make my blog application platfrom thing better and can you explain the strenghts its got already and the the improvments you suggested i add and what strenghts they could add to my blog and does this my blog even count as a blog i get the blog design and the code to create it is cool and i can use the components that i created for the blog in other projects and it would be just as impressive as it was in the blog but i dont think i can make revenu of that or can i