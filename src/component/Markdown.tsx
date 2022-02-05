import React from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {
    vs,
    vscDarkPlus
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import {
    Code,
    Divider,
    Image,
    Link,
    ListItem,
    OrderedList,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr, UnorderedList, useColorMode
} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

const Markdown: React.VFC<{ content: string }> = (props) => {
    const { colorMode } = useColorMode();
    return(
        <ReactMarkdown children={props.content}
                       remarkPlugins={[
                           [remarkGfm, { singleTilde: false }],
                           remarkBreaks
                       ]}
                       components={{
                           code: ({node, inline, className, children, ...props}) => {
                               const filename = className ? className.split(":")[1] : "";
                               const match = /language-(\w+)/.exec(className || '');
                               const inlineName = filename !== null ? filename + "\n\n" : "";
                               return !inline && match ? (
                                       <SyntaxHighlighter style={colorMode == "dark" ? vscDarkPlus : vs}
                                                          language={match[1]}
                                                          PreTag={"div"}
                                                          {...props}>
                                           {String(inlineName + children).replace(/\n$/, "")}
                                       </SyntaxHighlighter>
                               ) : <Code className={className} {...props}>{children}</Code>
                           },
                           li: (props) => {
                               return <ListItem fontSize={{base: "16px", md: "17px"}}>{props.children}</ListItem>
                           },
                           blockquote: (props) => {
                               return <Code p={2}>{props.children}</Code>
                           },
                           p: (props) => {
                               return <Text fontSize={{base: "16px", md: "17px"}}>{props.children}</Text>;
                           },
                           h2: (props) => {
                               return <Text fontWeight={"extrabold"}
                                            fontSize={{base: "35px", md: "45px", xl: "50px"}}>{props.children}</Text>;
                           },
                           h3: (props) => {
                               return <Text fontWeight={"semibold"}
                                            fontSize={{base: "20px", md: "25px", xl: "35px"}}>{props.children}</Text>;
                           },
                           hr: () => {
                               return <Divider orientation={"horizontal"} borderColor={"gray"}/>
                           },
                           strong: (props) => {
                               return <Text fontWeight={"semibold"}
                                            fontSize={{sm: "16px", md: "18px"}}>{props.children}</Text>
                           },
                           tr: (props) => {
                               return <Tr>{props.children}</Tr>
                           },
                           td: (props) => {
                               return <Td>{props.children}</Td>
                           },
                           th: (props) => {
                               return <Th>{props.children}</Th>
                           },
                           a: (props) => {
                               return (
                                   <Link color={"teal.600"} href={props.href} isExternal>
                                       {props.children}<ExternalLinkIcon mx={"3px"} mb={"4px"}/>
                                   </Link>
                               )
                           },
                           ul: UnorderedList,
                           ol: OrderedList,
                           img: Image,
                           table: Table,
                           thead: Thead,
                           tbody: Tbody,
                       }
                       }
                       skipHtml/>
    );
}

export default Markdown;