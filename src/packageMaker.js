const fs = require("fs");
const path = require("path");
const { spawnSync, execSync, exec } = require("child_process");

function promptSync(question) {
    // Output the question to the user
    process.stdout.write(question);

    // Create a buffer to store input
    const buffer = Buffer.alloc(1024);
    
    // Use process.stdin to read input synchronously
    const bytesRead = fs.readSync(0, buffer, 0, buffer.length);

    // Convert buffer to string and trim any extra whitespace
    return buffer.toString('utf8', 0, bytesRead).trim();
}

if (process.argv[2] === "init") {
    if (fs.existsSync("./settings.co.json")) {
        console.log("Settings file already exists.");
        process.exit(0);
    }
    fs.writeFileSync("./settings.co.json", `{
    "src": "${promptSync("What is the path of your project's main file? ")}"
}`);
    console.log("Settings file created successfully.");
} else if (process.argv[2] === "build") {
    if (!fs.existsSync("./settings.co.json")) {
        console.log(`
${'\x1b[31m'}Error: Missing Initialization${'\x1b[0m'}

${'\x1b[33m'}It looks like the initialization step has not been completed.${'\x1b[0m'}

${'\x1b[36m'}To get started, please run the following command:${'\x1b[0m'}
${'\x1b[32m'}co init${'\x1b[0m'}

${'\x1b[33m'}This will create the necessary configuration file for your project.${'\x1b[0m'}
${'\x1b[36m'}Once initialization is complete, you can run the settings using:${'\x1b[0m'}
${'\x1b[32m'}co run${'\x1b[0m'}
        `);
        process.exit(1);        
    }
    let settings = JSON.parse(fs.readFileSync("./settings.co.json", "utf-8"));
    
    const coPath = path.resolve("./src/scripts/co.bat");
    const srcPath = settings['src'];
    
    const result = spawnSync(coPath, [srcPath], { stdio: 'inherit' });
    
    if (result.error) {
        console.error(`Error executing command: ${result.error.message}`);
        process.exit(1);
    }
} else if (process.argv[2] === "run") {
    if (!fs.existsSync("./settings.co.json")) {
        console.log(`
${'\x1b[31m'}Error: Missing Initialization${'\x1b[0m'}

${'\x1b[33m'}It looks like the initialization step has not been completed.${'\x1b[0m'}

${'\x1b[36m'}To get started, please run the following command:${'\x1b[0m'}
${'\x1b[32m'}co init${'\x1b[0m'}

${'\x1b[33m'}This will create the necessary configuration file for your project.${'\x1b[0m'}
${'\x1b[36m'}Once initialization is complete, you can run the settings using:${'\x1b[0m'}
${'\x1b[32m'}co run${'\x1b[0m'}
        `);
        process.exit(1);        
    }
    let settings = JSON.parse(fs.readFileSync("./settings.co.json", "utf-8"));
    
    if (!settings['scripts']) {
        console.log(`Please make a script first!\nExample: "scripts": {"test", "<A command>"}`);
        process.exit(1);
    }
    if (process.argv[3]) {
        const scriptsPath = settings['scripts'];
        if (!scriptsPath[process.argv[3]]) {
            console.log(`Script "${process.argv[3]}" not found.`);
            process.exit(1);
        } else {
            const script = scriptsPath[process.argv[3]];
            let command = script;
            let parts = command.split(/\s+/);

            if (parts.length > 0) {
            let executable = parts[0]; // This will be "coe"
            let args = parts.slice(1).join(" "); // This will be "build" and any subsequent arguments
            
            try {
                execSync(`${executable} ${args}`, { stdio: 'inherit' });
            } catch (error) {
                console.error('Error executing command:', error);
            }
            }
        }
    } else {
        console.log("Missing an argument.");
        process.exit(1);
    }
} else {
    console.error("Invalid command. Use 'init' to create a settings.co.json file.");
    process.exit(1);
}