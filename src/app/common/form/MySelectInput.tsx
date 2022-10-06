import { useField } from 'formik';
import React, { useEffect } from 'react';
import { FormField, Label, Select } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
    multiple?: boolean;
    onChange?: (value: any) => void;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    useEffect(() => {
        helpers.setValue(props.multiple ? [] : "");
    }, [props.options, props.multiple]);

    return (
        <FormField error={meta.touched && Boolean(meta.error)}>
            <label>{props.label}</label>
            <Select
                clearable
                multiple={props.multiple}
                search
                options={props.options}
                value={field.value ?? []}
                onChange={(e, data) => {
                    helpers.setValue(data.value)
                    if (props.onChange)
                        props.onChange(data.value);
                }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? <Label pointing color="red" content={meta.error} /> : null}
        </FormField>
    );
}
