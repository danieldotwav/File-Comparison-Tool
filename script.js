document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');

    // Function to read the content of a selected file
    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(`File ${file.name} read successfully.`);
                resolve(event.target.result);
            };
            reader.onerror = (error) => {
                console.error(`Error reading file ${file.name}:`, error);
                reject(error);
            };
            reader.readAsText(file);
        });
    }

    // Function to compare two files and return unique words
    function compareFiles(file1Content, file2Content) {
        console.log('Comparing files...');
        const normalizeText = (text) => {
            return text
                .toLowerCase()
                .replace(/[^\w\s]|_/g, '') // Remove punctuation
                .replace(/\s+/g, ' ')     // Replace multiple spaces with a single space
                .trim();
        };

        const words1 = new Set(normalizeText(file1Content).split(' '));
        const words2 = new Set(normalizeText(file2Content).split(' '));

        console.log('Words in File 1:', words1);
        console.log('Words in File 2:', words2);

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

        console.log('Unique Words:', uniqueWords);
        return Array.from(uniqueWords);
    }

    // Function to display unique words on the page
    function displayUniqueWords(uniqueWords) {
        console.log('Displaying unique words...');
        const uniqueWordsElement = document.getElementById('unique-words');
        if (uniqueWords.length === 0) {
            uniqueWordsElement.textContent = 'No unique words found.';
        } else {
            uniqueWordsElement.textContent = 'Unique words:\n' + uniqueWords.join(', ');
        }
    }

    // Function to handle the comparison of the two selected files
    async function handleFileComparison() {
        console.log('Compare button clicked.');
        const fileInput1 = document.getElementById('file-input-1');
        const fileInput2 = document.getElementById('file-input-2');

        const file1 = fileInput1.files[0];
        const file2 = fileInput2.files[0];

        console.log('Selected File 1:', file1 ? file1.name : 'No file selected');
        console.log('Selected File 2:', file2 ? file2.name : 'No file selected');

        if (file1 && file2) {
            try {
                const [file1Content, file2Content] = await Promise.all([
                    readFile(file1),
                    readFile(file2)
                ]);

                console.log('File 1 Content:', file1Content);
                console.log('File 2 Content:', file2Content);

                const uniqueWords = compareFiles(file1Content, file2Content);
                displayUniqueWords(uniqueWords);
            } catch (error) {
                console.error('Error during file comparison:', error);
            }
        } else {
            alert('Please select both files.');
        }
    }

    // Set up event listeners
    console.log('Initializing application...');
    const compareButton = document.getElementById('compare-button');
    compareButton.addEventListener('click', handleFileComparison);
});

