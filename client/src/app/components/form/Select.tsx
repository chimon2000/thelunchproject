import { h, FunctionalComponent } from 'preact'

import { Field, Label, Control, Select, Help } from 'bloomer'
import { Field as createField } from 'neoform'
import { FieldValidation } from 'neoform-validation'

const getValidationState = validationStatus => {
    if (validationStatus === false) {
        return 'danger'
    }
    if (validationStatus) {
        return 'success'
    }

    return null
}

interface SelectProps {
    label: string
    name: string
    value?: any
    onChange?: Function
    validate?: Function
    validationMessage?: string
    [index: string]: any
}

const SelectField = ({ label, onChange, children, validate, validationStatus, validationMessage, name, ...props }) => (
    <Field>
        <Label for={name}>
            {label}
            <Control>
                <Select
                    id={name}
                    name={name}
                    onBlur={validate}
                    onChange={e => onChange(e.target.value)}
                    isColor={getValidationState(validationStatus)}
                    {...props}>
                    {children && children}
                </Select>
            </Control>
        </Label>
        {validationStatus === false && <Help isColor={getValidationState(validationStatus)}>{validationMessage}</Help>}
    </Field>
)
export default createField(FieldValidation(SelectField)) as FunctionalComponent<SelectProps>
