import React, { useCallback, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone"
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconUpload } from "../../atoms/Icons/Icons";
import { SingleFileUpload } from "./SingleFileUpload";

type UploadableFile = {
    file: File;
    errors: FileError[];
}

export function FileDropzone() {
    
    const [files, setFiles] = useState<UploadableFile[]>([]);
    const onDrop = useCallback((accFiles:File[], rejFiles:FileRejection[]) => {
       const mappedAcc = accFiles.map(file => ({file, errors: []}))
       setFiles(curr => [...curr, ...mappedAcc, ...rejFiles]);
    }, []);

    function onDelete(file: File) {
        setFiles((current) => current.filter((fileWrapper) => fileWrapper.file !== file));
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <React.Fragment>
            <div {...getRootProps({ className: "dropzone" })} className="flex flex-col gap-y-5 text-center py-4 px-6 rounded-xl border border-gray-200 dark:border-dark-500 drop-shadow-sm">         
                <div>
                    <div className="flex justify-center pb-2">
                        <FeaturedIcon type="gray" size="sm" icon={<IconUpload size='22' color='stroke-gray-600' fill='fill-gray-50' />} />
                    </div>
                    <input {...getInputProps()} />
                    <div className="flex flex-col gap-1">
                        <p className="text-sm"><span className=" text-primary-700 font-semibold">Click to upload</span> or drag and drop</p>
                        <p className=" text-xs">{"PNG, JPG, or MP4 (max. 30MB)"}</p>
                    </div>
                </div>
            </div>

        {files.map((fileWrapper, index) => (
            <SingleFileUpload onDelete={onDelete} key={index} file={fileWrapper.file}/>
        ))}
        </React.Fragment>
    );
}