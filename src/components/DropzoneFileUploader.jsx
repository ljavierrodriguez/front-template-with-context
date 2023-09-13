import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Icon from './Icon';

const baseStyle = {
    borderWidth: 1,
    borderRadius: 1,
    color: '#0C0D15',
    transition: 'border .3s ease-in-out',
    borderStyle: 'solid',
    borderColor: '#0C0D15',
    margin: '0 auto',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const activeStyle = {
    borderColor: '#2196f3',
};

const acceptStyle = {
    borderColor: '#00e676',
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function DropzoneFileUploader({ onFileDrop, fileReference }) {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
    
        // Pass the file data to the parent component
        onFileDrop(acceptedFiles, fileReference);
      }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png, application/pdf'
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        backgroundImage: files.length > 0 ? `url(${files[0].preview})` : 'none',
      }), [isDragActive, isDragReject, isDragAccept, files]);

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
                <label className='rounded text-center' id='idFile' style={{ cursor: 'pointer', width: '100%', color: 'rgb(142, 139, 139)', padding: '10px', height: "100px", backgroundColor: files.length > 0 ? 'rgba(12, 13, 21, 0.5)' : '#0C0D15' }}>
                    {files.length > 0 ? "" : <><Icon type={'solid'} symbol={'cloud-arrow-up'} /> <br /> {"PDF, JPEG, PNG"} <br /> <span className='text-primary'>Drag and drop your images here or browse</span></>}
                </label>
            </div>
            {files.length > 0 ? <span className='text-secondary d-flex justify-content-center align-items-center p-1'>{files[0].name}</span> : ""}
        </section>
    )
}

export default DropzoneFileUploader;