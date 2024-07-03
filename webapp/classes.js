import { observerMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }

  // Value Object pattern
  equals(other) {
    return this.text === other.text;
  }
}

export class TodoList {
  // data
  #data = new Set();
  get items() {
    return this.#data;
  }

  // Singleton pattern
  static instance = null;
  static {
    this.instance = new TodoList();
  }

  static getInstance() {
    return this.instance;
  }
  constructor() {
    if (TodoList.instance) {
      throw new Error(" Use TodoList.getInstacke() to access the list");
    }
  }

  // List behavior

  add(item) {
    const array = Array.from(this.#data);
    const todoExists = array.filter((todo) => todo.equals(item)).length > 0;
    if (!todoExists) {
      this.#data.add(item);
      this.notify();
    }
  }

  delete(todoText) {
    const array = Array.from(this.#data);
    const todoToDelete = array.filter((t) => t.text === todoText)[0];
    this.#data.delete(todoToDelete);
    this.notify();
  }
  find(todoText) {
    const array = Array.from(this.#data);
    return array.find((t) => t.text === todoText);
  }
  replaceList(list) {
    this.#data = list;
    this.notify();
  }
}

// applying the observer mixin to the class
Object.assign(TodoList.prototype, observerMixin);
