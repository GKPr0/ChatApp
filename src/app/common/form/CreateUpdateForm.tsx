import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import ValidationErrors from "../../../features/errors/ValidationErrors";
import { useStore } from "../../stores/store";

interface Props {
  id?: string;
  title: string;
  initialValues: any;
  validationSchema: any;
  handleFormSubmit: (values: any) => Promise<any>;
  children: React.ReactNode;
}

export default observer(function CreateUpdateForm({ id, title, initialValues, validationSchema, handleFormSubmit, children }: Props) {
  const { modalStore } = useStore()

  return (
    <Formik
      initialValues={{ ...initialValues, error: [''] }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors }) =>
        handleFormSubmit(values)
          .then(modalStore.closeModal)
          .catch((error: string[]) => {
            console.log(error)
            setErrors({ error });
          })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off" >
          < Header as="h2"
            content={(id ? "Update " : "Create ") + title}
            color={id ? "blue" : "green"}
            textAlign="center" />

          {children}

          <ErrorMessage
            name="error"
            render={() => <ValidationErrors errors={errors.error} />} />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            color={id ? "blue" : "green"}
            icon={id ? "pencil" : "plus"}
            content={id ? "Update" : "Add"}
            fluid
            type="submit" />
        </Form>
      )}
    </Formik >
  )
})