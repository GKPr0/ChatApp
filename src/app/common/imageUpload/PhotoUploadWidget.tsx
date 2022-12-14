import React, { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoCropperWidget from "./PhotoCropperWidget";
import PhotoDropZoneWidget from "./PhotoDropZoneWidget";

interface Props {
    loading: boolean,
    uploadPhoto : (file: Blob) => void
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
    const [files, setFiles] = useState<any[]>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (
        <Grid stackable container padded relaxed columns={3}>
            <Grid.Column textAlign="center">
                <Header color="blue" sub content="Step 1 - Add Photo" />
                <PhotoDropZoneWidget setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column textAlign="center">
                <Header color="blue" sub content="Step 2 - Resize image" />
                {files && files.length > 0 && (
                    <PhotoCropperWidget setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column textAlign="center">
                <Header color="blue" sub content="Step 3 - Preview & Upload" />
                {files && files.length > 0 &&
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div className="img-preview" style={{ minHeight: 200, minWidth: 200, overflow: "hidden"}} />
                        <Button.Group widths={2}>
                            <Button positive icon="check" onClick={onCrop} loading={loading} />
                            <Button icon="close" onClick={() => setFiles([])} disabled={loading}/>
                        </Button.Group>
                    </div>
                }
            </Grid.Column>
        </Grid>
    )
}