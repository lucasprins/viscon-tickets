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
        error = translations[language].fieldRequired;
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(phoneNumber.split(" ").join(""))) {
        error = translations[language].invalidPhoneNumber;
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
        error = translations[language].fieldRequired;
    } else if (text.length < 25) {
        error = translations[language].inputTooShort;
    }
    return error;
}

/**
 * Returns an error if a given email doesn't meet the specified email requirements
 *  
 * @param email - The email to validate
 * @param language - The language which the user has chosen, taken from Redux state
 * @returns The error which occured, if any
 */
export const validateEmail = (email: string, language: string): string | undefined => {
    let error;
    if(!email) {
        error = translations[language].fieldRequired;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        error = translations[language].invalidEmail;
    }
    return error;
}

/**
 * Returns an error if a given password doesn't meet the specified password requirements
 *  
 * @param password - The password to validate
 * @param language - The language which the user has chosen, taken from Redux state
 * @returns The error which occured, if any
 */
export const validatePassword = (password: string, language: string): string | undefined => {
    let error;
    if(!password) {
        error = translations[language].fieldRequired;
    } else if (password.length < 5) {
        error = translations[language].passwordTooShort;
    }
    return error;
}

/**
 * Returns an error if a given name doesn't meet the specified name requirements
 * 
 * @param name - The name to validate
 * @param language - The language which the user has chosen, taken from Redux state
 * @returns The error which occured, if any
 */
export const validateName = (name: string, language: string): string | undefined => {
    let error;
    if(!name) {
        error = translations[language].fieldRequired;
    } else if (name.length < 2) {
        error = translations[language].inputTooShort;
    }
    return error;
}

/**
 * Returns an error if a given company name doesn't meet the specified string requirements
 * 
 * @param companyName - The company name to validate
 * @param language - The language which the user has chosen, taken from Redux state
 * @returns The error which occured, if any
 */
export const validateCompanyName = (companyName: string, language: string): string | undefined => {
    let error;
    if(!companyName) {
        error = translations[language].fieldRequired;
    } else if (companyName.length < 2) {
        error = translations[language].inputTooShort;
    }
    return error;
}