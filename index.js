#! /usr/bin/env node
import inquirer from "inquirer";
let toDo = [];
let condition = true;
while (condition) {
    let myList = await inquirer.prompt([
        {
            name: "todoList",
            type: "input",
            message: "Add any item in your todo list",
        },
        {
            name: "add",
            type: "confirm",
            message: "would you like to add more in your list?",
            default: true,
        },
    ]);
    toDo.push(myList.todoList);
    condition = myList.add;
    console.log(toDo);
    for (let i = 0; i < toDo.length; i++) {
        console.log(toDo[i]);
    }
}
