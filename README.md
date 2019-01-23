# c-cpp-project-generator README

Create C/C++ projects

## Features

Project will generate the following:

Project structure: Common folders like `src` and `bin`

VSCode task: Configurations for building and running your project

## Requirements

- If you are on linux you must install `gcc` and `make`
- If you are on Windows you must install `mingw`

## How to use

- Go to command pallete (usually : ctrl + shift + p)
- To create a project, search for "Create C project" or "Create C++ project"
- To create a file, search for "Create C file" or "Create C++ file"
- Specify the name of the file
- That's it, project will be created and your file will open

## Extension Settings

## Known Issues

- `launch.json` doesn't work with workspace or file names that have spaces
- If you create a file with the same name as an existing file, the existing one will be overwritten
- If you try to create a C/C++ file in an existing project, it sometimes doesn't work and gives the error that the command isn't found.
  - Workaround: Choose to create a C/C++ project instead and it will create the file. Then, you can choose the "Create file" option and it will work. Unknown if recreating the project erases your files in `.vscode`.

## Release Notes

### 1.3.0

- Feature: Can now name the source file to be created when you choose to create a project or file
- Feature: Added two command pallete options to create an individual C/C++ file in the current project's `src` directory

### 1.2.1

- Fix: Fixes minor tabbing issue in source file templates

### 1.2.0

- Feature: The created source file now opens in the editor after creating the project or file.
- Feature: Now uses current workspace as the directory to create the project in. You don't need to choose a folder anymore.
- Improvement: Slightly altered `.c/.cpp` source file templates
- Improvement: Debug now debugs the current source file's outputted file in `bin`
- Improvement: Debug now doesn't use the external console
- Misc: Removed auto creation of `include` and `lib` folders
- Misc: Removed auto creation of `tasks.json` and `Makefile`
- Misc: Removed `VSCodeUI.ts`
- Misc: Removed unnecessary args for Windows systems
- Misc: Removed unnused imports

### 1.1.2

- Fix: Fixes issue that stopped source file from building
- Updated dependencies

### 1.1.1

- Fix vulnerabilities
- Add how to use

### 1.1.0

- Cleanups + fixes
- Doesn't include `c_cpp_properties` anymore, c/c++ extension should find it automatically

### 1.0.4

- Fixed makefile executable on windows for make clean

### 1.0.2

- Fixed include path on linux
- Added icon

### 1.0.1

- Improved debugging
- Better compatibility with windows, mac os, linux
- Added clean task

### 1.0.0

- Initial release
