// sift_up
// sift_down
// insert
// extractMax
// peek

class MaxHeap {
    constructor() {
        this.state = [];
    }



    /*  Params:
        value: Object({
            score: <Number>,
            name: <String>
        })
    */
    insert(value) {
        this.state.push(value);
        this.siftUp(this.state.length - 1);    
    }

    extractMax() {
        const max = this.state[0];
        this.state[0] = this.state[this.state.length - 1]; // Overwrite current max with leaf node

        /*
            Implicitly delete last element from state via setting array length to length - 1
            This prevents us from having to manage index state on the level of our class
        */
        this.state.length = this.state.length - 1; 

        this.siftDown(0);

        return max;
    }

    getParentIndex(i) {
        return Math.floor((i-1)/2);
    }

    getLeftChildIndex(i) {
        return (i*2)+1;
    }

    getRightChildIndex(i) {
        return (i*2)+2;
    }

    getGreaterIndex(i) {
        let leftChildIndex = this.getLeftChildIndex(i);
        let rightChildIndex = this.getRightChildIndex(i);

        const leftChild = this.state[leftChildIndex];
        const rightChild = this.state[rightChildIndex];


        if (!rightChild) {
            return leftChildIndex;
        }

        if (leftChild.score === rightChild.score) {
            if (rightChild.name.toLowerCase().localeCompare(leftChild.name.toLowerCase()) > 0) { 
                return leftChildIndex;
            } else {
                return rightChildIndex;
            }
        }
        

        if (leftChild.score > rightChild.score) {
            return leftChildIndex;
        } else {
            return rightChildIndex;
        } 
    }

    /*
        Params:
            i: <Number>  //index value
            k: <Number>  //index value

        returns positive integer if a is greater
        returns negative integer if b is greater
        returns 0 if values are equal
    */
    comparator(i,k) {
        const a = this.state[i];
        const b = this.state[k];

        if (!a || !b) {
            return 0;
        }

        if (a.score !== b.score) {
            return a.score - b.score;
        }

        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
    }

    swap(i,k) {
        const temp = this.state[i];
        this.state[i] = this.state[k];
        this.state[k] = temp;
    }

    siftUp(i) {
        let parentIndex = this.getParentIndex(i);
        let trav = i;

        while (this.state[parentIndex] && this.comparator(parentIndex, trav) < 0) {
            this.swap(trav, parentIndex);
            trav = parentIndex;
            parentIndex = this.getParentIndex(trav);
        }
    }

    siftDown(i) {
        let greaterIndex = this.getGreaterIndex(i);
        let trav = i;

        /*
            Execute as long as either there is a lessor child
            Or until we reach bottom of tree
        */
        while (this.comparator(greaterIndex, trav) > 0) {
            this.swap(trav, greaterIndex);
            trav = greaterIndex;
            greaterIndex = this.getGreaterIndex(trav);

            if (this.state[greaterIndex] === undefined) {
                return;
            }
        }
    }
}


export default MaxHeap;
