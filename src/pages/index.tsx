import React, {useRef, useState} from "react";
import {
    Box, Button, Container, Spacer,
    Stack,
    Textarea, useBoolean, useMediaQuery
} from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import Markdown from "@/component/Markdown";
import Header from "@/component/Header";
import UploadForm from "@/component/UploadForm";
import SaveForm from "@/component/SaveForm";

export default function Home() {
    const [showMarkdown, toggleMarkdown] = useBoolean(false);
    const [content, setContent] = useState("");
    const modalRef = useRef<{
        toggle(): void
    }>(null);
    const saveRef = useRef<{
        toggle(): void
    }>(null);
    const [isLargerThan] = useMediaQuery('(min-width: 1620px)');

    // UploadForm, SaveFormはref登録においてあるだけ
    return(
        <Container maxW={"9xl"} p={"25px"}>
            <UploadForm content={content} ref={modalRef}/>
            <SaveForm content={content} ref={saveRef}/>
            <Header/>
            <Stack display={"flex"} pt={"7vh"} justifyContent={"left"} direction={"row"} spacing={2}>
                <Button colorScheme={"twitter"}
                        variant={"outline"}
                        onClick={() => {
                            if (saveRef.current) saveRef.current.toggle();
                        }}>
                    Save
                </Button>
                <Button colorScheme={"red"}
                        variant={"outline"}
                        onClick={() => {
                            if (modalRef.current) modalRef.current.toggle();
                        }}>
                    Upload
                </Button>
                <Spacer/>
                <Button colorScheme={"teal"}
                        variant={"outline"}
                        onClick={() => toggleMarkdown.toggle()}>{showMarkdown ? "Close" : "Show"}
                </Button>
            </Stack>
            <Stack direction={isLargerThan ? "row" : "column"} pt={"5px"} spacing={5}>
                <Box minW={showMarkdown ? "20cm" : "full"}>
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