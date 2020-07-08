import fs from "fs";


function sanitizeInput(buffer) {
    const uncleanInput = buffer.toString().split('\n'); // Convert from buffer to array of strings
    return uncleanInput.join(",").split(",").map(txt => txt.trim());
}


function parseFile(filePath) {
    return new Promise((resolution, rejection) => {
        fs.readFile(filePath, function(err, buffer){
            if (err) {
                console.error("Parsing Error while reading input: ", err, "\nPlease consult README for further instructions");
                rejection(err);
            }

            const cleanInput = sanitizeInput(buffer);
            resolution(cleanInput);
        });
    });
}

export default parseFile;
