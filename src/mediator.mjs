import MaxHeap from "./maxHeap.mjs";
import parseFile from "./parser.mjs";

const filePath = process.argv[2];

const p = parseFile(filePath);

const TEXT_WALL = Array(60).fill("=").join("");

function printLine({ name, score }) {
    console.log(`${name}, ${score} pts`);
}

function printResult(heap, matchNumber) {
    console.log(`\n Match Day: ${matchNumber + 1}`);
    console.log(TEXT_WALL);
    printLine(heap.extractMax());
    printLine(heap.extractMax());
    printLine(heap.extractMax());
    console.log(TEXT_WALL);
    console.log("\n");
}

p.then(matches => {
    matches.forEach((match, i) => {
        const heap = new MaxHeap();
        for (let key in match) {
            if (match.hasOwnProperty(key)) {
                heap.insert({
                    name: key,
                    score: match[key],
                });
            }
        }
        printResult(heap, i);
    });     
});

