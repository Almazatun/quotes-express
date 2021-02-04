export const validators = (userName: string, password: string): {errors: Array<string>, valid: boolean} => {
    let errors: Array<string> = []

    if (!userName) {
        errors.push('User name should be required')
    }

    if (!password) {
        errors.push('Password should be required')
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const newPostValidators = (postTitle: string, postBody: string): {errors: Array<string>, valid: boolean} => {
    let errors: Array<string> = []

    if (!postTitle) {
        errors.push('New post title should be required')
    } else if (postTitle && postTitle.trim().length > 20) {
        errors.push('New post title not should be more than 20 characters')
    }

    if (!postBody) {
        errors.push('New post content should be required')
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}