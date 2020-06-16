import React from 'react';
import { Select as SelectComponent } from '@chakra-ui/core';
import FormElementContainer from './FormElementContainer';
import { EFormatItem, EFormField, TFormData } from '../app/appTypes';
import { useFormContext } from 'react-hook-form';
import { translation } from '../app/appConstants';

interface SelectProps {
    field: keyof TFormData
    options: EFormatItem[]
    placeholder?: string
}

const Select = (props: SelectProps) => {
    const { register } = useFormContext<TFormData>();
    const titles = translation[EFormField.format];

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
                {
                    props.options.map(option => (
                        <option value={titles[option]} key={option}>
                            {titles[option]}
                        </option>
                    ))
                }
            </SelectComponent>
        </FormElementContainer>
    )
}

export default Select
