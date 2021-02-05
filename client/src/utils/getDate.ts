export function getDate (dateToConvert: string): string {
    const postDate = new Date(dateToConvert)

    //Convert
    const date = postDate.getDate();
    const month = postDate.toLocaleDateString('default', {month: 'long'})
    const year = postDate.getFullYear()

    return `${month} ${date}, ${year}`
}