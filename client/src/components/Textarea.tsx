import { Textarea as TextareaComponent } from '@chakra-ui/core';
import React from 'react';
import FormElementContainer from './FormElementContainer';
import { useFormContext } from 'react-hook-form';
import { TFormData } from '../app/appTypes';
import { translation } from '../app/appConstants';

interface TextareaProps {
    field: keyof TFormData
    isRequired?: boolean
    placeholder?: string
}

const Textarea = (props: TextareaProps) => {
    const { register, errors } = useFormContext<TFormData>();
    const validationOptions = props.isRequired ? { required: true } : {};

    return (
        <FormElementContainer
            errorMessage={translation.errors.required}
            isRequired={props.isRequired}
            isInvalid={!!errors[props.field]}
            field={props.field}
            direction={'column'}
        >
            <TextareaComponent
                name={props.field}
                id={props.field}
                placeholder={props.placeholder}
                ref={register(validationOptions)}
                type='text'
                minHeight='150px'
            />
        </FormElementContainer>
    )
}

export default Textarea;
