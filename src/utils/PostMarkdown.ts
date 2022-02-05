import Post from "@/entity/Post";
import {Config} from "@/libs/Config";
import axios from "axios";

const client = axios.create({
    baseURL: Config.API_URL,
});

const PostMarkdown = (props: Post) => {
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
        headers: {
            "Content-Type": "multipart/from-data",
        },
    }).then((res) => {
        return res.status === 200;
    }).catch((err) => {
        if (err) return false;
    });
}

const stringToFile = (title: string, content: BlobPart[]) => {
    const blob = new Blob(content, { type: "text/markdown" });

    return new File([blob], `${title}.md`, {type: "type/markdown "});
}

export default PostMarkdown;
