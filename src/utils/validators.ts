import emailRegExp from './other/emailRegularExpressions'

interface IErrors {
    userName?: string
    email?: string
    password?: string
    confirmPassword?: string
}

type ErrorsSignIn = Pick<IErrors, "userName" | "password">

interface IValidatorsReturn {
    errors: null | IErrors | ErrorsSignIn,
    valid: boolean
}

export const validationRules = (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
): IValidatorsReturn => {

    const errors: IErrors = {}
    //userName
    if (userName.trim() === '') {
        errors.userName = 'Username must not be empty 🤬';
    }
    //email
    if (!email) {
        errors.email = 'Email can not be empty 🤬';
    } else if (!emailRegExp.test(email)) {
        errors.email = 'Invalid email address 🤡';
    }
    //password
    if (!password) {
        errors.password = 'Password can not be empty 🤬'
    } else if (password.length < 6) {
        errors.password = "Password must be 6 characters or more 🤬"
    }
    //confirmPassword
    if (!confirmPassword) {
        errors.confirmPassword = 'Confirm password can not be empty 🤬'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password do not math 💥'
    }


    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const validationRulesSignIn = (userName: string, password: string):IValidatorsReturn  => {
    const errors: ErrorsSignIn = {}
    //userName
    if (userName.trim() === '') {
        errors.userName = 'User name can not be empty 🤬'
    }
    //password
    if (!password) {
        errors.password = 'Password can not be empty 🤬'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


export default {
    validationRules,
    validationRulesSignIn
}