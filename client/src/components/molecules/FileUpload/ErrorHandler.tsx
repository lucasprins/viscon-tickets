import React from "react";
import { FileHeader } from './FileHeader';
import { IconAlert } from "../../atoms/Icons/Icons";
import { FileError } from "react-dropzone";

export interface ErrorHandlerProps {
    file: File;
    onDelete: (file: File) => void;
    errors: FileError[];
}

export function ErrorHandler({file, onDelete, errors}: ErrorHandlerProps) {
    return <React.Fragment>
        <div className='flex flex-row outline-none bg-white dark:bg-dark-700 p-4 rounded-xl border border-gray-200 dark:border-dark-500 shadow-sm'>
            <div className='pr-3'>
              <IconAlert size='26' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
            </div>
            <div className='flex flex-col w-full'>
                <FileHeader file={file} onDelete={onDelete} />
                <div className='flex flex-row w-full justify-between'>
                    <div className='w-11/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-auto mb-auto mr-auto'>
                        <div
                            className=' bg-error-700 h-2.5 rounded-full mt-auto mb-auto mr-auto'
                            style={{ width: 100 + "%" }}
                        ></div>
                    </div>
                    
                    <span className='text-sm font-medium pl-5'>Error</span>
                </div>
                {errors.map(error => (
                    <div><span>{error.message}</span></div>
                ))}
            </div>
        </div>
    </React.Fragment>
}