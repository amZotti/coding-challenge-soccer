import fs from "fs";

const SCORE_REGEX_MATCHER = /[0-9]+/g;
const NAME_REGEX_MATCHER = /[a-zA-Z ]+/g;

const WIN_POINTS = 3;
const TIE_POINTS = 1;

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


function processMatches(scores) {
    let matchResult = {};
    const leagueResults = [];
    const accumulator = {};

    for (let i = 0;i < scores.length;i += 2) {
        let team1 = extractName(scores[i]);
        let team2 = extractName(scores[i+1]);

        let score1 = extractScore(scores[i]);
        let score2 = extractScore(scores[i+1]);

        if (matchResult[team1] !== undefined || matchResult[team2] !== undefined) { // All previous games of last match have been played - store previous result and create new result object
            leagueResults.push(matchResult);
            matchResult = {};
        }

        if (!accumulator[team1]) {
            accumulator[team1] = 0;
        }

        if (!accumulator[team2]) {
            accumulator[team2] = 0;
        }

        if (score1 < score2) {
            accumulator[team2] += WIN_POINTS;
        } else if (score1 > score2) {
            accumulator[team1] += WIN_POINTS;
        } else {
            accumulator[team1] += TIE_POINTS;
            accumulator[team2] += TIE_POINTS;
        }

        matchResult[team1] = accumulator[team1];
        matchResult[team2] = accumulator[team2];
    }
    leagueResults.push(matchResult);

    return leagueResults;
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

            
    
            const matches = processMatches(cleanInput);

            for (let i = 0;i < matches.length-1;i++) {
                if (Object.keys(matches[i]).length !== Object.keys(matches[i+1]).length) {
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
