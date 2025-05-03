export const dependencies = {
    modules: ['@minecraft/server', '@minecraft/server-ui', '@minecraft/server-net', '@minecraft/server-admin', '@minecraft/server-gametest'],
    plugins: ['@minecraft/vanilla-data', '@minecraft/math'],
    addons: ['@mbext/database', '@mbext/scoreboard']
}

export default {
    package: {
        scripts: {
            build: 'webpack --mode production',
            dev: 'webpack --mode development --watch',
            compile: 'npx @mbext/project compile',
            update: 'npx @mbext/project update'
        },
        devDependencies: {} as { [key: string]: string },
    },
    manifestBP: {
        format_version: 2,
        header: {
            name: '',
            description: '',
            uuid: '',
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
        capabilities: ['script_eval'],
        modules: [
            {
                type: 'script',
                language: 'javascript',
                uuid: '',
                entry: 'scripts/bundle.js',
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
    manifestRP: {
        "format_version": 2,
        "header": {
            "name": "",
            "description": "",
            "uuid": "",
            "version": [
                1,
                0,
                0
            ],
            "min_engine_version": [
                0,
                0,
                0
            ]
        },
        "modules": [
            {
                "type": "resources",
                "uuid": "",
                "version": [
                    1,
                    0,
                    0
                ]
            }
        ]
    },
    tsconfig: {
        compilerOptions: {
            target: 'ESNext',
            moduleResolution: 'bundler',
            module: 'ESNext',
            resolvePackageJsonImports: true,
            sourceMap: false
        },
        exclude: [
            'node_modules'
        ]
    },
    dependencies: {
        ...dependencies,
        compiler: ['ts-loader', 'webpack', 'webpack-cli', 'typescript'],
    }
};