import * as fs from 'fs';
import * as path from 'path';

// Function to convert hex to decimal and pad to 3 digits
function hexToDecimal(hexString: string): string {
    return parseInt(hexString, 16).toString().padEnd(4, ' ');
}

// Function to process the file content
function processFileContent(fileContent: string): string {
    const lines = fileContent.split('\n'); // Split file content into lines
    const result = lines.map(line => {
        // Use regular expression to match hex values
        const hexValues = line.match(/\\x[0-9A-Fa-f]{2,3}/g);
        if (hexValues) {
            // Convert each hex value to decimal and pad to 3 digits
            const decimalValues = hexValues.map(hex => hexToDecimal(hex.replace('\\x', '')));
            // Join decimal values with spaces
            const decimalString = decimalValues.join(' ');
            // Replace hex values with the new decimal string
            let newLine = line;
            newLine = newLine.replace(/(\\x[0-9A-Fa-f]{2,3})+/g, decimalString);
            return newLine;
        } else {
            return line; // If no hex values, return the line as is
        }
    });
    return result.join('\n'); // Join processed lines back into a single string
}

// Get the file paths from CLI arguments
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

if (!inputFilePath || !outputFilePath) {
    console.error('Please provide the path to the input file and the output file as CLI arguments.');
    process.exit(1);
}

// Read the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    const processedContent = processFileContent(data);
    console.log(processedContent); // Output processed content

    // Write the processed content to the specified output file
    fs.writeFile(outputFilePath, processedContent, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file: ${err}`);
        } else {
            console.log(`Processed content written to ${outputFilePath}`);
        }
    });
});
