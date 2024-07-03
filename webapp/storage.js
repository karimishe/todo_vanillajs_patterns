import { TodoItem, TodoList } from "./classes.js";

const todoList = TodoList.getInstance();

export const LocalStorage = {
  load() {
    if (localStorage.getItem("todos")) {
      const list = JSON.parse(localStorage.getItem("todos"));
      for (let t of list) {
        todoList.add(new TodoItem(t.text));
      }
    }
  },
  save() {
    const array = Array.from(todoList.items);
    localStorage.setItem("todos", JSON.stringify(array));
  },
};

todoList.addObserver(LocalStorage.save);
