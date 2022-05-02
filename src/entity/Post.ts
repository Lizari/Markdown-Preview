export type Post = {
    title: string,
    description: string,
    thumbnail?: string,
    tags: Array<string>,
    content: string
}

export type PostFull = {
    meta: {
       slug: string,
       posted_by: string,
       updated_by: string,
    },
    title: string,
    description: string,
    thumbnail: string,
    tags: Array<string>,
    content: string,
}