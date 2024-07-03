import { TodoItem, TodoList } from "./classes.js";

export class Command {
  name;
  args;

  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
};

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        console.log('adding')
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value.trim();
        const itemToAdd = todoList.find(todoText);
        if (todoText !== "" && itemToAdd == undefined) {
          todoInput.value = "";
          todoList.add(new TodoItem(todoText));
        }
        break;
      case Commands.DELETE:
        console.log('deleting')
        const [textToDelete] = command.args;
        todoList.delete(textToDelete);
        break;
    }
  },
};
