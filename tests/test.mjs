import assert from "assert";
import MaxHeap from "../src/maxHeap.mjs";
import parseFile from "../src/parser.mjs";


const APP_ROOT = process.env.PWD; // Must be ran from app root in package.json


describe("Heap", function () {
    it("should oragnize input by score criteria primarily", function () {
        const heap = new MaxHeap();
        const a = { name: "The flying demons", score: 20 };
        const b = { name: "Oranges from the sun", score: 5 };
        const c = { name: "Barbeque at midnight", score: 9 };
        const d = { name: "Black is falling from the sky", score: -10 };
        const e = { name: "hmmm", score: Number.POSITIVE_INFINITY };

        heap.insert(a);
        heap.insert(b);
        heap.insert(c);
        heap.insert(d);
        heap.insert(e);

        assert.deepEqual(heap.extractMax(), e);
        assert.deepEqual(heap.extractMax(), a);
        assert.deepEqual(heap.extractMax(), c);
        assert.deepEqual(heap.extractMax(), b);
        assert.deepEqual(heap.extractMax(), d);
    });

    it("should organize input by name criteria secondarily", function () {
        const heap = new MaxHeap();
        const a = { name: "The flying demons", score: 1 };
        const b = { name: "Oranges from the sun", score: 1 };
        const c = { name: "Barbeque at midnight", score: 1 };
        const d = { name: "Black is falling from the sky", score: 1 };
        const e = { name: "hmmm", score: 1 };

        heap.insert(a);
        heap.insert(b);
        heap.insert(c);
        heap.insert(d);
        heap.insert(e);

        assert.deepEqual(heap.extractMax(), c);
        assert.deepEqual(heap.extractMax(), d);
        assert.deepEqual(heap.extractMax(), e);
        assert.deepEqual(heap.extractMax(), b);
        assert.deepEqual(heap.extractMax(), a);

    });
});

describe("parser", function() {
    it("should parse a text file into an array of match objects", function() {
        const p = parseFile(`${APP_ROOT}/tests/sample-input.txt`);
        p.then(matches => {
            assert.equal(matches.length, 4);
            assert.equal(matches[3]["Aptos FC"], 9);
        });
    });
});
