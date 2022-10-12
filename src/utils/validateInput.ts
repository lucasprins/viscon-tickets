/**
 * Returns an error if a given phoneNumber doesn't meet the specified requirements
 * 
 * @param phoneNumber - The phone number to validate
 * @returns The error which occured, if any
 */
export const validatePhoneNumber = (phoneNumber: string): string | undefined => {
    let error;
    if(!phoneNumber) {
        error = "Required";
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(phoneNumber.split(" ").join(""))) {
        error = 'Invalid email address';
    }
    return error;
}