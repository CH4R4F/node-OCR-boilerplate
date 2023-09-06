const { createWorker } = require("tesseract.js");
const path = require("path");

const extractor = async (pathName) => {
    const worker = await createWorker({
        langPath: path.join(__dirname, "..", "trained-data"), // add trained data as you want
        logger: (m) => console.log(m), // console the progress output for debugging purposes
    });
    await worker.loadLanguage("eng"); // select language ("https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016")
    await worker.initialize("eng");
    await worker.setParameters({
        // tessedit_char_whitelist: '0123456789', // to only recognize a list of characters (for example numbers);
    });
    const {
        data: { text },
    } = await worker.recognize(pathName);
    await worker.terminate();

    return text;
};

module.exports = extractor;
