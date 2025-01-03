# Project Management for Minecraft Bedrock deverlopment

[![npm version](https://badge.fury.io/js/%40mbext%2Fproject.svg)](https://www.npmjs.com/package/@mbext/project)

`@mbext/project` is a library that provides a set of tools for managing Minecraft Bedrock Edition add-on projects. It includes features such as project configuration, file management, and more.

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

## License

This project is licensed under a custom license. The key points of this license are:

1. You may use this software for both personal and commercial purposes.
2. Redistribution is allowed, but you must include this license and the copyright notice.
3. Modification or creation of derivative works is prohibited without explicit permission from the copyright holder.
4. You may not sublicense, sell, lease, or rent this software.
5. Attribution to the original author (sausage404) is required in projects or products using this software.
6. Reverse engineering is prohibited unless explicitly authorized by law.

For the full license text, please see the [LICENSE](./LICENSE) file in this repository.

## Issues

If you encounter any problems or have suggestions, please file an issue on the GitHub repository.