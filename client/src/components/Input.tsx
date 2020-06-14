import { Input as InputComponent } from '@chakra-ui/core';
import React from 'react';
import FormElementContainer from './FormElementContainer';
import { useFormContext } from 'react-hook-form';
import { TFormData } from '../app/appTypes';
import { translation } from '../app/appConstants';

interface InputProps {
    field: keyof TFormData
    isRequired?: boolean
    placeholder?: string
    type: 'number' | 'text'
}

const Input = (props: InputProps) => {
    const { register, errors } = useFormContext<TFormData>();
    const validationOptions = props.isRequired ? { required: true } : {};

    return (
        <FormElementContainer
            errorMessage={translation.errors.required}
            isInvalid={!!errors[props.field]}
            isRequired={props.isRequired}
            field={props.field}
        >
            <InputComponent
                name={props.field}
                id={props.field}
                placeholder={props.placeholder}
                ref={register(validationOptions)}
                type={props.type}
            />
        </FormElementContainer>
    )
}

export default Input
