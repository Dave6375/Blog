import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import {siteConfig} from '@/lib/site';
import { metadataKeywords } from './metadata';
import { SiteNav } from '@/components/site-nav';
import Footer from '@/components/footer';
import { Inter } from 'next/font/google';
import '@/app/globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const viewport: Viewport = {
    themeColor: 'black',
};

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: metadataKeywords,
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
    return (
        <html
            lang="en"
            suppressContentEditableWarning
            className={inter.variable}
        >
            <body className={inter.className}>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                <SiteNav />
                {children}
                <Footer />
            </ThemeProvider>
            </body>
        </html>
    );
}
