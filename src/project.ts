import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as content from './content';

export namespace project {
    export function createFiles(type: string, location: string) {
        try {
            fs.writeFileSync(path.join(location, '.vscode', 'launch.json'), JSON.stringify(content.launch_json, null, 4));
            switch (type) {
                case 'c':
                    fs.writeFileSync(path.join(location, 'src', 'main.c'), content.main_c);
                    vscode.workspace.openTextDocument(path.join(location, 'src', 'main.c'))
                        .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
                    break;
                case 'cpp':
                    fs.writeFileSync(path.join(location, 'src', 'main.cpp'), content.main_cpp);
                    vscode.workspace.openTextDocument(path.join(location, 'src', 'main.cpp'))
                        .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
                    break;
                default:
                    console.log('Invalid file type');
            }
        } catch (err) {
            console.error(err);
        }
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
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage("Open a folder or workspace before creating a project!");
            return;
        }
        const currentFolderWorkspace = vscode.workspace.workspaceFolders[0].uri;
        if (currentFolderWorkspace.fsPath) {
            createFolders(currentFolderWorkspace.fsPath);
            createFiles(type, currentFolderWorkspace.fsPath);
        }
    }
}