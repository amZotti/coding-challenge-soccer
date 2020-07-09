import MaxHeap from "./maxHeap.mjs";
import parseFile from "./parser.mjs";

const p = parseFile("./test");

const TEXT_WALL = Array(60).fill("=").join("");
//Capitola Seahorses, 3 pts

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
        match.forEach(game => heap.insert(game)); // populate heap with matches
        printResult(heap, i);
    });     
});


