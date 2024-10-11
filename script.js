// This script.js file is used to generate a tool that allows the user to select a file from their computer and then it compares their file with the output.txt file in this project for unique words that only exist in one file and not the other.

// This function is used to read the file that the user selects and then it reads the file and returns the contents of the file.
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

// This function is used to compare the two files and then it returns the unique words that only exist in one file and not the other.
function compareFiles(file1, file2) {
    const words1 = file1.split(' ');
    const words2 = file2.split(' ');

    const uniqueWords = new Set();

    for (const word of words1) {
        if (!words2.includes(word)) {
            uniqueWords.add(word);
        }
    }

    for (const word of words2) {
        if (!words1.includes(word)) {
            uniqueWords.add(word);
        }
    }

    return Array.from(uniqueWords);
}

// This function is used to display the unique words that only exist in one file and not the other.
function displayUniqueWords(uniqueWords) {
    const uniqueWordsElement = document.getElementById('unique-words');
    uniqueWordsElement.innerHTML = uniqueWords.join(', ');
}

// This function is used to handle the file selection and then it reads the file and compares the two files and then displays the unique words that only exist in one file and not the other.
async function handleFileSelection(event) {
    const file = event.target.files[0];
    if (file) {
        const fileContent = await readFile(file);
        const outputContent = await fetch('output.txt').then(response => response.text());
        const uniqueWords = compareFiles(fileContent, outputContent);
        displayUniqueWords(uniqueWords);
    }
}

// This function is used to add an event listener to the file input element.
function main() {
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', handleFileSelection);
}

main();

