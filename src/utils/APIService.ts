import {Config} from "@/libs/Config";
import axios from "axios";

type PostArticleData = {
    id: number,
    title: string,
    description: string,
    thumbnail: string,
    tags: string[],
    content: string
}

const client = axios.create({
    baseURL: Config.API_URL,
});

export const get = () => {
    return client.get("/article", {
        responseEncoding: 'utf8',
        responseType: 'json'
    });
}

export const postArticle = (id: string, password: string, article: PostArticleData): Promise<boolean | undefined> => {
    const data = {
        'title': article.title,
        'description': article.description,
        'thumbnail': article.thumbnail,
        'tags': article.tags,
        'content': article.content.split(/\r?\n/).join('\n')
    }

    return client.patch(`/article/${article.id}`, data, {
        auth: {
          username: id,
          password: password
        },
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.status === 200;
    }).catch((err) => {
        if (err) return false;
    });
}

export const stringToFile = (title: string, content: BlobPart[]): File => {
    const blob = new Blob(content, { type: "text/markdown" });

    return new File([blob], `${title}.md`, {type: "type/markdown "});
}