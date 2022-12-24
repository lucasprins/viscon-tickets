import { useField } from "formik";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconUpload } from "../../atoms/Icons/Icons";
import { ErrorHandler } from "./ErrorHandler";
import { SingleFileUpload } from "./SingleFileUpload";

let currentId = 0;

function getNewId() {
  return ++currentId;
}

type UploadableFile = {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
  key?: string;
};

export function FileDropzone() {
  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  function onUpload(file: File, url: string, key: string) {
    setFiles((current) =>
      current.map((fileWrapper) => {
        if (fileWrapper.file === file) {
          return { ...fileWrapper, url, key };
        }
        return fileWrapper;
      })
    );
  }

  function onDelete(file: File) {
    setFiles((current) => current.filter((fileWrapper) => fileWrapper.file !== file));
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "video/*": [".mp4"],
    },
    maxSize: 30000 * 1024, // Max 30MB
  });

  useEffect(() => {
    console.log(files);
  }, [files]);

  let style = "";
  if (isFocused) {
    style = "border-primary-600";
  } else if (isDragAccept) {
    style = "border-primary-600";
  } else if (isDragReject) {
    style = "border-error-600 cursor-disabled";
  } else {
    style = "border-gray-200 dark:border-dark-500";
  }

  return (
    <div className='flex flex-col w-full gap-4'>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`${style} flex flex-col w-full px-6 py-4 text-center bg-white border-2 border-dashed outline-none dark:bg-dark-700 gap-y-4 rounded-xl dark:border-dark-500`}
      >
        <div>
          <div className='flex justify-center pb-2'>
            <FeaturedIcon
              type='gray'
              size='md'
              icon={<IconUpload size='22' color='stroke-gray-600 dark:stroke-white' fill='' />}
            />
          </div>
          <input {...getInputProps()} />
          <div className='flex flex-col gap-1'>
            <p className='text-md'>
              <span className='font-semibold text-primary-600 dark:text-primary-500'>Click to upload</span> or drag and
              drop
            </p>
            <p className='text-sm dark:text-dark-300'>{"PNG, JPG, or MP4 (max. 30MB)"}</p>
          </div>
        </div>
      </div>

      {files.map(
        (fileWrapper) =>
          fileWrapper.errors.length === 0 && (
            <div key={fileWrapper.id} className='w-full'>
              <SingleFileUpload onDelete={onDelete} onUpload={onUpload} file={fileWrapper.file} />
            </div>
          )
      )}
    </div>
  );
}
