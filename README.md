## Installation

This app uses native `import` and `export` statements rather than using a preprocessor. Our javascript files are named with the `.mjs` extension to support this newer NodeJS functionality.
For this to work you *must* use version **v14.5.0** of node. If you use older version of Node, you may receive a `SyntaxError` exception.

If you are unsure how to install the latest version of NodeJS - [nvm](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/) is a great command line tool for easily changing node versions.

1. **Install nvm** -> `brew install nvm`
2. **Set nvm path** -> `mkdir ~/.nvm;export NVM_DIR=~/.nvm;export NVM_DIR=~/.nvm`
2. **Switch node version** -> `nvm install v14.5.0`

Running `npm install` is not required for core functionality to operate - only for tests to work.

## Operation

`npm start <path to file to process>` 

For example: `npm start tests/sample-input.txt`

### Tests

Run the following commands from project root:

1. `npm install`
2. `npm test`

### Design Decision: Heap

Why implement a custom heap to do sorting? Afterall, the native Javascript `Array.prototype.sort` function performs a quicksort internally which provides O(n logn) time complexity - we could 
use similar comparator logic that our Heap uses with `Array.prototype.sort` to be able to easily sort by both points and names - so why take on the extra burden of using a heap?

There are two reasons a Heap was chosen instead of using native sort - both of these reasons are related to scalability:

1. If we wanted to upgrade our system to process true streams of data instead of static files, we would need a self-balancing data structure to achieve proper output flow

2. Currently we are dealing with a very small dataset - and out of this dataset, we are selecting k elements (in this case, k=3). In other words, we don't really care about sorting the ENTIRE dataset, we only need the top k elements. Given that we are using a heap - we are doing a partial sorting upon insertion, but only k elements are being sorted in unique order. If we were to scale up and have many more teams/matches per league, a native quicksort would perform a lot of unnecessary operations.
