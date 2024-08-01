#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "cJSON.h"

#define MAX_BUFFER_SIZE 1024
#define MAX_VARS 100

typedef struct {
    char *type;
    char *name;
    char *value;
    char *valueType;
    char *declType;
} TypeInfo;

typedef struct {
    char name[50];
    char value[100];
} Variable;

// Array to store variables
Variable variables[MAX_VARS];
int var_count = 0;

TypeInfo *process_json(const char *json_str, int *num_entries) {
    cJSON *json = cJSON_Parse(json_str);
    if (json == NULL) {
        printf("Error parsing JSON: %s\n", cJSON_GetErrorPtr());
        return NULL;
    }

    // Count number of objects in the JSON array
    int array_size = cJSON_GetArraySize(json);
    if (array_size == 0) {
        printf("Error: JSON array is empty.\n");
        cJSON_Delete(json);
        return NULL;
    }

    // Allocate memory for array of TypeInfo structures
    TypeInfo *info = (TypeInfo *)malloc(array_size * sizeof(TypeInfo));
    if (info == NULL) {
        printf("Error allocating memory.\n");
        cJSON_Delete(json);
        return NULL;
    }

    cJSON *item = NULL;
    int index = 0;
    cJSON_ArrayForEach(item, json) {
        cJSON *type_value = cJSON_GetObjectItemCaseSensitive(item, "Type");
        if (type_value != NULL && cJSON_IsString(type_value)) {
            const char *type = cJSON_GetStringValue(type_value);
            info[index].type = strdup(type); // Allocate memory for Type
            info[index].name = NULL;
            info[index].value = NULL;
            info[index].valueType = NULL;
            info[index].declType = NULL;

            cJSON *name_value = cJSON_GetObjectItemCaseSensitive(item, "Name");
            if (name_value != NULL && cJSON_IsString(name_value)) {
                const char *name = cJSON_GetStringValue(name_value);
                info[index].name = strdup(name); // Allocate memory for Name
            }

            cJSON *value_value = cJSON_GetObjectItemCaseSensitive(item, "Value");
            if (value_value != NULL && cJSON_IsString(value_value)) {
                const char *value = cJSON_GetStringValue(value_value);
                info[index].value = strdup(value); // Allocate memory for Value
            }

            cJSON *valueType_value = cJSON_GetObjectItemCaseSensitive(item, "ValueType");
            if (valueType_value != NULL && cJSON_IsString(valueType_value)) {
                const char *valueType = cJSON_GetStringValue(valueType_value);
                info[index].valueType = strdup(valueType); // Allocate memory for ValueType
            }

            cJSON *declType_value = cJSON_GetObjectItemCaseSensitive(item, "DeclType");
            if (declType_value != NULL && cJSON_IsString(declType_value)) {
                const char *declType = cJSON_GetStringValue(declType_value);
                info[index].declType = strdup(declType); // Allocate memory for ValueType
            }
            index++;
        }
    }

    cJSON_Delete(json);
    *num_entries = index; // Update number of entries found
    return info;
}

char *slice(const char *str) {
    int len = strlen(str);
    
    // Allocate memory for the substring
    char *substring = (char *)malloc(len); // Allocate enough space including null terminator
    
    if (substring == NULL) {
        printf("Memory allocation failed.\n");
        return NULL;
    }
    
    // Copy characters from index 1 to second-to-last character
    strncpy(substring, str + 1, len - 2); // -1 for index adjustment, -1 for null terminator
    
    // Null-terminate the substring
    substring[len - 2] = '\0'; // Set null terminator
    
    return substring;
}

bool parseToBool(const char* str) {
    return str != NULL && strcmp(str, "true") == 0;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <json_file>\n", argv[0]);
        return 1;
    }


    // Open the JSON file
    FILE *json_file = fopen(argv[1], "r");
    if (!json_file) {
        perror("Error opening file");
        return 1;
    }

    // Read JSON data from file
    char buffer[MAX_BUFFER_SIZE];
    while (fgets(buffer, MAX_BUFFER_SIZE, json_file) != NULL) {
        // Process each line (assuming JSON is on one line or read line-by-line)
        int num_entries;
        TypeInfo *info = process_json(buffer, &num_entries);
        if (info != NULL) {
            // Print Type, Name, and Value for functionExecution
            for (int i = 0; i < num_entries; i++) {
                if (strcmp(info[i].type, "variableDeclaration") == 0) {
                    if (strcmp(info[i].declType, "string") == 0) {
                        int found = 0;
                        for (int j = 0; j < var_count; j++) {
                            if (strcmp(variables[j].name, info[i].name) == 0) {
                                // Update existing variable
                                strncpy(variables[j].value, info[i].value, sizeof(variables[j].value) - 1);
                                variables[j].value[sizeof(variables[j].value) - 1] = '\0'; // Ensure null termination
                                found = 1;
                                break;
                            }
                        }
                        if (!found && var_count < MAX_VARS) {
                            // Add new variable
                            strncpy(variables[var_count].name, info[i].name, sizeof(variables[var_count].name) - 1);
                            variables[var_count].name[sizeof(variables[var_count].name) - 1] = '\0'; // Ensure null termination
                            strncpy(variables[var_count].value, slice(info[i].value), sizeof(variables[var_count].value) - 1);
                            variables[var_count].value[sizeof(variables[var_count].value) - 1] = '\0'; // Ensure null termination
                            var_count++;
                        }
                    } else if (strcmp(info[i].declType, "boolean") == 0) {
                        int found = 0;
                        for (int j = 0; j < var_count; j++) {
                            if (strcmp(variables[j].name, info[i].name) == 0) {
                                // Update existing variable
                                strncpy(variables[j].value, info[i].value, sizeof(variables[j].value) - 1);
                                variables[j].value[sizeof(variables[j].value) - 1] = '\0'; // Ensure null termination
                                found = 1;
                                break;
                            }
                        }
                        if (!found && var_count < MAX_VARS) {
                            // Add new variable
                            strncpy(variables[var_count].name, info[i].name, sizeof(variables[var_count].name) - 1);
                            variables[var_count].name[sizeof(variables[var_count].name) - 1] = '\0'; // Ensure null termination
                            strncpy(variables[var_count].value, info[i].value, sizeof(variables[var_count].value) - 1);
                            variables[var_count].value[sizeof(variables[var_count].value) - 1] = '\0'; // Ensure null termination
                            var_count++;
                        }
                    } else if (strcmp(info[i].declType, "integer") == 0) {
                        int found = 0;
                        for (int j = 0; j < var_count; j++) {
                            if (strcmp(variables[j].name, info[i].name) == 0) {
                                // Update existing variable
                                strncpy(variables[j].value, info[i].value, sizeof(variables[j].value) - 1);
                                variables[j].value[sizeof(variables[j].value) - 1] = '\0'; // Ensure null termination
                                found = 1;
                                break;
                            }
                        }
                        if (!found && var_count < MAX_VARS) {
                            // Add new variable
                            strncpy(variables[var_count].name, info[i].name, sizeof(variables[var_count].name) - 1);
                            variables[var_count].name[sizeof(variables[var_count].name) - 1] = '\0'; // Ensure null termination
                            strncpy(variables[var_count].value, info[i].value, sizeof(variables[var_count].value) - 1);
                            variables[var_count].value[sizeof(variables[var_count].value) - 1] = '\0'; // Ensure null termination
                            var_count++;
                        }
                    } else if (strcmp(info[i].declType, "variable") == 0) {
                    }
                } else if (strcmp(info[i].type, "functionExecution") == 0) {
                    if (strcmp(info[i].name, "print") == 0) {
                        const char* valueToPrint;
                        if (strcmp(info[i].valueType, "string") == 0) {
                            printf(info[i].value != NULL ? slice(info[i].value) : "N/A");
                        } else if (strcmp(info[i].valueType, "boolean") == 0) {
                            printf("%s", parseToBool(info[i].value) ? "true" : "false");
                        } else if (strcmp(info[i].valueType, "integer") == 0) {
                            printf("%d", atoi(info[i].value));
                        } else if (strcmp(info[i].valueType, "variable") == 0) {
                            // Retrieve the variable value
                            valueToPrint = NULL;
                            for (int j = 0; j < var_count; j++) {
                                if (strcmp(variables[j].name, info[i].value) == 0) {
                                    valueToPrint = variables[j].value;
                                    break;
                                }
                            }
                            if (valueToPrint == NULL) {
                                valueToPrint = "undefined";
                            }
                        } else {
                            valueToPrint = "unknown type";
                        }
                        printf("%s\n", valueToPrint);
                    }
                }
                free(info[i].type); // Free allocated memory for Type
                free(info[i].name); // Free allocated memory for Name
                free(info[i].value); // Free allocated memory for Value
                free(info[i].valueType); // Free allocated memory for ValueType
            }
            free(info); // Free memory for array of TypeInfo structures
        }
    }

    fclose(json_file);
    return 0;
}