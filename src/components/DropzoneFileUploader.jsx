import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Icon from './Icon';

const baseStyle = {
    borderWidth: 1,
    borderRadius: 1,
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out',
    borderStyle: 'dashed',
    borderColor: '#0C0D15',
    margin: '0 auto'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function DropzoneFileUploader(props) {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
    });

    const style = useMemo(() => ({

        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <div key={file.name}>
            <img
                src={file.preview}
                alt={file.name}
            />
        </div>
    ));

    // clean up
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section>
            <div className='d-flex justify-content-center align-items-center w-75' {...getRootProps({ style })}>
                <input {...getInputProps()} accept="image/png, image/jpeg, application/pdf"></input>
                <label className='rounded text-center' id='idFile' style={{ cursor: 'pointer', backgroundColor: '#0C0D15', width: '100%', color: 'rgb(142, 139, 139)', padding: '10px' }}>
                    <Icon type={'solid'} symbol={'cloud-arrow-up'} />
                    <br />PDF, JPEG, PNG <br />
                    <span className='text-primary'>Drag and drop your images here or browse</span>
                </label>
            </div>

            <aside>
                {thumbs}
            </aside>
        </section>
    )
}

export default DropzoneFileUploader;