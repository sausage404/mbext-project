# Project Management for Minecraft Bedrock deverlopment

[![npm version](https://badge.fury.io/js/%40mbext%2Fproject.svg)](https://www.npmjs.com/package/@mbext/project)
[![license](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://github.com/sausage404/mbext-project/blob/main/LICENSE)
   
`@mbext/project` is a library that provides a set of tools for managing Minecraft Bedrock Edition add-on projects. It includes features such as project configuration, file management, and more.

> New version 1.2.0, Add initialization resource pack

## Features

- Supports both JavaScript and TypeScript
- Automatic dependency management
- Custom project initialization with interactive prompts
- production mode with hot reloading
- Production builds with minification
- Easy compilation for distribution

## Usage

You can use this package directly with npx without installing it globally.

### Available Commands

1. **Initialize a new project**

   ```bash
   npx @mbext/project init
   ```

   #### Options

   - `--resource` or `-r` - Initialize a new resource pack project

   This command will guide you through creating a new project by asking a series of questions about your project setup.

2. **Compile the project**

   ```bash
   npx @mbext/project compile
   # if you initialized the project successfully, you can also run
   npm run compile
   ```

   #### Options

   - `--original` or `-o` - Cancel rebuild and compile the original project files

   This command will compile your project, creating a zip file containing all necessary files.

3. **Update the project**

   ```bash
   npx @mbext/project update
   # if you initialized the project successfully, you can also run
   npm run update
   ```

   #### Options

   - `--all` or `-a` - Update all packages bundled with the project

   This command will update and edit the project configuration.

4. **Start the production server**

   ```bash
   npm run dev
   ```

   This command will start a production server with hot reloading enabled.

5. **Build the project for production**

   ```bash
   npm run build
   ```

   This command will build the project for production, creating a minified version of the project.

6. **Adjust secret file**

   ```bash
   npx @mbext/project secret
   ```

   #### Options

   If you have to choose -t or -j or -t and -j, only -s must be chosen.

   - `--textures` or `-t` - Adjust secret texture
   - `--json` or `-j` - Adjust secret json
   - `--status` or `-s` - Adjust secret status (`true`, `false`)
   
   This command will adjust the secret file, either by hiding or unhiding the textures, or by obfuscating or unobfuscating the json file.

   ```bash
   cd project # Your project directory must contain a texture folder.
   npx @mbext/project secret -t -s true
   ```