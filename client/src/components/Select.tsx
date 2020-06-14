import React, { ReactNode } from 'react';
import { Select as SelectComponent } from '@chakra-ui/core';
import FormElementContainer from './FormElementContainer';
import { TFormData } from '../app/appTypes';
import { useFormContext } from 'react-hook-form';

interface SelectProps {
    children: ReactNode
    field: keyof TFormData
    placeholder?: string
}

const Select = (props: SelectProps) => {
    const { register } = useFormContext<TFormData>();

    return (
        <FormElementContainer
            field={props.field}
        >
            <SelectComponent
                name={props.field}
                id={props.field}
                placeholder={props.placeholder}
                ref={register}
            >
                {props.children}
            </SelectComponent>
        </FormElementContainer>
    )
}

export default Select
