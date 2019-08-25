import typescript from 'rollup-plugin-typescript'
import prettier from 'rollup-plugin-prettier';

module.exports = {
    input: 'src/ts/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'esm'
    },
    plugins: [
        typescript(),
        prettier({
            tabWidth: 2,
            singleQuote: false,
        }),
    ]
}