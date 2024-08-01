@echo off
REM Ensure the Node.js interpreter is used to run the script
node "%~dp0..\cli.js" %*

REM Check if there was an error running the script
if ERRORLEVEL 1 (
    echo Error occurred while executing the script.
    exit /b 1
)

REM Confirm successful execution