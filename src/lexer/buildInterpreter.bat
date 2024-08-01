@echo off
echo Compiling the interpreter..
gcc -o ./src/interpreter/interpreter ./src/interpreter/interpreter.c ./src/interpreter/cJSON.c