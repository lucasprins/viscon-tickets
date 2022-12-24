import { IconTrash } from "../../atoms/Icons/Icons";
import { formatBytes } from "../../../utils/formatBytes";

type fileHeaderProps = {
  file: File;
  progress?: number;
  onDelete: (file: File) => void;
};

export function FileHeader({ file, onDelete, progress }: fileHeaderProps) {
  return (
    <div className='flex flex-row justify-between gap-3'>
      <div>
        <p className='text-sm font-medium break-all'>{file.name}</p>
        <p className='text-sm'>{formatBytes(file.size, 1)}</p>
      </div>
      {progress === 100 && (
        <div className='relative top-0 right-0' onClick={() => onDelete(file)}>
          <IconTrash size='22' color='stroke-gray-500 dark:stroke-dark-300' fill='' />
        </div>
      )}
    </div>
  );
}
