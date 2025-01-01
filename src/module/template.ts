import { constant } from '@mbext/common';

export default {
    package: {
        scripts: {
            build: "webpack --mode production",
            dev: "webpack --mode development --watch",
            compile: "npx @mbext/project compile",
            update: "npx @mbext/project update"
        },
        devDependencies: {} as { [key: string]: string },
    },
    manifest: {
        format_version: 2,
        header: {
            name: "",
            description: "",
            uuid: "",
            version: [
                1,
                0,
                0
            ],
            min_engine_version: [
                0,
                0,
                0
            ]
        },
        modules: [
            {
                type: "script",
                language: "javascript",
                uuid: "",
                entry: "scripts/index.js",
                version: [
                    1,
                    0,
                    0
                ]
            }
        ],
        dependencies: [],
        metadata: {
            authors: []
        }
    },
    tsconfig: {
        compilerOptions: {
            target: "ESNext",
            moduleResolution: "Node",
            module: "ESNext",
            outDir: "scripts",
            rootDir: "src",
            sourceMap: false
        },
        exclude: [
            "node_modules"
        ]
    },
    dependencies: {
        ...constant.dependencies,
        compiler: ['ts-loader', 'webpack', 'webpack-cli', 'typescript'],
    }
};