import pdfToText from 'react-pdftotext'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractText(event: any) {
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => console.log(text))
        .catch(() => console.error("Failed to extract text from pdf"))
}