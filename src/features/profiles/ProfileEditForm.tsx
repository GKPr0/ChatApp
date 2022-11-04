import { Formik, Form } from "formik";
import React, { useState } from "react"; 
import { Button, } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { ProfileFormValues } from "../../app/models/profile";

interface Props{
    setEditMode: (editMode: boolean) => void;
}

export default function ProfileEditForm({ setEditMode }: Props) {
  
    const {profileStore: {profile, editProfile}} = useStore();

    const [editedProfile, setEditedProfile] = useState<ProfileFormValues>({
        username: profile?.username!,
        displayName: profile?.displayName!,
        bio: profile?.bio,
      });

    const validationSchema = Yup.object<Record<keyof ProfileFormValues, Yup.AnySchema>>({
        username: Yup.string().required("Username is required.").trim(),
        displayName: Yup.string().required("Display Name is required.").trim(),
        bio: Yup.string().notRequired(),
    });

    function handleFormSubmit(values: any) {
        const castedValues = validationSchema.cast(values)
        editProfile(castedValues).then(() => setEditMode(false))
    }
 
    return (
        <Formik
            initialValues = {{...editedProfile, error: null}}
            onSubmit = {handleFormSubmit}
            validationSchema = {validationSchema}
        >
            {({ isValid, isSubmitting, dirty }) => (
                <Form className="ui form">
                    
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextArea placeholder='Bio' name='bio' rows={10} />
                    
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        floated="right" 
                        positive 
                        type="submit" 
                        content="Update profile" />
                </Form>
            )}
        </Formik>
    )
}