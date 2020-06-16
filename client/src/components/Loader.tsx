import { Flex, Modal, ModalOverlay, Spinner } from '@chakra-ui/core';
import React, { Fragment } from 'react';

interface LoaderProps {
    isLoading: boolean
}

const Loader = ({isLoading}: LoaderProps) => (
    <Fragment>
        <Modal isOpen={isLoading}>
            <ModalOverlay>
                <Flex height='100vh' justifyContent='center' alignItems='center'>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Flex>
            </ModalOverlay>
        </Modal>
    </Fragment>
)

export default Loader
