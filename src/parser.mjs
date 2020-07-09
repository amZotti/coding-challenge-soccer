import fs from "fs";

const SCORE_REGEX_MATCHER = /[0-9]+/g;
const NAME_REGEX_MATCHER = /[a-zA-Z ]+/g;

function sanitizeInput(buffer) {
    const uncleanInput = buffer.toString().split('\n'); // Convert from buffer to array of strings
    return uncleanInput.join(",").split(",").map(txt => txt.trim());
}

function extractName(str) {
    let result = str.match(NAME_REGEX_MATCHER);

    if (result === null) {
        console.error("Unparsable team name: ", str);
        return "";
    }
    return result[0].trim();
}

function extractScore(str) {
    let result = str.match(SCORE_REGEX_MATCHER);

    if (result === null) {
        console.error("Unparsable score: ", str);
        return 0;
    }

    return Number(result[0]);
}

/*
    Our error policy for input is as follows: We group according to occurence - the segment of a given team does not matter, only the occurence.
*/
function groupByMatches(input) {
   const gamesPlayedSoFar = {};
   const matches = [];

   input.forEach(value => {
        if (value === "") {
            return;
        }

        const teamName = extractName(value);
        const score = extractScore(value);

        let currentGame = gamesPlayedSoFar[teamName];

        if (currentGame === undefined) {
            currentGame = gamesPlayedSoFar[teamName] = 0;
        }

        gamesPlayedSoFar[teamName]++;

    
        let currentMatch = matches[currentGame];

        if (!currentMatch) {
            currentMatch = matches[currentGame] = [];
        }

        currentMatch.push({ name: teamName, score });
    }); 

    return matches;

}


function parseFile(filePath) {
    return new Promise((resolution, rejection) => {
        fs.readFile(filePath, function(err, buffer){
            if (err) {
                console.error("Parsing Error while reading input: ", err, "\nPlease consult README for further instructions");
                rejection(err);
                return;
            }

            const cleanInput = sanitizeInput(buffer);

    
            const matches = groupByMatches(cleanInput);

            for (let i = 0;i < matches.length-1;i++) {
                if (matches[i].length !== matches[i+1].length) {
                    const message = "Team imbalance - some teams did not compete";
                    console.error(message);
                    rejection(message);
                    return;
                }
            }

            resolution(matches);
    
        });
    });
}

export default parseFile;
