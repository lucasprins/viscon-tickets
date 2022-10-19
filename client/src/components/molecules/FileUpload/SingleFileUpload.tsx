import { useEffect, useState } from "react";
import { IconImage } from "../../atoms/Icons/Icons";
import { FileHeader } from "./FileHeader";

type SingleFileUploadProps = {
    file: File;
    onDelete: (file: File) => void;
}

export function SingleFileUpload({file, onDelete}: SingleFileUploadProps) {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        async function upload() {
          const url = await uploadFile(file, setProgress);
        }
    
        upload();
      }, []);

    return (
        <div className="flex flex-row p-4 rounded-xl border border-gray-200 dark:border-dark-500 drop-shadow-sm">
            <div className="pr-3">
                <IconImage size='24' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
            </div>
            <div className="flex flex-col w-full">
                <FileHeader file={file} onDelete={onDelete}/>
                <div className="flex flex-row w-full justify-between">
                    <div className="w-11/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-auto mb-auto mr-auto">
                        <div
                        className="bg-primary-600 h-2.5 rounded-full mt-auto mb-auto mr-auto"
                        style={{ width: progress + "%" }}
                        >
                        </div>
                    </div>
                    <span className="text-sm font-medium pl-5">{progress}%</span>
                </div>
            </div> 
        </div>
    )
}

function uploadFile(file: File, onProgress: (percentage: number) => void) {
    const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
    const key = 'docs_upload_example_us_preset';
  
    return new Promise<string>((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        res(resp.secure_url);
      };
      xhr.onerror = (event) => rej(event);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          onProgress(Math.round(percentage));
        }
      };
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', key);
  
      xhr.send(formData);
    });
  }