import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";
import FileService from "../../../services/file-upload/fileService";
import { IconImage } from "../../atoms/Icons/Icons";
import { FileHeader } from "./FileHeader";

type SingleFileUploadProps = {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string, key: string) => void;
};

export function SingleFileUpload({ file, onDelete, onUpload }: SingleFileUploadProps) {
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState<string | undefined>(undefined);

  const handleDeleteFile = () => {
    onDelete(file);
    if (key) {
      FileService.removeFile(key);
    }
  };

  useEffect(() => {
    FileService.uploadFile(file, setProgress).then((res) => {
      setKey(res.Key);
      onUpload(file, res.URL, res.Key);
    });
  }, []);

  return (
    <div className='flex flex-row w-full gap-3 p-4 bg-white border border-gray-200 shadow-sm outline-none dark:bg-dark-700 rounded-xl dark:border-dark-500'>
        <IconImage size='26' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
      <div className='flex flex-col w-full gap-2'>
        <FileHeader file={file} onDelete={handleDeleteFile} progress={progress} />
        {progress < 100 && (
          <div className='flex flex-row justify-between w-full'>
            <div className='w-11/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-auto mb-auto mr-auto'>
              <div
                className='bg-primary-600 h-2.5 transition-all duration-300 ease-in-out rounded-full mt-auto mb-auto mr-auto'
                style={{ width: progress + "%" }}
              ></div>
            </div>
            <span className='pl-5 text-sm font-medium'>{progress}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
