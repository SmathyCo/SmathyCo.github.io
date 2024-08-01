#include <windows.h>
#include "icon_data.h" // Header file containing the icon data array

#define BUTTON_ID 1
#define FONT_NAME "Segoe UI"
#define FONT_SIZE 14
#define TITLE_FONT_SIZE 16 // Size for the bold title font

// Function declarations
LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam);
void RunBatchFile(const char *batchFilePath);
HFONT CreateModernFont(BOOL bold);
void SetWindowBackgroundColor(HWND hwnd, COLORREF color);
void CenterWindow(HWND hwnd, int width, int height);

// Entry point of the application
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    // Window class name
    const char CLASS_NAME[] = "Installer Window Class";

    // Register the window class
    WNDCLASS wc = {0};
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME;
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    RegisterClass(&wc);

    // Define the window dimensions
    const int windowWidth = 400;
    const int windowHeight = 250;

    // Create the window
    HWND hwnd = CreateWindowEx(
        0, CLASS_NAME, "Installer",
        WS_POPUP | WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, windowWidth, windowHeight,
        NULL, NULL, hInstance, NULL
    );

    if (hwnd == NULL) {
        return 0;
    }

    // Center the window on the screen
    CenterWindow(hwnd, windowWidth, windowHeight);

    // Set window style to remove minimize and close buttons (already using WS_POPUP which has no buttons)
    // Load and set the icon
    HICON hIcon = CreateIconFromResource(icon_data, icon_data_size, TRUE, 0x30000);
    SendMessage(hwnd, WM_SETICON, ICON_BIG, (LPARAM)hIcon);

    // Set the window background color to white
    SetWindowBackgroundColor(hwnd, RGB(255, 255, 255));

    // Show the window
    ShowWindow(hwnd, nCmdShow);
    UpdateWindow(hwnd);

    // Run the message loop
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return 0;
}

// Window procedure function
LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    static HFONT hFont, hTitleFont;
    static HWND hButton, hTitle, hDesc;
    
    switch (uMsg) {
        case WM_CREATE:
            // Create modern fonts
            hFont = CreateModernFont(FALSE);
            hTitleFont = CreateModernFont(TRUE);

            // Create a static text control for the title
            HWND hTitle = CreateWindow(
                "STATIC", "Welcome to the Installer", WS_CHILD | WS_VISIBLE | SS_CENTER,
                10, 10, 360, 30, hwnd, NULL, (HINSTANCE)GetWindowLongPtr(hwnd, GWLP_HINSTANCE), NULL
            );
            SendMessage(hTitle, WM_SETFONT, (WPARAM)hTitleFont, TRUE);

            // Create a static text control for the description
            hDesc = CreateWindow(
                "STATIC", "You can use the button below to install the commands and the dependencies of the CO programming language.",
                WS_CHILD | WS_VISIBLE | SS_CENTER | SS_NOTIFY, // Use SS_CENTER for centering text
                10, 50, 360, 40, hwnd, NULL, (HINSTANCE)GetWindowLongPtr(hwnd, GWLP_HINSTANCE), NULL
            );
            SendMessage(hDesc, WM_SETFONT, (WPARAM)hFont, TRUE);

            // Create a button
            hButton = CreateWindow(
                "BUTTON", "Install Now", WS_TABSTOP | WS_VISIBLE | WS_CHILD | BS_DEFPUSHBUTTON,
                50, 150, 300, 40, hwnd, (HMENU)BUTTON_ID, (HINSTANCE)GetWindowLongPtr(hwnd, GWLP_HINSTANCE), NULL
            );
            SendMessage(hButton, WM_SETFONT, (WPARAM)hFont, TRUE);

            break;

        case WM_COMMAND:
            if (LOWORD(wParam) == BUTTON_ID) {
                // Run the batch file when the button is clicked
                RunBatchFile("install.bat");
            }
            break;

        case WM_LBUTTONDOWN:
            if ((HWND)lParam != hButton) {
                // Allow dragging the window
                ReleaseCapture();
                SendMessage(hwnd, WM_NCLBUTTONDOWN, HTCAPTION, 0);
            }
            break;

        case WM_PAINT:
            {
                PAINTSTRUCT ps;
                HDC hdc = BeginPaint(hwnd, &ps);
                SetBkMode(hdc, TRANSPARENT);
                SetTextColor(hdc, RGB(0, 0, 0)); // Set text color to black
                EndPaint(hwnd, &ps);
            }
            break;

        case WM_ERASEBKGND:
            {
                HDC hdc = (HDC)wParam;
                RECT rect;
                GetClientRect(hwnd, &rect);
                HBRUSH hBrush = CreateSolidBrush(RGB(255, 255, 255)); // White background
                FillRect(hdc, &rect, hBrush);
                DeleteObject(hBrush);
            }
            return TRUE;

        case WM_DESTROY:
            // Clean up
            PostQuitMessage(0);
            break;

        default:
            return DefWindowProc(hwnd, uMsg, wParam, lParam);
    }

    return 0;
}

// Function to execute the batch file
void RunBatchFile(const char *batchFilePath) {
    ShellExecute(NULL, "open", batchFilePath, NULL, NULL, SW_SHOWNORMAL);
}

// Function to create a modern font
HFONT CreateModernFont(BOOL bold) {
    return CreateFont(
        bold ? TITLE_FONT_SIZE : FONT_SIZE, // Height of font
        0,                                  // Width of font (0 means use default width)
        0,                                  // Angle of escapement
        0,                                  // Base line orientation angle
        bold ? FW_BOLD : FW_NORMAL,          // Font weight (bold if TRUE, normal if FALSE)
        FALSE,                              // Italic
        FALSE,                              // Underline
        FALSE,                              // Strikeout
        DEFAULT_CHARSET,                    // Character set identifier
        OUT_OUTLINE_PRECIS,                 // Output precision
        CLIP_DEFAULT_PRECIS,                // Clipping precision
        CLEARTYPE_QUALITY,                  // Quality
        VARIABLE_PITCH,                     // Pitch and family
        FONT_NAME                           // Font face name
    );
}

// Function to set window background color
void SetWindowBackgroundColor(HWND hwnd, COLORREF color) {
    HBRUSH hBrush = CreateSolidBrush(color);
    SetClassLongPtr(hwnd, GCLP_HBRBACKGROUND, (LONG_PTR)hBrush);
}

// Function to center the window on the screen
void CenterWindow(HWND hwnd, int width, int height) {
    RECT rect;
    GetWindowRect(hwnd, &rect);

    int windowWidth = rect.right - rect.left;
    int windowHeight = rect.bottom - rect.top;

    int screenWidth = GetSystemMetrics(SM_CXSCREEN);
    int screenHeight = GetSystemMetrics(SM_CYSCREEN);

    int x = (screenWidth - width) / 2;
    int y = (screenHeight - height) / 2;

    SetWindowPos(hwnd, NULL, x, y, width, height, SWP_NOZORDER | SWP_NOACTIVATE);
}