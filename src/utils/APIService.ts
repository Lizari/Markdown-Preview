import {Config} from "@/libs/Config";
import axios from "axios";

type PostArticleData = {
    title: string,
    description: string,
    thumbnail: string,
    tags: string[],
    content: string
}

const client = axios.create({
    baseURL: Config.API_URL,
    withCredentials: true,
});

export const get = () => {
    return client.get("/article");
}

export const postArticle = (id: string, password: string, article: PostArticleData): Promise<boolean | undefined> => {
    const formData = new FormData();
    const data = [
        "===",
        `title: ${article.title}`,
        `description: ${article.description}`,
        `thumbnail: ${article.thumbnail}`,
        `tags: ${article.tags}`,
        "===",
        ...article.content.split(/\r?\n/)].join("\n");
    formData.append("file", stringToFile(article.title, [data]));

    return client.post("/blog/upload", formData, {
        auth: {
          username: id,
          password: password
        },
        headers: {
            "Content-Type": "multipart/from-data",
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
