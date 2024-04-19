#! /usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";

function loadToDoList(): string[] {
  try {
    const data = fs.readFileSync("todoList.txt", "utf8");
    return data.split("\n").filter(Boolean);
  } catch (err) {
    console.log("No existing to-do list found.");
    return [];
  }
}

function saveToDoList(toDo: string[]): void {
  const data = toDo.join("\n");
  fs.writeFileSync("todoList.txt", data);
  console.log("To-do list saved successfully.");
}

async function main() {
  let toDo: string[] = loadToDoList();
  let condition = true;

  while (condition) {
    const myList = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "Choose an action:",
        choices: [
          "Add Task",
          "Mark Task as Completed",
          "Remove Task",
          "View Tasks",
          "Save and Exit",
        ],
      },
      {
        name: "task",
        type: "input",
        message: "Enter the task:",
        when: (answers) => answers.action === "Add Task",
      },
      {
        name: "taskId",
        type: "list",
        message: "Select the task to mark as completed:",
        choices: toDo,
        when: (answers) => answers.action === "Mark Task as Completed",
      },
      {
        name: "removeId",
        type: "list",
        message: "Select the task to remove:",
        choices: toDo,
        when: (answers) => answers.action === "Remove Task",
      },
    ]);

    switch (myList.action) {
      case "Add Task":
        toDo.push(myList.task);
        break;
      case "Mark Task as Completed":
        const index = toDo.indexOf(myList.taskId);
        if (index !== -1) {
          toDo[index] = `${toDo[index]} (Completed)`;
        }
        break;
      case "Remove Task":
        toDo = toDo.filter((task) => task !== myList.removeId);
        break;
      case "View Tasks":
        console.log("Your To-Do List:");
        console.log(toDo.join("\n"));
        break;
      case "Save and Exit":
        saveToDoList(toDo);
        condition = false;
        break;
    }
  }
}

main();
