import { useField } from 'formik';
import React from 'react';
import "./MyCheckBoxInput.css";
import { FormField, Label, Checkbox } from 'semantic-ui-react';

interface Props {
  name: string;
  label: string;
  triState?: boolean;
}

export default function MyCheckBox(props: Props) {
  const [field, meta, helpers] = useField(props.name);


  return (
    <FormField error={meta.touched && Boolean(meta.error)}>
      <Checkbox className='myCheckBoxInput'
        defaultIndeterminate={props.triState}
        checked={field.value ?? false}
        onChange={() => helpers.setValue(!field.value)}
        onBlur={() => helpers.setTouched(true)}
        label={props.label}
      />
      {meta.touched && meta.error ? <Label pointing color="red" content={meta.error} /> : null}
    </FormField>
  );
}
