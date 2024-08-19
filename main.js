class LinkedList {
    constructor(){
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    append = function(value){
        if(this.head == null){
            this.head = new Node(value);
            this.size += 1;
        } else if(this.tail === null){
            this.tail = new Node(value, null, this.head);
            this.head.next = this.tail;
            this.size += 1;
        } else {
            this.tail.next = new Node(value, null, this.tail);
            this.tail = this.tail.next;
            this.size += 1;
        }
    }

    prepend = function(value){
        if(this.head == null){
            this.head = new Node(value);
            this.size += 1;
        } else if(this.head.next == null){
            const newHead = new Node(value, this.head);
            this.head.previous = newHead;
            this.tail = this.head;
            this.head = newHead;
            this.size += 1;
        } else {
            const newHead = new Node(value, this.head);
            this.head.previous = newHead;
            this.head = newHead;
            this.size += 1;
        }
    }

    pop = function(){
        if(this.tail == null && this.head == null){
            console.error("The list is empty!");
        }

        else if(this.tail == null && this.head !== null){
            this.head = null;
            this.size = 0;
        }

        else {
            this.tail = this.tail.previous;
            this.tail.next = null;
            this.size -= 1;
        }
    }

    at = function(index){
        if(index > this.size - 1){
            console.error("The given index is larger than the list size!");
            return null;
        }

        else if(index < 0){
            console.error("Index cannot be a negative value!");
            return null;
        }

        else {
            let i = 0;
            let currentValue = null;
            let currentNode = this.head;
            while(i <= index){
                currentValue = currentNode;
                currentNode = currentNode.next;
                i += 1;
            }
            console.log(`The value at index ${index} is ${currentValue.value}`);
            return currentValue;
        }
    }

    contains = function(value){
        this.nodeResult = null;
        if(value == null){
            console.error("Given value cannot be NULL!");
            return null;
        } else {
            this.nodeResult = this.checkIfValueExists(this.head, value);
            return this.nodeResult;
        }
    }

    checkIfValueExists = function(currentNode, givenValue){
        if(currentNode.next == null && currentNode.value !== givenValue){
            return false;
        } else if(currentNode.value == givenValue){
            return true;
        } 
        else {
            return this.checkIfValueExists(currentNode.next, givenValue);
        }
    }

    find = function(value){
        if(!value){
            console.error("Given value can't be NULL!");
            return;
        }
        let result = this.getValueIndex(this.head, value);
        if(result !== null){
            console.log(`Value "${value}" was found at index ${result}`);
            return;
        } else {
            console.log(`Value "${value}" could not be found!`);
            return;
        }   
    }

    getValueIndex = function(currentNode, value, currentIndex = 0){
        if(currentNode.next === null && currentNode.value !== value){
            return null;
        }
        else if(currentNode.value === value){
            return currentIndex;
        } else {
            return this.getValueIndex(currentNode.next, value, currentIndex + 1);
        }
    }

    toString = function(){
        let string = "";
        let valuesArray = this.createValuesArray(this.head);
        valuesArray.forEach(element => {
            string += `( ${element} ) -> `
        });
        string += `null`;
        return string;
    }

    createValuesArray = function(node, elementsArray = []){
        if(!node.value){
            console.log(`No node value here`);
            return elementsArray;
        }
        else if(node.value && node.next == null){
            elementsArray.push(node.value);
            return elementsArray;
        } else {
            elementsArray.push(node.value);
            return this.createValuesArray(node.next, elementsArray)
        }

    }

}

class Node {
    constructor(value = null, next = null, previous = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}


const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle"); 
list.prepend("test"); 
let res = list.contains("test");
let result = list.toString();
console.log(result);
