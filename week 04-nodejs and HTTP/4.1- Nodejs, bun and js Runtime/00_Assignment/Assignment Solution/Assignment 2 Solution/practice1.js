const fs = require("fs");
const { Command } = require("commander");
const path = require("path");
const program = new Command();

//save file path
const todosFilePath = path.join(__dirname,"todos.json");

//readtodo()
function readTodo(){
    if(fs.existsSync(todosFilePath)){
        return[]
    }
    const data = fs.readFileSync(todosFilePath , "utf8");
    return JSON.parse(data || "[]")
}

//writeTodos()
function writeTodos(todos){
    fs.writeFileSync(todosFilePath,JSON.stringify(todos,null,2),"utf8")
}

//command to add
program 
    .command ("add")
    .description("it will add todo to your JSON")
    .argument("<Todo_Title>", "Enter the todo title")
    .action((todoTitle)=>{
        const todos = readTodo();
        const newTodo = 
        {
            Title:todoTitle,
        };

        todos.push(newTodo);
        writeTodos(todos)
        console.log("todo added successfully");
        
    })

program 
    .command("remove")
    .description("it will remove todo from your JSON")
    .argument("<Todo_Title>", "enter todo you want to delete")
    .action((todo_Title)=>{
        let todos = readTodo()
        const updatedTodos = todos.filter((todo)=>todo.Title !==todoTitle) // filter creates a new array that excludes the todo matching the given title.

        if(todos.length === updatedTodos.length) {
            console.log("Todos not found!");
        }else{
            console.log("todo removed successfully");
            
        }
    })

    program.parse();