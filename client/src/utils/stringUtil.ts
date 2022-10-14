export const getInitials = (name: string): string  => {
    const parts: string[] = name.split(" ");
    console.log(parts);
    let initials: string = "";
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== "") {
            initials += parts[i][0];
        }
    }
    return initials;
};

/**
 * Takes a string as a argument and capitalizes the first letter.
 * 
 * @param text - The text to capitalize
 * @returns the string with the first letter in uppercase
 */
export const capitalize = (text: string): string => {
    const firstLetter = text.charAt(0).toUpperCase();
    const remainder = text.slice(1);
    return firstLetter + remainder;
}