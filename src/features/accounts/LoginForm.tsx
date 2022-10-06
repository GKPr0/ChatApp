import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { UserFormValues } from '../../app/models/user';

export default observer(function LoginForm() {
    const { userStore } = useStore();
    const { login } = userStore;

    const validationSchema = Yup.object<Record<keyof UserFormValues, Yup.AnySchema>>({
        email: Yup.string().email().required("E-mail is required").trim(),
        password: Yup.string().min(8).required("Password is required."),
        username: Yup.string().notRequired(),
    });

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            validationSchema={validationSchema}
            onSubmit={(values, { setErrors }) => {
                const castedValues = validationSchema.cast(values)
                login(castedValues).catch((_) => setErrors({ error: 'Invalid Credentials' }))
            }}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Login to ChatMeIn" color="blue" textAlign="center" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage name="error" render={() => <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />} />
                    <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
                </Form>
            )}
        </Formik>
    );
});
