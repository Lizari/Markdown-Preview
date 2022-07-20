import {Heading, HStack, IconButton, Spacer, useColorMode} from "@chakra-ui/react";
import {FaMoon, FaSun} from "react-icons/fa";
import React from "react";

const Header: React.FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    return(
        <HStack>
            <Heading>Markdown Viewer</Heading>
            <Spacer/>
            <IconButton
                icon={colorMode == "dark" ? <FaMoon size={"32px"}/>: <FaSun size={"32px"}/>}
                size={"32px"}
                bg={"none"}
                _focus={{_focus: "none"}}
                aria-label={"Color mode switch"}
                onClick={() => toggleColorMode()}/>
        </HStack>
    )
}

export default Header;