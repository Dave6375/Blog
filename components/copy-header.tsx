'use client';

import React from 'react';
import {Link} from 'lucide-react';
import { cn } from '@/lib/utils';

// what is the copy header?
// This file makes our blog post headings clickable so readers can easily share a link
// to that specific section

// Hover any H1 or H2 heading in the blog post a little link icon appears nect to it
// click the heading, The url in the browser changes to include said headings name
// that url is automatically copied to their clipboard

interface CopyHeaderProps extends  React.HTMLAttributes<HTMLHeadElement> {
    level: number;
    children: React.ReactNode;
}

function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

export function CopyHeader({ level, children, className, ...props }: CopyHeaderProps) {
    const text = typeof children === 'string' ? children : '';
    const id = generateSlug(text);

    const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    const copyToClipboard = async () => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;

        window.history.pushState({}, '', `#${id}`);

        const element = document.getElementById(id);
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }

            try {
                await navigator.clipboard.writeText(url);
            } catch (error) {
                console.error(error);
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
    };

    const showCopyFunctionality = level === 1 || level === 2;

    if (showCopyFunctionality) {
        return (
            <HeadingTag
                id={id}
                className={cn('group relative scroll-mt-20 cursor-pointer hover:text-muted-foreground transition-colors duration-200 flex items-center gap-2',
                    className
                )}
                onClick={copyToClipboard}
                title='Click to copy to clipboard'
                {...props}
            >

                {children}
                <Link
                    className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0'/>
            </HeadingTag>
        );

    }

        return (
            <HeadingTag
                id={id}
                className={cn(
                    'scroll-mt-20',
                    className
                )}

                {...props}
            >
                {children}

            </HeadingTag>
        )
}