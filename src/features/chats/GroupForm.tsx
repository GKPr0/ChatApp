import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyTextInput from '../../app/common/form/MyTextInput';
import { GroupFromValues } from '../../app/models/group';


export default function GroupForm() {

  const [group, setGroup] = useState<GroupFromValues>({
    name: '',
    users: [],
  });


  const validationSchema = Yup.object<Record<keyof GroupFromValues, Yup.AnySchema>>({
    name: Yup.string().required("Group name is required").trim(),
    users: Yup.array().min(2, 'At least 2 people must form a group.').of(Yup.string()),

  });

  const options = [
    { key: '1', text: 'Ondra', value: '1' },
    { key: '2', text: 'Tomáš', value: '2' },
    { key: '3', text: 'Jonáš', value: '3' },
    { key: '4', text: 'Martin', value: '4' },
  ]

  return (
    <Formik
      initialValues={{ ...group, error: null }}
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors }) => {
        const castedValues = validationSchema.cast(values)
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Create new group" color="blue" textAlign="center" />
          <MyTextInput name="name" placeholder="Group name" />
          <MySelectInput name="users" placeholder="Users" multiple options={options} />
          <Button loading={isSubmitting} color="blue" content="Create" type="submit" fluid />
        </Form>
      )}
    </Formik>
  );
}
