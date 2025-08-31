const fs = require("fs")
const path = require("path")
const {program} = require ("commander")

//visible to command
const todosFilePath = path.join(__dirname,"todos.json");

//readtodo
function readTodos(){
    if(!fs.existsSync(todosFilePath)){
        return []
    } 
    const data = fs.readFileSync(todosFilePath,"utf8");
    return JSON.parse(data || "[]")
}

//writetodo
function writeTodos(todos){
    fs.writeFileSync(todosFilePath,JSON.stringify(todos,null,2),"utf8")
}

//add
program
    .command("add")
    .argument("<Todo.Title>","enter the title you want to add")
    .argument("<time>","enter the time of todo to do at")
    .action((todoTitle,time)=>{
        const todos = readTodos();
        const newTodo = 
        {
            "Title" : todoTitle,
            "Deadline": time
        }

        todos.push(newTodo)
        writeTodos(todos)
        console.log(todoTitle+" ADDED SUCCESSFULLY");
    })


//remove 
program
    .command("remove")
    .argument("<Todo-title>","Enter the title you want to remove from the todo")
    .action((todoTitle)=>{
        const newTodo = readTodos();
        const updatedTodos = newTodo.filter((todo)=>todo.Title !== todoTitle)
            if(newTodo.length===updatedTodos.length){
                console.log("Todo not found!");
            }else {
                writeTodos(updatedTodos)
                console.log("REMOVED");
            }
        
    })

    program.parse();