import React, {useRef, useState} from "react";
import {
    Box, Button, Container,
    Stack,
    Textarea, useBoolean, useMediaQuery
} from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import Markdown from "@/component/Markdown";
import Header from "@/component/Header";
import UploadForm from "@/component/UploadForm";

export default function Home() {
    const [showMarkdown, toggleMarkdown] = useBoolean(false);
    const [content, setContent] = useState("");
    const modalRef = useRef<{
        toggle(): void
    }>(null);
    const [isLargerThanHD] = useMediaQuery('(min-width: 1720px)');

    const modalOpen = () => {
        if (modalRef.current) modalRef.current?.toggle();
    }

    return(
        <Container maxW={"9xl"} p={"25px"}>
            <UploadForm content={content} ref={modalRef}/>
            <Header/>
            <Stack pt={"7vh"} justify={"right"} direction={"row"} spacing={2}>
                <Button colorScheme={"red"}
                        variant={"outline"}
                        onClick={() => modalOpen()}>
                    Upload
                </Button>
                <Button colorScheme={"teal"}
                        variant={"outline"}
                        onClick={() => toggleMarkdown.toggle()}>{showMarkdown ? "Close" : "Show"}
                </Button>
            </Stack>
            <Stack direction={isLargerThanHD ? "row" : "column"} pt={"5px"} spacing={5}>
                <Box minW={showMarkdown ? "4xl" : "full"}>
                    <Textarea placeholder={"Markdownを入力"}
                              size={"md"}
                              isFullWidth={true}
                              resize={"none"}
                              overflow={"hidden"}
                              minRows={30}
                              as={ResizeTextarea}
                              onChange={(e) => setContent(e.target.value)}/>
                </Box>
                {showMarkdown ? <Box border={"1px"}
                                 borderRadius={"md"}
                                 borderColor={"whiteAlpha.300"}
                                 p={"10px"}
                                 maxW={"full"}>
                                <Markdown content={content}/>
                            </Box> : ""}
            </Stack>
        </Container>
    )
}