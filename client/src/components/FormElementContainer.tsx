import { Flex, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/core';
import React, { ReactNode } from 'react';
import { translation } from '../app/appConstants';
import { EFormField } from '../app/appTypes';

export interface FormElementContainerProps{
    children: ReactNode
    direction?: 'column' | 'row'
    errorMessage?: string
    isInvalid?: boolean
    isRequired?: boolean
    field: EFormField
}

const FormElementContainer = (props: FormElementContainerProps) => {
    const label = translation.labels[props.field];

    return (
        <FormControl isInvalid={props.isInvalid} flexDirection={props.direction ?? 'row'}>
            <Flex
                alignItems={props.direction === 'column' ? undefined : 'center'}
                direction={props.direction}
            >
                <FormLabel
                    // @ts-ignore
                    isRequired={props.isRequired}
                    width={props.direction === 'column' ? undefined : '35%'}
                    htmlFor={props.field}
                    marginBottom={props.direction === 'column' ? undefined : '0'}
                    padding={props.direction === 'column' ? undefined : '0'}
                >
                    {label}
                </FormLabel>
                <Flex
                    flexDirection='column'
                    position='relative'
                    width='100%'
                >
                    {props.children}
                    {
                        props.errorMessage &&
                        <FormErrorMessage
                            position={'absolute'}
                            top={'100%'}
                        >
                            {props.errorMessage}
                        </FormErrorMessage>
                    }
                </Flex>
            </Flex>
        </FormControl>
    )
}

export default FormElementContainer
