import { useField } from "formik";
import React from "react";
import { FormField, Label } from "semantic-ui-react";
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
  debounce?: number;
}

export default function MyTextArea({ debounce, ...props }: Props) {
  const [field, meta, helpers] = useField(props.name);

  const debounced = useDebouncedCallback((value) => helpers.setValue(value), debounce);

  return (
    <FormField error={meta.touched && Boolean(meta.error)}>
      <label>{props.label}</label>
      <textarea {...field} {...props}
        onChange={e => debounce ? debounced(e.target.value) : helpers.setValue(e.target.value)}
        value={field.value ?? ""} />
      {meta.touched && meta.error ? <Label pointing color="red" content={meta.error} /> : null}
    </FormField>
  );
}