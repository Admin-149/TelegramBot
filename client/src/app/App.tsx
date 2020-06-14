import React from "react";
import { Box, Button, CSSReset, Flex, Heading, Stack, ThemeProvider, } from '@chakra-ui/core';
import { FormContext, useForm } from 'react-hook-form';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import { EmploymentItems } from './appConstants';
import { EFormatItem, EFormField, TFormData } from './appTypes';
import translation from '../translation.json';
import FormElementContainer from '../components/FormElementContainer';

const App = () => {
    const { placeholders } = translation;
    const formMethods = useForm<TFormData>();

    const onSubmit = formMethods.handleSubmit((data) => {
        console.log('submit', data);
    })

    return (
        <ThemeProvider>
            <CSSReset />
            <Flex justifyContent='center'>
                <Box width={['100%', '100%', '75%', '800px']} px='15px' mb='48px'>
                    <Heading textAlign='center' as="h1" m='70px 0'>
                        {translation.title}
                    </Heading>
                    <FormContext {...formMethods}>
                        <form onSubmit={onSubmit}>
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
                            >
                                <option value={EFormatItem.office}>
                                    {translation[EFormField.format][EFormatItem.office]}
                                </option>
                                <option value={EFormatItem.remote}>
                                    {translation[EFormField.format][EFormatItem.remote]}
                                </option>
                            </Select>

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
