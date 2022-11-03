import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';
import { UserFormValues } from '../../app/models/user';

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    const { register } = userStore;

    const validation = Yup.object<Record<keyof UserFormValues, Yup.AnySchema>>({
        displayName: Yup.string().required(),
        username: Yup.string().required("Username is required.").trim(),
        email: Yup.string().required("Email is required.").email().trim(),
        password: Yup.string().required("Password is required.").min(8),
    });

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', error: null }}
            validationSchema={validation}
            onSubmit={(values, { setErrors }) => {
                const castedValues = validation.cast(values);
                register(castedValues).catch((error) => setErrors({ error }))
            }}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Register to ChatMeIn" color="blue" textAlign="center" />
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage name="error" render={() => <ValidationErrors errors={errors.error} />} />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content="Register" type="submit" fluid />
                </Form>
            )}
        </Formik>
    );
});
