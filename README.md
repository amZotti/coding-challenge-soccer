## Installation

This app uses native `import` and `export` statements rather than using a preprocessor. Our javascript files are named with the `.mjs` extension to support this newer NodeJS functionality.
For this to work you must use version *v14.5.0* of node. If you use older version of Node, you may receive a `SyntaxError` exception.

If you are unsure how to install the latest version of NodeJS - [nvm](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/) is a great command line tool for easily changing node versions.

`nvm install v14.5.0`

Running `npm install` is not required for core functionality to operate - only for tests to work.

## Operation

`npm start <path to file to process>` 

For example: `npm start tests/sample-input.txt`

### Tests

Run the following commands from project root:

1. `npm install`
2. `npm test`


