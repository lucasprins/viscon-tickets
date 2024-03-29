
/**
 * Takes a number(bytes) and turns it into human readable bytes.
 * @param bytes - the raw byte value.
 * @param decimals - optional decimal value.
 * @returns human readable byte size.
 */
export function formatBytes(bytes: number, decimals?: number) {
    if(bytes === 0) return '0 Bytes';
    let k = 1024
    let dm = decimals || 2
    let  sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}