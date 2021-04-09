import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  filterArgs = 'all';
  listOfTodo = [];
  itemsLeft: number = 0;
  todoInput = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }
  addTodo(params) {
    if (params.target.value) {
      this.listOfTodo = [...this.listOfTodo, {
        value: params.target.value,
        completed: false,
        id: uuid.v4()
      }];
    }
    this.checkActiveTodos();
    this.todoInput.reset();
  }

  toggleStatus(params, id) {
    const temp: Array<any> = JSON.parse(JSON.stringify(this.listOfTodo));
    let todo = temp.find(res => res.id === id);
    todo.completed = params ? true : false;
    this.listOfTodo = JSON.parse(JSON.stringify(temp));
    this.checkActiveTodos();
  }
  checkActiveTodos() {
    let count = 0;
    this.listOfTodo.forEach((res) => {
      if (!res.completed) {
        count++;
      }
    });
    this.itemsLeft = count;
  }

  clearCompletedItems() {
    const temp: Array<any> = JSON.parse(JSON.stringify(this.listOfTodo));
    let tempHold = temp.filter(res => res.completed === false);
    this.listOfTodo = JSON.parse(JSON.stringify(tempHold));
  }

  triggerFilterChange(params) {
    this.filterArgs = params;
  }

  deleteTodo(id) {
    const temp: Array<any> = JSON.parse(JSON.stringify(this.listOfTodo));
    let tempHold = temp.filter(res => res.id !== id)
    this.listOfTodo = JSON.parse(JSON.stringify(tempHold));
    this.checkActiveTodos();
  }

}
