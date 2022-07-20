import {forwardRef, SetStateAction, useImperativeHandle, useRef, useState} from "react";
import {Button, FormControl, FormLabel, Input, useBoolean} from "@chakra-ui/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/modal";
import {stringToFile} from "@/utils/APIService";

type SaveProps = {
    content: string,
}

const SaveForm = forwardRef<{toggle(): void}, SaveProps>((props, ref) => {
    const [isOpen, toggleOpen] = useBoolean(false);
    const [title, setTitle] = useState("");
    const saveButtonRef = useRef<HTMLAnchorElement>(null);

    useImperativeHandle(ref, () => ({
        toggle: () => {
            toggleOpen.toggle();
            setTitle("");
        }
    }), []);

    return(
        <div>
            <a ref={saveButtonRef} download={`${title}.md`}/>
            <Modal isOpen={isOpen} onClose={toggleOpen.toggle}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>ファイル保存</ModalHeader>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>タイトル</FormLabel>
                            <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}/>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                    <Button isDisabled={!title}
                            variant={"outline"}
                            colorScheme={"twitter"}
                            onClick={() => {
                                if (saveButtonRef.current) {
                                    saveButtonRef.current.href = URL.createObjectURL(stringToFile(title, [props.content]));
                                    saveButtonRef.current.click();
                                }
                            }}>
                        保存
                    </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
});

export default SaveForm;