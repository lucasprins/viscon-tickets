import { useField } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone"
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconUpload } from "../../atoms/Icons/Icons";
import { ErrorHandler } from "./ErrorHandler";
import { SingleFileUpload } from "./SingleFileUpload";

type UploadableFile = {
    file: File;
    errors: FileError[];
    url?: string;
}

export function FileDropzone({name}: {name: string}) {
    const [_, __, helpers]  =  useField(name);

    const [files, setFiles] = useState<UploadableFile[]>([]);
    const onDrop = useCallback((accFiles:File[], rejFiles:FileRejection[]) => {
       const mappedAcc = accFiles.map(file => ({file, errors: []}))
       setFiles(curr => [...curr, ...mappedAcc, ...rejFiles]);
    }, []);

    useEffect(() => {
        helpers.setValue(files);
        // helpers.setTouched(true);
    }, [files]);

    function onUpload(file: File, url:string) {
        setFiles((current) => current.map((fileWrapper) => {
            if(fileWrapper.file === file) {
                return {...fileWrapper, url};
            }
            return fileWrapper;
        }));
    }

    function onDelete(file: File) {
        setFiles((current) => current.filter((fileWrapper) => fileWrapper.file !== file));
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg'],
            'video/*': ['.mp4']
        },
        maxSize: 30000 * 1024, // Max 30MB
      });

    return (
        <React.Fragment>
            <div {...getRootProps({ className: "dropzone" })} className="flex outline-none bg-white dark:bg-dark-700 flex-col gap-y-5 text-center py-4 px-6 rounded-xl border border-gray-200 dark:border-dark-500 shadow-sm">         
                <div>
                    <div className="flex justify-center pb-2">
                        <FeaturedIcon type="gray" size="md" icon={<IconUpload size='22' color='stroke-gray-600 dark:stroke-white' fill='' />} />
                    </div>
                    <input {...getInputProps()} />
                    <div className="flex flex-col gap-1">
                        <p className="text-md"><span className=" text-primary-600 dark:text-primary-500 font-semibold">Click to upload</span> or drag and drop</p>
                        <p className=" text-sm dark:text-dark-300">{"PNG, JPG, or MP4 (max. 30MB)"}</p>
                    </div>
                </div>
            </div>

            {files.map((fileWrapper, index) => (
            <div>
            {fileWrapper.errors.length ? (
                <ErrorHandler file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete}/>
            ) : (
                <SingleFileUpload
                onDelete={onDelete}
                onUpload={onUpload}
                key={index}
                file={fileWrapper.file}
                />
            )}
            </div>
        ))}
        </React.Fragment>
    );
}