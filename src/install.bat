@echo off
:: Check if the script is running as an administrator
openfiles >nul 2>&1
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"%~dp0install.bat\"' -Verb runAs"
    exit /b
)

:: Define the directory to add to PATH
set "directoryToAdd=C:\Users\HP\Downloads\A programming language\src\scripts"

:: Escape the path for PowerShell
set "escapedDirectoryToAdd=%directoryToAdd:\=\\%"

:: Add the directory to the system PATH
set "currentPath=%PATH%"
set "newPath=%currentPath%;%directoryToAdd%"

:: PowerShell command to update PATH
powershell -Command "[System.Environment]::SetEnvironmentVariable('PATH', '%newPath%', 'Machine')"

echo Directory added to system PATH successfully.

:: Optionally, you can add a pause to see the output
pause