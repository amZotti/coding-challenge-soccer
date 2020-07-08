import MaxHeap from "./maxHeap.mjs";
import parseFile from "./parser.mjs";

const heap = new MaxHeap();
const p = parseFile("./test");

p.then(text => {
    console.log("text:" , text);
});



console.log("heap: ", heap);
