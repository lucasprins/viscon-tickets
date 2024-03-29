import { useField } from "formik";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconUpload } from "../../atoms/Icons/Icons";
import { ErrorHandler } from "./ErrorHandler";
import { SingleFileUpload } from "./SingleFileUpload";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAppContext } from "../../../utils/hooks";

let currentId = 0;
var translations = require("../../../translations/allTranslations.json");

function getNewId() {
  return ++currentId;
}

export type UploadableFile = {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
  key?: string;
};

export function FileDropzone({ files, setFiles }: { files: UploadableFile[], setFiles: React.Dispatch<React.SetStateAction<UploadableFile[]>> }) {
  const { appState } = useAppContext();
  const language = appState.language;
  const [animationParent] = useAutoAnimate<HTMLUListElement>();

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr: UploadableFile[]) => [...curr, ...mappedAcc, ...mappedRej]);
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
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "video/mp4": [".mp4"],
    },
    maxSize: 30000 * 1024, // Max 30MB
  });

  let style = "";
  if (isFocused) {
    style = "border-primary-600 dark:border-primary-500";
  } else if (isDragAccept) {
    style = "border-primary-600 dark:border-primary-500";
  } else if (isDragReject) {
    style = "border-error-600 dark:border-error-500 cursor-disabled";
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
              <span className='font-semibold text-primary-600 dark:text-primary-500'>{translations[language].add_attachments_text_upload_part1}</span> {translations[language].add_attachments_text_upload_part2}
            </p>
            <p className='text-sm dark:text-dark-300'>{translations[language].add_attachments_dataTypes_uploads}</p>
          </div>
        </div>
      </div>

      <ul ref={animationParent} className="flex flex-col gap-3">
        {files.map(
          (fileWrapper) =>
            fileWrapper.errors.length === 0 && (
              <li key={fileWrapper.id} className='w-full'>
                <SingleFileUpload onDelete={onDelete} onUpload={onUpload} file={fileWrapper.file} />
              </li>
            )
        )}
      </ul>
    </div>
  );
}
