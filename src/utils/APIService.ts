import {Post} from "@/entity/Post";
import {Config} from "@/libs/Config";
import axios from "axios";

const client = axios.create({
    baseURL: Config.API_URL,
    withCredentials: true,
});

export const post = (id: string, password: string, props: Post): Promise<boolean | undefined> => {
    const formData = new FormData();
    const data = [
        "===",
        `title: ${props.title}`,
        `description: ${props.description}`,
        `thumbnail: ${props.thumbnail}`,
        `tags: ${props.tags}`,
        "===",
        ...props.content.split(/\r?\n/)].join("\n");
    formData.append("file", stringToFile(props.title, [data]));

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