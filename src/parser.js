var fs  = require("fs");
const path = "./test"; // Dev test

function sanitizeInput(buffer) {
    const uncleanInput = buffer.toString().split('\n'); // Convert from buffer to array of strings
    return ncleanInput.join(",").split(",").map(txt => txt.trim());
}

fs.readFile(path, function(err, buffer){
    if (err) {
        console.error("Parsing Error while reading input: ", err, "\nPlease consult README for further instructions");
        throw new Error(err);
    }

    const cleanInput = sanitizeInput(buffer);
});
