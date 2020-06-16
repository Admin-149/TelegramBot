import React from 'react';
import {
    Button,
    Modal as ModalComponent,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/core';
import { translation } from '../app/appConstants';

interface TModalProps {
    title: string
    message: string
    onClose: () => void
}

const Modal = (props: TModalProps) => (
    <ModalComponent
        isCentered
        isOpen={!!props.message}
        onClose={props.onClose}
    >
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton />
            {
                props.title &&
                <ModalHeader>{props.title}</ModalHeader>
            }
            <ModalBody>
                {props.message}
            </ModalBody>
            <ModalFooter justifyContent='flex-start'>
                <Button variantColor="blue" onClick={props.onClose}>
                    {translation.modal.close}
                </Button>
            </ModalFooter>
        </ModalContent>
    </ModalComponent>
)

export default Modal
