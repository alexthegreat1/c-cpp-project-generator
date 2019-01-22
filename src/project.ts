import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as content from './content';

export namespace project {
    export function createFiles(name: string, type: string, location: string) {
        try {
            fs.writeFileSync(path.join(location, '.vscode', 'launch.json'), JSON.stringify(content.launch_json, null, 4));
            switch (type) {
                case 'c':
                    fs.writeFileSync(path.join(location, 'src', name + '.c'), content.main_c);
                    vscode.workspace.openTextDocument(path.join(location, 'src', name + '.c'))
                        .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
                    break;
                case 'cpp':
                    fs.writeFileSync(path.join(location, 'src', name + '.cpp'), content.main_cpp);
                    vscode.workspace.openTextDocument(path.join(location, 'src', name + '.cpp'))
                        .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
                    break;
                default:
                    console.log('Invalid file type');
            }
        } catch (err) {
            console.error(err);
        }
    }

    export async function createFile(type: string) {
        let name;
        const currentFolderWorkspace = vscode.workspace.workspaceFolders[0].uri;
        const location = currentFolderWorkspace.fsPath;

        // TODO: Make this a separate function so createFile and createProject can both call it, no duplicate code
        await vscode.window.showInputBox({
            placeHolder: "Enter name for file",
            value: "main"
        }).then(input => {
            name = input;
        })
        if (name != undefined) {
            if (currentFolderWorkspace.fsPath) {
                try {
                    switch (type) {
                        case 'c':
                            fs.writeFileSync(path.join(location, 'src', name + '.c'), content.main_c);
                            vscode.workspace.openTextDocument(path.join(location, 'src', name + '.c'))
                                .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
                            break;
                        case 'cpp':
                            fs.writeFileSync(path.join(location, 'src', name + '.cpp'), content.main_cpp);
                            vscode.workspace.openTextDocument(path.join(location, 'src', name + '.cpp'))
                                .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
                            break;
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else vscode.window.setStatusBarMessage("Error: Incorrect path");
        }
        else vscode.window.setStatusBarMessage("Error: No name provided");
    }

    export function createFolders(location: string): void {
        content.directories.forEach(function (dir: string) {
            try {
                fs.ensureDirSync(path.join(location, dir));
            } catch (err) {
                console.error(err);
            }
        });
    }

    export async function createProject(type: string) {
        let name;

        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage("Open a folder or workspace before creating a project!");
            return;
        }
        const currentFolderWorkspace = vscode.workspace.workspaceFolders[0].uri;
        await vscode.window.showInputBox({
            placeHolder: "Enter name for file",
            value: "main"
        }).then(input => {
            name = input;
        })
        if (name != undefined) {
            if (currentFolderWorkspace.fsPath) {
                createFolders(currentFolderWorkspace.fsPath);
                createFiles(name, type, currentFolderWorkspace.fsPath);
            }
            else vscode.window.setStatusBarMessage("Error: Incorrect path");
        }
        else vscode.window.setStatusBarMessage("Error: No name provided");
    }
}