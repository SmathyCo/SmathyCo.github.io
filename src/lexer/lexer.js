// Immediately execute a function to process the data when the module is loaded
(function() {

    const fs = require("fs");

    // Access data from global context or modify this to receive data differently
    const data = global.__lexerData; // Using a global variable for simplicity
    
    function lexer(data) {
        if (data) {

            function splitData(data) {
                // Replace all occurrences of \r\n with \n
                data = data.replace(/\r\n/g, '\n');
                
                // Split data based on `;` not inside `{}` by using regex and manual parsing
                const chunks = [];
                let startIndex = 0;
                let braceLevel = 0;
            
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === '{') {
                        braceLevel++;
                    } else if (data[i] === '}') {
                        braceLevel--;
                    } else if (data[i] === ';' && braceLevel === 0) {
                        // Split on `;` if outside of braces
                        chunks.push(data.slice(startIndex, i).trim());
                        startIndex = i + 1;
                    }
                }
            
                // Add the last chunk
                chunks.push(data.slice(startIndex).trim());
            
                // Filter out any empty chunks
                return chunks.filter(chunk => chunk.length > 0);
            }

            function combineFunctionBodies(data) {
                const combined = [];
                let currentBlock = '';
                let insideBraces = 0;
            
                data.forEach(chunk => {
                    let i = 0;
                    while (i < chunk.length) {
                        const char = chunk[i];
            
                        if (char === '{') {
                            insideBraces++;
                            currentBlock += char;
                        } else if (char === '}') {
                            insideBraces--;
                            currentBlock += char;
                            if (insideBraces === 0) {
                                combined.push(currentBlock.trim());
                                currentBlock = '';
                            }
                        } else if (char === ';' && insideBraces === 0) {
                            if (currentBlock.length > 0) {
                                currentBlock += ';';
                                combined.push(currentBlock.trim());
                                currentBlock = '';
                            }
                        } else {
                            currentBlock += char;
                        }
                        i++;
                    }
            
                    if (currentBlock.length > 0) {
                        combined.push(currentBlock.trim());
                        currentBlock = '';
                    }
                });
            
                return combined.filter(chunk => chunk.length > 0);
            }
            
            // Making arrays for each code line & removing empty arrays of lines & spliting on } also disabling ; inside of {}
            let dataNextLine = [combineFunctionBodies(splitData(data))];
            
            // Lexer
            let tokens = [];
            for (let i = 0; i < dataNextLine.length; i++) {
                for (let i2 = 0; i2 < dataNextLine[i].length; i2++) {

                    /*
                        FUNCTION CREATION
                    */
                    if (dataNextLine[i][i2].startsWith("function")) {
                        let cFunctionFirstSpace = dataNextLine[i][i2].indexOf(" ");
                        let cFunctionFirstOpenParen = dataNextLine[i][i2].indexOf("(");
                        let cFunctionName = dataNextLine[i][i2].substring(cFunctionFirstSpace + 1, cFunctionFirstOpenParen); // Getting the function name from the function declaration line
                        let cFunctionFirstClosingParen = dataNextLine[i][i2].indexOf(")");
                        let cFunctionParams = dataNextLine[i][i2].substring(cFunctionFirstOpenParen + 1, cFunctionFirstClosingParen).split(',').map(param => param.trim()); // Getting the function parameters from the function declaration line
                        let cFunctionOpeningBrace = dataNextLine[i][i2].indexOf("{");
                        let cFunctionClosingBrace = dataNextLine[i][i2].indexOf("}");
                        let cFunctionBody = dataNextLine[i][i2].substring(cFunctionOpeningBrace + 1, cFunctionClosingBrace);

                        const bodySegments = cFunctionBody.split(";").map(segment => segment.trim());
                        let accumulatedBody = [];

                        for (let i3 = 0; i3 < bodySegments.length; i3++) {
                            const trimmedSegment = bodySegments[i3];

                            // Check if trimmedSegment is not empty
                            if (trimmedSegment !== '') {
                                const lexedResult = lexer(trimmedSegment);

                                if (lexedResult.length > 0) {
                                    // Accumulate each Body object
                                    accumulatedBody.push(lexedResult[0]);
                                } else {
                                    console.error('No data provided to lexer.');
                                    // Handle the error or continue as needed
                                }
                            }
                        }

                        // Push a single object with the accumulated Body into tokens
                        if (accumulatedBody.length > 0) {
                            tokens.push({
                                'Type': "functionCreation",
                                'Name': cFunctionName,
                                'Params': cFunctionParams,
                                'Body': JSON.stringify(accumulatedBody) // Push all accumulated Body objects
                            });
                        }
                    }

                    /*
                        VARIABLE ASSIGNMENT
                    */
                    let varPrefix = dataNextLine[i][i2].indexOf("var");
                    if (dataNextLine[i][i2].charAt(varPrefix) === "v" && dataNextLine[i][i2].charAt(varPrefix + 1) === "a" && dataNextLine[i][i2].charAt(varPrefix + 2) === "r") {
                        if (dataNextLine[i][i2].charAt(varPrefix + 3) === " ") {
                            let varValues = /var\s([a-zA-Z])\s*=\s*([a-zA-Z0-9]+|"([^"]*)")/.exec(dataNextLine[i][i2]);
                            let varName = varValues[1].trim();
                            let varValue = varValues[2];
                            let varValueType;
                            if (varValue.startsWith("'") && varValue.endsWith("'") || varValue.startsWith('"') && varValue.endsWith('"')) {
                                varValueType = "string";
                            } else if (/[0-9]/.test(varValue)) {
                                varValueType = "integer";
                            } else if (/true|false/.test(varValue)) {
                                varValueType = "boolean";
                            } else if (/[A-Za-z]/.test(varValue)) {
                                varValueType = "variable";
                            }
                            if (varValueType === undefined) {
                                console.log(`
${'\x1b[31m'}Error: Variable Type Undefined${'\x1b[0m'}

${'\x1b[33m'}Details:${'\x1b[0m'}
Unable to find what type of value is inside the variable.

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  var ${varName} = ${varValue}; // This could be undefined${'\x1b[0m'}

${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  var ${varName} = 1; // Assign it with a good type of value${'\x1b[0m'}
                                `);
                                process.exit(1);
                            }
                            tokens.push({
                                'Type': "variableDeclaration",
                                'DeclType': "var",
                                'Name': varName,
                                'Value': varValue,
                                'ValueType': varValueType
                            });
                        }
                    }
                    // int
                    let intPrefix = dataNextLine[i][i2].indexOf("int");
                    if (dataNextLine[i][i2].charAt(intPrefix) === "i" && dataNextLine[i][i2].charAt(intPrefix + 1) === "n" && dataNextLine[i][i2].charAt(intPrefix + 2) === "t") {
                        if (dataNextLine[i][i2].charAt(intPrefix + 3) === " ") {
                            let varValues = /int\s([a-zA-Z])\s*=\s*([a-zA-Z0-9]+|"([^"]*)")/.exec(dataNextLine[i][i2]);
                            let varName = varValues[1].trim();
                            let varValue = varValues[2];
                            let varValueType;
                            if (varValue.startsWith("'") && varValue.endsWith("'") || varValue.startsWith('"') && varValue.endsWith('"')) {
                                varValueType = "string";
                            } else if (/[0-9]/.test(varValue)) {
                                varValueType = "integer";
                            } else if (/true|false/.test(varValue)) {
                                varValueType = "boolean";
                            } else if (/[A-Za-z]/.test(varValue)) {
                                varValueType = "variable";
                            }
                            if (varValueType === undefined) {
                                console.log(`
${'\x1b[31m'}Error: Variable Type Undefined${'\x1b[0m'}

${'\x1b[33m'}Details:${'\x1b[0m'}
Unable to find what type of value is inside the variable.

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  var ${varName} = ${varValue}; // This could be undefined${'\x1b[0m'}

${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  var ${varName} = 1; // Assign it with a good type of value${'\x1b[0m'}
`);
                                process.exit(1);
                            } else if (varValueType !== "integer") {
                                console.log(`
${'\x1b[31m'}Error: Variable Type Error${'\x1b[0m'}

${'\x1b[33m'}Details:${'\x1b[0m'}
You cannot assign a integer variable to a ${varValueType}

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  int ${varName} = ${varValue}; // This could be wrong${'\x1b[0m'}

${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  int ${varName} = 1; // Assign it with a good type of value${'\x1b[0m'}
                                `);
                                process.exit(1);
                            }
                            tokens.push({
                                'Type': "variableDeclaration",
                                'DeclType': "integer",
                                'Name': varName,
                                'Value': varValue,
                                'ValueType': varValueType
                            });
                        }
                    }
                    // str
                    let strPrefix = dataNextLine[i][i2].indexOf("str");
                    if (dataNextLine[i][i2].charAt(strPrefix) === "s" && dataNextLine[i][i2].charAt(strPrefix + 1) === "t" && dataNextLine[i][i2].charAt(strPrefix + 2) === "r") {
                        if (dataNextLine[i][i2].charAt(strPrefix + 3) === " ") {
                            let varValues = /str\s([a-zA-Z])\s*=\s*([a-zA-Z0-9]+|"([^"]*)")/.exec(dataNextLine[i][i2]);
                            let varName = varValues[1].trim();
                            let varValue = varValues[2];
                            let varValueType;
                            if (varValue.startsWith("'") && varValue.endsWith("'") || varValue.startsWith('"') && varValue.endsWith('"')) {
                                varValueType = "string";
                            } else if (/[0-9]/.test(varValue)) {
                                varValueType = "integer";
                            } else if (/true|false/.test(varValue)) {
                                varValueType = "boolean";
                            } else if (/[A-Za-z]/.test(varValue)) {
                                varValueType = "variable";
                            }
                            if (varValueType === undefined) {
                                console.log(`
${'\x1b[31m'}Error: Variable Type Undefined${'\x1b[0m'}

${'\x1b[33m'}Details:${'\x1b[0m'}
Unable to find what type of value is inside the variable.

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  var ${varName} = ${varValue}; // This could be undefined${'\x1b[0m'}

${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  var ${varName} = 1; // Assign it with a good type of value${'\x1b[0m'}
`);
                                process.exit(1);
                            } else if (varValueType !== "string") {
                                console.log(`
${'\x1b[31m'}Error: Variable Type Error${'\x1b[0m'}

${'\x1b[33m'}Details:${'\x1b[0m'}
You cannot assign a string variable to a ${varValueType}

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  str ${varName} = ${varValue}; // This could be wrong${'\x1b[0m'}

${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  str ${varName} = "Hello, world!"; // Assign it with a good type of value${'\x1b[0m'}
                                `);
                                process.exit(1);
                            }
                            tokens.push({
                                'Type': "variableDeclaration",
                                'DeclType': "string",
                                'Name': varName,
                                'Value': varValue,
                                'ValueType': varValueType
                            });
                        }
                    }
                    // bool
                    let boolPrefix = dataNextLine[i][i2].indexOf("bool");
                    if (dataNextLine[i][i2].charAt(boolPrefix) === "b" && dataNextLine[i][i2].charAt(boolPrefix + 1) === "o" && dataNextLine[i][i2].charAt(boolPrefix + 2) === "o" && dataNextLine[i][i2].charAt(boolPrefix + 3) === "l") {
                        if (dataNextLine[i][i2].charAt(boolPrefix + 4) === " ") {
                            let varValues = /bool\s([a-zA-Z])\s*=\s*([a-zA-Z0-9]+|"([^"]*)"|true|false)/.exec(dataNextLine[i][i2]);
                            let varName = varValues[1].trim();
                            let varValue = varValues[2];
                            let varValueType;
                            if (varValue.startsWith("'") && varValue.endsWith("'") || varValue.startsWith('"') && varValue.endsWith('"')) {
                                varValueType = "string";
                            } else if (/[0-9]/.test(varValue)) {
                                varValueType = "integer";
                            } else if (/true|false/.test(varValue)) {
                                varValueType = "boolean";
                            } else if (/[A-Za-z]/.test(varValue)) {
                                varValueType = "variable";
                            }
                            if (varValueType === undefined) {
                                console.log(`
${'\x1b[31m'}Error: Variable Type Undefined${'\x1b[0m'}

${'\x1b[33m'}Details:${'\x1b[0m'}
Unable to find what type of value is inside the variable.

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  var ${varName} = ${varValue}; // This could be undefined${'\x1b[0m'}

${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  var ${varName} = 1; // Assign it with a good type of value${'\x1b[0m'}
`);
                                process.exit(1);
                            } else if (varValueType !== "boolean") {
                                console.log(`
${'\x1b[31m'}Error: Variable Type Error${'\x1b[0m'}

${'\x1b[33m'}Details:${'\x1b[0m'}
You cannot assign a boolean variable to a ${varValueType}

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  bool ${varName} = ${varValue}; // This could be wrong${'\x1b[0m'}

${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  bool ${varName} = true; // Assign it with a good type of value${'\x1b[0m'}
                                `);
                                process.exit(1);
                            }
                            tokens.push({
                                'Type': "variableDeclaration",
                                'DeclType': "boolean",
                                'Name': varName,
                                'Value': varValue,
                                'ValueType': varValueType
                            });
                        }
                    }

                    /*
                        FUNCTION EXECUTION
                    */
                    let startParen = dataNextLine[i][i2].indexOf("("); // Getting where is the starting paren
                    let endParen = dataNextLine[i][i2].indexOf(")"); // Getting where is the ending paren
                    let secondBrace = dataNextLine[i][i2].indexOf("}");
    
                    if (!(endParen >= startParen && endParen <= secondBrace)) {
                        if (endParen > startParen) { // This is so it doesn't scan )( instead of ()
                            if (typeof dataNextLine[i][i2] === 'string') {
                                let element = dataNextLine[i][i2];
                                if (startParen >= 0 && endParen <= element.length) {
                                    let functionName = dataNextLine[i][i2].match(/^[a-z][a-z0-9]*/)[0];
    
                                    if (functionName !== "function" && functionName !== "var" && functionName !== "int" && functionName !== "str" && functionName !== "bool") {
                                        let functionValue = element.substring(startParen + 1, endParen);
                                        let functionType;
                                        if (functionValue.startsWith("'") && functionValue.endsWith("'") || functionValue.startsWith('"') && functionValue.endsWith('"')) {
                                            functionType = "string";
                                        } else if (/[0-9]/.test(functionValue)) {
                                            functionType = "integer";
                                        } else if (/true|false/.test(functionValue)) {
                                            functionType = "boolean";
                                        } else if (/[A-Za-z]/.test(functionValue)) {
                                            functionType = "variable";
                                        }
                                        if (functionType === undefined) {
                                            console.log(`
${'\x1b[31m'}Error: Function Type Undefined${'\x1b[0m'}

${'\x1b[33m'}Details:${'\x1b[0m'}
Unable to find what type of value is inside the function.

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  ${functionName}(${functionValue}) // This could be undefined${'\x1b[0m'}

${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  ${functionName}(1) // Assign it with a good type of value${'\x1b[0m'}
${'\x1b[32m'}
/* Types of valid value type
Boolean
String
Integer
Variable
*/
${'\x1b[0m'}
                                            `);
                                            process.exit(1);
                                        }
                                        tokens.push({
                                            'Type': "functionExecution",
                                            'Name': functionName,
                                            'Value': functionValue,
                                            'ValueType': functionType
                                        });
                                    }
                                } else {
                                    console.log(`
${'\x1b[31m'}Error: Missing Parenthesis${'\x1b[0m'}

${'\x1b[33m'}Location: Line ${i + 1}

${'\x1b[31m'}A opening parenthesis '(' is missing. Please check the indicated position and ensure all parentheses are properly matched.${'\x1b[0m'}

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  print"Hello World");${'\x1b[0m'}
${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  print("Hello World");${'\x1b[0m'}
                                        `);
                                    process.exit(1);
                                }
                            }
                        } else {
                            console.log(`
${'\x1b[31m'}Error: Missing Parenthesis${'\x1b[0m'}

${'\x1b[33m'}Location: Line ${i + 1}

${'\x1b[31m'}A closing parenthesis ')' is missing. Please check the indicated position and ensure all parentheses are properly matched.${'\x1b[0m'}

${'\x1b[36m'}Example Fix:${'\x1b[0m'}
${'\x1b[32m'}  // Before${'\x1b[0m'}
${'\x1b[32m'}  print("Hello World";${'\x1b[0m'}
${'\x1b[32m'}  // After${'\x1b[0m'}
${'\x1b[32m'}  print("Hello World");${'\x1b[0m'}
                            `);
                            process.exit(1);
                        }
                    }
                }
            }
            return tokens;
        } else {
            console.log("No data provided to lexer.");
        }
    }

    global.__tokens = lexer(data);

    // Write the data to a file (for demonstration purposes)
    fs.writeFileSync('./src/lexer/tokens.json', JSON.stringify(__tokens));

    // Execute a shell command to run your C program with the data file as input
    const { exec } = require('child_process');
    exec('.\\src\\interpreter\\interpreter ./src/lexer/tokens.json', (err, stdout, stderr) => {
        if (err) {
            console.error('Error executing C program:', err);
            return;
        }

        console.log(stdout);
    });
})();