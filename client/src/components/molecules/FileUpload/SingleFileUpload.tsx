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
    <div className='flex flex-row w-full p-4 bg-white border border-gray-200 shadow-sm outline-none dark:bg-dark-700 rounded-xl dark:border-dark-500'>
      <div className='pr-3'>
        <IconImage size='26' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
      </div>
      <div className='flex flex-col w-full'>
        <FileHeader file={file} onDelete={handleDeleteFile} />
        <div className='flex flex-row justify-between w-full'>
          <div className='w-11/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-auto mb-auto mr-auto'>
            <div
              className='bg-primary-600 h-2.5 rounded-full mt-auto mb-auto mr-auto'
              style={{ width: progress + "%" }}
            ></div>
          </div>
          <span className='pl-5 text-sm font-medium'>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

// function uploadFile(file: File, onProgress: (percentage: number) => void) {
//     const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
//     const key = "docs_upload_example_us_preset";

//     return new Promise<string>((res, rej) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", url);

//         xhr.onload = () => {
//             const resp = JSON.parse(xhr.responseText);
//             res(resp.secure_url);
//         };
//         xhr.onerror = (event) => rej(event);
//         xhr.upload.onprogress = (event) => {
//             if (event.lengthComputable) {
//                 const percentage = (event.loaded / event.total) * 100;
//                 onProgress(Math.round(percentage));
//             }
//         };

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", key);

//         xhr.send(formData);
//     });
// }
