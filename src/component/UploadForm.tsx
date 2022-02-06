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
import { post } from "@/utils/PostMarkdown";

type FormProps = {
    content: string
}

const UploadForm = forwardRef<{toggle(): void}, FormProps>((props, ref) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [tags, setTags] = useState([""]);
    const [isOpen, toggleOpen] = useBoolean(false);
    const [result, setResult] = useState(false);

    useImperativeHandle(ref, () => ({
        toggle: () => {
            toggleOpen.toggle();
            resetState();
        }
    }), []);

    const resetState = () => {
        setTitle("");
        setDescription("");
        setThumbnail("");
        setTags([""]);
        setResult(false);
    }

    return(
        <Modal isOpen={isOpen} onClose={toggleOpen.toggle}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Upload</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>タイトル</FormLabel>
                        <Input onChange={(e) => setTitle(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>説明</FormLabel>
                        <Input onChange={(e) => setDescription(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>サムネイル</FormLabel>
                        <Input type={"url"} onChange={(e) => setThumbnail(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>タグ</FormLabel>
                        <Input onChange={(e) => setTags(e.target.value.split(" "))}/>
                        {tags.map((value =>
                            <Tag color={"teal"}
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
                            onClick={() => async () => {
                                const result = await post({
                                    title: title,
                                    description: description,
                                    thumbnail: thumbnail,
                                    tags: tags,
                                    content: props.content
                                });
                                // undefined確認用
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
    return title === null || description === null || tags.length === 0 || validateURL(thumbnail);
}

export default UploadForm
