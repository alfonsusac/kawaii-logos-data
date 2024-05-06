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
    className?: string;
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
