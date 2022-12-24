import { IconTrash } from "../../atoms/Icons/Icons";
import { formatBytes } from "../../../utils/formatBytes";

type fileHeaderProps = {
    file: File;
    onDelete: (file: File) => void;
};

export function FileHeader({ file, onDelete }: fileHeaderProps) {
    return (
        <div className='flex flex-row justify-between gap-3 pb-2'>
            <div>
                <p className='text-sm font-medium break-all'>{file.name}</p>
                <p className='text-sm'>{formatBytes(file.size, 1)}</p>
            </div>
            <div className="relative top-0 right-0" onClick={() => onDelete(file)}>
                <IconTrash size='22' color='stroke-gray-500 dark:stroke-dark-300' fill='' />
            </div>
        </div>
    );
}
