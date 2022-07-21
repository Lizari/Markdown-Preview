import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay
} from "@chakra-ui/modal";
import {Box, Button, Stack, Tag, TagLabel, Text, useBoolean} from "@chakra-ui/react";
import React, {Dispatch, forwardRef, SetStateAction, useImperativeHandle, useState} from "react";
import {get} from "@/utils/APIService";
import matter from "gray-matter";
import { Article } from "@/entity/Article";

type Props = {
    setArticle: Dispatch<SetStateAction<Article>>
}

const BlogList = forwardRef<{toggle(): void}, Props>((props, ref) => {
    const [isOpen, toggleOpen] = useBoolean(false);
    const [articles, setArticles] = useState<Article[]>([]);

    useImperativeHandle(ref, () => ({
        toggle: async () => {
            toggleOpen.toggle();

            setArticles(await get().then((result) => result.data));
        }
    }), [])

    return(
        <Drawer placement={"left"} isOpen={isOpen} onClose={toggleOpen.toggle}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>Blog List</DrawerHeader>
                <DrawerBody>
                    <Stack>
                        {articles.map((value: Article) => {
                            return (
                                <Box>
                                    <Button onClick={() => {
                                        toggleOpen.toggle();
                                        props.setArticle(value);
                                    }}>{value.title}
                                    </Button>
                                    <Text fontSize={"sm"} color={"gray.500"}>{value.description}</Text>
                                    {value.tags.map((tag: string) => {
                                        return (
                                            <Tag key={tag}
                                                 color={"teal.400"}
                                                 bgColor={"green.100"}
                                                 mr={"3px"}
                                            >
                                                <TagLabel>{tag}</TagLabel>
                                            </Tag>)
                                    })}
                                </Box>
                            )
                        })}
                    </Stack>
                </DrawerBody>
                <DrawerFooter>
                    <Button variant={"outline"} mr={3} onClick={toggleOpen.toggle}>
                        Cancel
                    </Button>
                    <Button colorScheme={"twitter"}>
                        Load
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
});

function base64Decoder(content: string) {
    const buffer = Buffer.from(content, 'base64');
    const obj = buffer.toString('utf8');

    return matter(obj).content;
}

export default BlogList;