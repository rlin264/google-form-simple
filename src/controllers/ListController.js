export default class ListController {
  constructor(array, callback) {
    this.array = array;
    this.callback = callback;
  }

  set(index, newContent) {
    this.callback(set(this.array, index, newContent));
  }

  add(newContent) {
    this.callback([...this.array, newContent]);
  }

  remove(index) {
    this.callback(remove(this.array, index));
  }

  moveUp(index) {
    let newIndex = index === 0 ? index : index - 1;
    this.callback(move(this.array, index, newIndex));
  }

  moveDown(index) {
    let newIndex = index === this.array.length - 1 ? index : index + 1;
    this.callback(move(this.array, index, newIndex));
  }
}

function set(array, index, element) {
    return [...array.slice(0, index), element, ...array.slice(index + 1)];
  }
  
 function remove(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }
  
function insert(array, index, element) {
    return [...array.slice(0, index), element, ...array.slice(index)];
  }
  

function move(array, fromIndex, toIndex) { 
    return insert(remove(array, fromIndex), toIndex, array[fromIndex])
}