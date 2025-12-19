'use client';
// This is our media display it shows images or videos in posts
// Has aspect ratio control and styling  and includes imageviewer and videoviewer helpers for mdx
import { cn } from '@/lib/utils'

interface MediaViewerProps {
    src: string;
    alt?: string;
    type?: 'image' | 'video';
    className?: string;
    width?: number;
    height?: number;
}

export function MediaViewer({
    src,
    alt = '',
    type = 'image',
    className,
    width,
    height,
                            }: MediaViewerProps) {

    const mediaProps = {
        src,
        alt,
        className: cn(
            'w-full h-full object-cover rounded-lg border overflow-hidden aspect-video',
            className
        ),
        ...(width && height ? { width, height } : {}),
    };

    const renderMedia = () => {
        if (type === 'video') {
            return (
                <video {...mediaProps} controls loop>

                    Your browser does not support the video tag
                </video>
            );
        }

        // eslint-disable-next-line @next/no-img-element, jsx-ally/alt-text
        return <img {...mediaProps} />;
    };

    return (
        <div className='my-6 w-full'>
            <div className='relative w-full aspect-video'> {
                renderMedia()
            }
            </div>
        </div>
    );
}

// Helper components for easier MDX usage
export function ImageViewer(props: Omit<MediaViewerProps, 'type'>) {
    return <MediaViewer {...props} type={'image'} />;
}

export function VideoViewer(props: Omit<MediaViewerProps, 'type'>) {
    return <MediaViewer {...props} type={'video'} />;
}