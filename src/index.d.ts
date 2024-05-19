export type Data = {
    updatedAt: string;
    data: Entries;
};
export type Entry = Author & {
    images?: Image[];
    groups?: Group[];
};
export type Entries = Entry[];
export type Group = {
    name: string;
    files: Image[];
};
export type Image = {
    title: string;
    imgSrc: string;
    source: string;
    createdAt?: string;
    objectFit?: ObjectFit;
    history?: History[];
};
export type Author = {
    handleName: string;
    pfp?: string;
    link: {
        github?: string;
        twitter?: string;
    };
    repository?: string;
    license?: {
        label?: string;
        href?: string;
    };
};
/**
 * A : Added
 * C : Copied
 * D : Deleted
 * M : Modified
 * R : Renamed
 * T : Type changed
 * U : Unmerged
 * X : Unknown
 * B : Broken
 */
export type History = {
    date: string;
    message: string;
    status: "A" | "C" | "D" | "M" | "R" | "T" | "U" | "X" | "B";
};
export type ObjectFit = 'cover' | 'contain';
