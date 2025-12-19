export interface Author {
    name: string;
    position: string;
    avatar: string;
}

export const authors: Record<string, Author> = {
    david: {
        name: "David Idoko",
        position: 'Freelancer Software Engineer',
        avatar: '/authors/david.png',

    },
    idoko: {
        name: 'David Idoko',
        position: 'Freelancer Design System Engineer',
        avatar: '/authors/idoko.png',
    },
} as const;

// Pls check what this author key is about
// when we are checking the code
export type AuthorKey = keyof typeof authors;

export function getAuthor(key: AuthorKey): Author {
    return authors[key];
}

export function isValidAuthor(key: string): key is AuthorKey {
    return key in authors
}