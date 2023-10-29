"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.createReactFolderStructure", async () => {
        // Get the current workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder is opened.");
            return;
        }
        // Get the list of directories in the current workspace folder
        const directories = await vscode.workspace.fs.readDirectory(workspaceFolder.uri);
        // Create a list of folder names
        const folderNames = directories
            .filter((item) => item[1] === vscode.FileType.Directory)
            .map((item) => item[0]);
        // Show a quick pick menu with folder names
        const selectedFolder = await vscode.window.showQuickPick(folderNames, {
            placeHolder: "Select a folder as the working directory for the extension",
        });
        if (!selectedFolder) {
            vscode.window.showErrorMessage("No folder selected. Operation canceled.");
            return;
        }
        // Update the configuration with the selected folder as the working directory
        vscode.workspace
            .getConfiguration()
            .update("extension.workingDirectory", selectedFolder, vscode.ConfigurationTarget.Global);
        // Perform the desired operation (e.g., create folder structure)
        const folderPath = path.join(workspaceFolder.uri.fsPath, selectedFolder);
        // Your folder structure creation logic goes here...
        // find the src folder
        const srcFolderPath = path.join(folderPath, "src");
        const folders = [
            "api",
            "components",
            "hooks",
            "model",
            "pages",
            "routes",
            "store",
            "utils",
        ];
        folders.forEach((folder) => {
            const folderPath = path.join(srcFolderPath, folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
        });
        // create files
        const files = [
            "api/index.ts",
            "components/index.ts",
            "hooks/index.ts",
            "model/index.ts",
            "pages/index.ts",
            "routes/index.ts",
            "store/index.ts",
            "utils/index.ts",
        ];
        files.forEach((file) => {
            const filePath = path.join(srcFolderPath, file);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, "");
            }
        });
        // TODO: Create next version of the extension with updates of well defined folder structure of its own
        vscode.window.showInformationMessage(`React folder structure created in ${folderPath}`);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
// import * as vscode from "vscode";
// import * as fs from "fs";
// import * as path from "path";
// export function activate(context: vscode.ExtensionContext) {
//   let disposable = vscode.commands.registerCommand(
//     "extension.createReactFolderStructure",
//     () => {
//       const srcFolderPath = vscode.window.showOpenDialog({
//         canSelectFiles: false,
//         canSelectFolders: true,
//         canSelectMany: false,
//         openLabel: "Select folder",
//       });
//       srcFolderPath.then((uri) => {
//         if (!uri) {
//           vscode.window.showErrorMessage("No folder selected");
//           return;
//         }
//         const srcFolderPath = uri[0].fsPath;
//         if (!fs.existsSync(srcFolderPath)) {
//           vscode.window.showErrorMessage("No folder open in VS Code");
//           return;
//         }
//         const folders = [
//           "api",
//           "components",
//           "hooks",
//           "model",
//           "pages",
//           "routes",
//           "store",
//           "utils",
//         ];
//         folders.forEach((folder) => {
//           const folderPath = path.join(srcFolderPath, folder);
//           if (!fs.existsSync(folderPath)) {
//             fs.mkdirSync(folderPath);
//           }
//         });
//         // create files
//         const files = [
//           "api/index.ts",
//           "components/index.ts",
//           "hooks/index.ts",
//           "model/index.ts",
//           "pages/index.ts",
//           "routes/index.ts",
//           "store/index.ts",
//           "utils/index.ts",
//         ];
//         files.forEach((file) => {
//           const filePath = path.join(srcFolderPath, file);
//           if (!fs.existsSync(filePath)) {
//             fs.writeFileSync(filePath, "");
//           }
//         });
//       });
//       vscode.window.showInformationMessage(
//         "React folder structure created successfully!"
//       );
//     }
//   );
//   context.subscriptions.push(disposable);
// }
// export function deactivate() {}
//# sourceMappingURL=extension.js.map