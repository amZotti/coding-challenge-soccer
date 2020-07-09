import fs from "fs";

const SCORE_REGEX_MATCHER = /[0-9]+/g;
const NAME_REGEX_MATCHER = /[a-zA-Z ]+/g;

// Convert from buffer to array of strings
function bufferToStrings(buffer) {
    let strings = [];

    // Normalize all the league data
    // This loop handles malformed input whereby there are extra newline characters
    // newline is our delimiter between matches, so we want to strip out any newlines
    // Which do not delimit actual relevant data
    buffer.toString().split('\n').forEach(str => {
        if (str !== "") {
            strings.push(str); 
        }
    }); 
    return strings;
}

function sanitizeInput(buffer) {
    let uncleanInput = bufferToStrings(buffer);
    return uncleanInput.join(",").split(",").map(txt => txt.trim()); // Normalize the match data on the per line basis
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
    Value to extract: Points per game for every team
    Return value: Array()
*/







/*
    Our error policy for input is as follows: We group according to occurence - the segment of a given team does not matter, only the occurence.
    This means if a user inputs the teams out of order, we will not throw any errors.
    Errors will only be thrown if lines of input are malformed or if teams/matches are imbalanced.
*/
function groupByMatches(input) {
   const gamesPlayedSoFar = {};
   const matches = [];

   input.forEach(value => {
            // Need to redo logic to translate score to points per match
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
