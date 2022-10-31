import { IconTrash } from "../../atoms/Icons/Icons";

type fileHeaderProps = {
    file: File;
    onDelete: (file: File) => void;
};

export function FileHeader({ file, onDelete }: fileHeaderProps) {
    return (
        <div className='flex flex-row justify-between pb-2'>
            <div>
                <p className=' text-sm font-medium'>{file.name}</p>
                <p className='text-sm'>{file.size} bytes</p>
            </div>
            <div onClick={() => onDelete(file)}>
                <IconTrash size='22' color='stroke-gray-500 dark:stroke-dark-300' fill='' />
            </div>
        </div>
    );
}
