var translations = require('../translations/validateInputTranslations.json');

/**
 * Returns an error if a given phoneNumber doesn't meet the specified phone number requirements
 * 
 * @param phoneNumber - The phone number to validate
 * @param language - The language which the user has chosen, taken from Redux state
 * @returns The error which occured, if any
 */
export const validatePhoneNumber = (phoneNumber: string, language: string): string | undefined => {
    let error;
    if(!phoneNumber) {
        error = translations[language].field_required;
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(phoneNumber.split(" ").join(""))) {
        error = 'Invalid phone number';
    }
    return error;
}

/**
 * Returns an error if a given string isn't long enough
 * 
 * @param text - The text from the textarea to validate
 * @param language - The language which the user has chosen, taken from Redux state
 * @returns The error which occured, if any
 */
 export const validateTextarea = (text: string, language: string): string | undefined => {
    let error;
    if(!text) {
        error = translations[language].field_required;
    } else if (text.length < 25) {
        error = "Your input is too short";
    }
    return error;
}