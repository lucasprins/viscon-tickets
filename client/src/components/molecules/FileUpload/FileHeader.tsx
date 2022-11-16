import { IconTrash } from "../../atoms/Icons/Icons";
import { formatBytes } from "../../../utils/formatBytes";

type fileHeaderProps = {
    file: File;
    onDelete: (file: File) => void;
};

export function FileHeader({ file, onDelete }: fileHeaderProps) {
    return (
        <div className='flex flex-row justify-between pb-2'>
            <div>
                <p className=' text-sm font-medium'>{file.name}</p>
                <p className='text-sm'>{formatBytes(file.size, 1)}</p>
            </div>
            <div onClick={() => onDelete(file)}>
                <IconTrash size='22' color='stroke-gray-500 dark:stroke-dark-300' fill='' />
            </div>
        </div>
    );
}
