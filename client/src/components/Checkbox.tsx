import React from 'react';
import FormElementContainer from './FormElementContainer';
import { Checkbox as CheckboxComponent } from '@chakra-ui/core';
import { useFormContext } from 'react-hook-form';
import { EEmploymentItem, EFormField, TFormData } from '../app/appTypes';
import { translation } from '../app/appConstants';

interface CheckboxProps {
    field: keyof TFormData
    items: EEmploymentItem[]
    isRequired?: boolean
}


const Checkbox = (props: CheckboxProps) => {
    const { register, getValues, errors } = useFormContext<TFormData>();
    const titles = translation[EFormField.employment];

    const validateEmployment = () => {
        const values = getValues({ nest: true })[EFormField.employment];
        return values.filter(value => value).length >= 1
    }

    return (
        <FormElementContainer
            errorMessage={translation.errors.atLeastOne}
            isInvalid={!!errors[props.field]}
            isRequired={props.isRequired}
            field={props.field}
            direction='column'
        >
            {
                props.items.map(item => (
                    <CheckboxComponent
                        name={EFormField.employment}
                        id={item}
                        key={item}
                        value={titles[item]}
                        ref={register({ validate: validateEmployment })}
                    >
                        {titles[item]}
                    </CheckboxComponent>
                ))
            }
        </FormElementContainer>
    )
}

export default Checkbox
