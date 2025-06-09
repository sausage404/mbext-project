# Project Management for Minecraft Bedrock deverlopment

[![npm version](https://badge.fury.io/js/%40mbext%2Fproject.svg)](https://www.npmjs.com/package/@mbext/project)
[![license](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://github.com/sausage404/mbext-project/blob/main/LICENSE)

`@mbext/project` is a library that provides a set of tools for managing Minecraft Bedrock Edition add-on projects. It includes features such as project configuration, file management, and more.

> New version 1.3.0 is released!
> - Remove secret command because it's not supported
> - Add support for mcpack to compile
> - Change initialization command to require options `--behavior` or `--resource`
> - Add `--no-version` option to compile command

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

   - `--behavior` or `-b` - Initialize a new behavior pack project

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

   - `--version` or `-v` - Compile the project without version

   - `--mcpack` or `-p` - Compile the project as a mcpack

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

4. **Import a project**

   ```bash
   npx @mbext/project import
   ```

   #### Options

   - `--resource` or `-r` - Import a resource pack project
   - `--behavior` or `-b` - Import a behavior pack project
  
   This command will import a project to the bds server.

5. **Start the production server**

   ```bash
   npm run dev
   ```

   This command will start a production server with hot reloading enabled.

6. **Build the project for production**

   ```bash
   npm run build
   ```

   This command will build the project for production, creating a minified version of the project.
