import React, {useRef, useState} from "react";
import {Box, Button, Container, Spacer, Stack, Textarea, useBoolean, useMediaQuery} from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import Markdown from "@/component/Markdown";
import Header from "@/component/Header";
import UploadForm from "@/component/UploadForm";
import SaveForm from "@/component/SaveForm";
import BlogList from "@/component/BlogList";

export default function Home() {
    const [showMarkdown, toggleMarkdown] = useBoolean(false);
    const [content, setContent]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>("");
    const modalRef = useRef<{
        toggle(): void
    }>(null);
    const saveRef = useRef<{
        toggle(): void
    }>(null);
    const loadRef = useRef<{
    toggle(): void
    }>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isNotSmallScreen] = useMediaQuery('(min-width: 1100px)');

    return(
        <Container maxW={"8xl"} p={"25px"}>
            <input type={"file"}
                   accept={".md"}
                   multiple={false}
                   style={{display: "none"}}
                   ref={inputRef}
                   onInput={(e) => {
                       const { target } = e;

                       if (!(target instanceof HTMLInputElement)) return;
                       if (target.files && target.files.length > 0) {
                           const file = target.files[0];
                           const reader = new FileReader();

                           reader.onload = () => {
                               const { result } = reader;

                               if (result && !(result instanceof ArrayBuffer)) {
                                   console.log(result)
                                   setContent(result);
                               }
                           }
                           reader.readAsText(file, "utf-8");
                       }
                       // clear files
                       target.value = "";
                   }}/>
            <UploadForm content={content} ref={modalRef}/>
            <SaveForm content={content} ref={saveRef}/>
            <BlogList setContent={setContent} ref={loadRef}/>
            <Header/>
            <Stack display={"flex"} pt={"7vh"} justifyContent={"left"} direction={"row"} spacing={2}>
                <Button colorScheme={"twitter"}
                        variant={"outline"}
                        onClick={() => saveRef.current?.toggle()}>
                    Save
                </Button>
                <Button colorScheme={"twitter"}
                        variant={"outline"}
                        onClick={() => inputRef.current?.click()}>
                    Load
                </Button>
                <Button colorScheme={"twitter"}
                        variant={"outline"}
                        onClick={() => loadRef.current?.toggle()}>
                    Load from API
                </Button>
                <Spacer/>
                <Button colorScheme={"red"}
                        variant={"outline"}
                        onClick={() => modalRef.current?.toggle()}>
                    Upload
                </Button>
                <Button colorScheme={"teal"}
                        variant={"outline"}
                        onClick={() => toggleMarkdown.toggle()}>{showMarkdown ? "Hide" : "Show"}
                </Button>
            </Stack>
            <Stack direction={isNotSmallScreen ? "row" : "column"} pt={"15px"} spacing={5}>
                <Box minW={showMarkdown ? "16cm" : "full"}>
                    <Textarea placeholder={"Markdownを入力"}
                              size={"md"}
                              resize={"none"}
                              overflow={"hidden"}
                              minRows={20}
                              margin={"auto"}
                              as={ResizeTextarea}
                              value={content}
                              onChange={(e) => setContent(e.target.value)}/>
                </Box>
                {showMarkdown ? <Box border={"1px solid"}
                                     borderRadius={"md"}
                                     borderColor={"inherit"}
                                     p={"10px"}
                                     w={"3xl"}>
                                    <Markdown content={content}/>
                                </Box> : ""}
            </Stack>
        </Container>
    )
}