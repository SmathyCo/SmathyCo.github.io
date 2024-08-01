#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get command-line arguments
const args = process.argv.slice(2);
const filePath = args[0]; // The first argument should be the file path

// Check if filePath is provided
if (!filePath) {
    console.error('No file path provided.');
    process.exit(1);
}

// Resolve the absolute path
const absolutePath = path.resolve(filePath);

try {
    // Read the file
    const data = fs.readFileSync(absolutePath, 'utf8');

    // Set global variable to pass data to the lexer
    global.__lexerData = data;

    // Import the lexer module which will immediately process the data
    require("./lexer/lexer");
} catch (error) {
    console.error('Error reading file:', error.message);
    process.exit(1);
}