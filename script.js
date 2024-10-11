// Function to read the content of a selected file
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

// Function to compare two files and return unique words
function compareFiles(file1Content, file2Content) {
    const words1 = new Set(file1Content.split(/\s+/));
    const words2 = new Set(file2Content.split(/\s+/));

    const uniqueWords = new Set();

    for (const word of words1) {
        if (!words2.has(word)) {
            uniqueWords.add(word);
        }
    }

    for (const word of words2) {
        if (!words1.has(word)) {
            uniqueWords.add(word);
        }
    }

    return Array.from(uniqueWords);
}

// Function to display unique words on the page
function displayUniqueWords(uniqueWords) {
    const uniqueWordsElement = document.getElementById('unique-words');
    if (uniqueWords.length === 0) {
        uniqueWordsElement.textContent = 'No unique words found.';
    } else {
        uniqueWordsElement.textContent = 'Unique words:\n' + uniqueWords.join(', ');
    }
}

// Function to handle the comparison of the two selected files
async function handleFileComparison() {
    const fileInput1 = document.getElementById('file-input-1');
    const fileInput2 = document.getElementById('file-input-2');

    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];

    if (file1 && file2) {
        try {
            const [file1Content, file2Content] = await Promise.all([
                readFile(file1),
                readFile(file2)
            ]);

            const uniqueWords = compareFiles(file1Content, file2Content);
            displayUniqueWords(uniqueWords);
        } catch (error) {
            console.error('Error reading files:', error);
        }
    } else {
        alert('Please select both files.');
    }
}

// Main function to set up event listeners
function main() {
    const compareButton = document.getElementById('compare-button');
    compareButton.addEventListener('click', handleFileComparison);
}

main();
