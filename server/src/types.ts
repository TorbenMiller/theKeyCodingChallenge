export type WordPressPost = {
    id: number;
    date: string;
    date_gmt: string;
    guid: Content;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: Content;
    content: Content;
    excerpt: Content;
    author: number;
    featuredMedia: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: object;
    categories: number[];
    tags: string[];
    _links: object;
};

type Content = {
    rendered: string;
    protected?: boolean;
};

export type postApiResponse = { data: WordPressPost[] };

export type Message = {
    eventName: string;
    data: object[];
};

export type WordCountMap = {
    title: string;
    date: string;
    modified: string;
    data: object[];
};
