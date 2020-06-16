import React, { useState } from "react";
import { Box, Button, CSSReset, Flex, Heading, Stack, ThemeProvider, } from '@chakra-ui/core';
import { FormContext, useForm } from 'react-hook-form';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import { EmploymentItems, initModalInfo, translation } from './appConstants';
import { EFormatItem, EFormField, TFormData, TMessageResponse, TModalInfo } from './appTypes';
import FormElementContainer from '../components/FormElementContainer';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<TModalInfo>({title: '', message: ''});
    const [error, setError] = useState<string>('')
    const { placeholders, modal } = translation;
    const formMethods = useForm<TFormData>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        const formattedData = {...data, [EFormField.employment]: data[EFormField.employment].join(' ')}
        setIsLoading(true)
        fetch('/message', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
            .then(response => response.json())
            .then((data: TMessageResponse) => {
                const chatTitle = data.chatTitle ? data.chatTitle : translation.modal.chatPlaceholder;
                const message = `${modal.message} ${chatTitle}`;
                setModalInfo({
                    title: translation.modal.title,
                    message: message
                })
            })
            .catch((error) => {
                setError(error.toString());
                setModalInfo({
                    title: translation.modal.errorTitle,
                    message: translation.modal.errorMessage
                })
            })
            .finally(() => setIsLoading(false))
    })

    const handleModalClose = () => {
        if (!error) {
            formMethods.reset();
        }
        setModalInfo(initModalInfo);
        setError('');
    }

    return (
        <ThemeProvider>
            <CSSReset />
            <Loader isLoading={isLoading} />
            <Modal
                message={modalInfo.message}
                title={modalInfo.title}
                onClose={handleModalClose}
            />
            <Flex justifyContent='center'>
                <Box width={['100%', '100%', '75%', '800px']} px='15px' mb='48px'>
                    <Heading textAlign='center' as="h1" m='70px 0'>
                        {translation.title}
                    </Heading>
                    <FormContext {...formMethods}>
                        <form onSubmit={handleSubmit}>
                        <Stack spacing={8} shouldWrapChildren={true}>
                            <Input
                                isRequired={true}
                                field={EFormField.name}
                                type='text'
                            />

                            <Textarea
                                isRequired={true}
                                field={EFormField.description}
                            />

                            <Input
                                isRequired={true}
                                field={EFormField.skills}
                                placeholder={placeholders[EFormField.skills]}
                                type='text'
                            />

                            <Select
                                field={EFormField.format}
                                placeholder={placeholders[EFormField.format]}
                                options={[EFormatItem.office, EFormatItem.remote]}
                            />

                            <Checkbox
                                field={EFormField.employment}
                                isRequired={true}
                                items={EmploymentItems}
                            />

                            <Input
                                field={EFormField.link}
                                type='text'
                            />

                            <Input
                                field={EFormField.address}
                                type='text'
                            />

                            <FormElementContainer
                                direction='column'
                                field={EFormField.salary}
                            >
                                <Stack spacing={8} shouldWrapChildren={true}>
                                    <Input
                                        isRequired={true}
                                        field={EFormField.salaryFrom}
                                        placeholder={placeholders[EFormField.salary]}
                                        type='number'
                                    />

                                    <Input
                                        isRequired={true}
                                        field={EFormField.salaryTo}
                                        placeholder={placeholders[EFormField.salary]}
                                        type='number'
                                    />
                                </Stack>
                            </FormElementContainer>

                            <Input
                                isRequired={true}
                                field={EFormField.contacts}
                                type='text'
                            />

                            <Flex justifyContent='center'>
                                <Button
                                    size='lg'
                                    type='submit'
                                    variantColor='blue'
                                >
                                    {translation.submit}
                                </Button>
                            </Flex>
                        </Stack>
                    </form>
                    </FormContext>
                </Box>
            </Flex>
        </ThemeProvider>
    )
}

export default App;
