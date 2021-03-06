import React, {forwardRef, useImperativeHandle, useState} from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {
    Button,
    FormControl,
    FormLabel,
    Input, Tag, TagLabel,
    useBoolean
} from "@chakra-ui/react";
import { postArticle } from "@/utils/APIService";
import { Article } from "@/entity/Article";

type FormProps = {
    article: Article
}

const UploadForm = forwardRef<{toggle(): void}, FormProps>((props, ref) => {
    const [userid, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState(props.article.title);
    const [description, setDescription] = useState(props.article.description);
    const [thumbnail, setThumbnail] = useState(props.article.thumbnail);
    const [tags, setTags] = useState(props.article.tags);
    const [isOpen, toggleOpen] = useBoolean(false);
    const [result, setResult] = useState(false);

    useImperativeHandle(ref, () => ({
        toggle: () => {
            toggleOpen.toggle();
            setResult(false);
        }
    }), []);

    return(
        <Modal isOpen={isOpen} onClose={toggleOpen.toggle}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Upload</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>UserID</FormLabel>
                        <Input value={userid} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserID(e.target.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>パスワード</FormLabel>
                        <Input value={password} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>タイトル</FormLabel>
                        <Input value={title} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTitle(e.target.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>説明</FormLabel>
                        <Input value={description} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>サムネイル</FormLabel>
                        <Input value={thumbnail} type={"url"} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setThumbnail(e.target.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>タグ</FormLabel>
                        <Input value={tags} onChange={(e: { target: { value: string; }; }) => setTags(e.target.value.split(" "))}/>
                        {tags.map((value =>
                            <Tag key={value}
                                 color={"teal"}
                                 bg={"green.100"}
                                 mr={2}
                                 mt={2}>
                                <TagLabel>{value}</TagLabel>
                            </Tag>
                        ))}
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button isDisabled={validateForm(title, description, tags, thumbnail)}
                            colorScheme={result ? "blue" : "red"}
                            mr={2}
                            onClick={async () => {
                                const result: boolean | undefined = await postArticle(userid, password, {
                                    id: props.article.id,
                                    title: title,
                                    description: description,
                                    thumbnail: thumbnail,
                                    tags: tags,
                                    content: props.article.content
                                });
                                if (result) setResult(result);
                            }
                    }>{result ? "Succeed" : "Upload"}</Button>
                    <Button onClick={() => toggleOpen.off()}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

const validateURL = (url: string): boolean => {
    const regex = new RegExp( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&=]*)/);

    return !regex.test(url);
}

const validateForm = (title: string, description: string, tags: Array<String>, thumbnail: string): boolean => {
    return title === "" || description === "" || tags.length === 0 || validateURL(thumbnail);
}

export default UploadForm
