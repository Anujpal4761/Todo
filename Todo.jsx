import { useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import {
    getLocalStorageTodoData,
    setLocalStorageTodoData,
  } from "./TodoLocalStorage";

export const Todo = () => {

    const [tasks, setTasks] = useState(() => getLocalStorageTodoData());
    
   

    const handleFormSubmit = (inputValue) => {
      const {id,content,checked} = inputValue
        if (!content) return;
        const ifTodoContentMatched = tasks.find(
            (curTask) => curTask.content === content
        )
        if(ifTodoContentMatched) return
        setTasks((prevTasks) => [...prevTasks,
            { id, content, checked}
        ]);
        
    };

    setLocalStorageTodoData(tasks);
    
    const handleDeleteTodo = (taskToDelete) => {
        const updatedTasks = tasks.filter((task) => task.content !== taskToDelete);
        setTasks(updatedTasks);
    };
    const handleClearTodoData = () => {
        setTasks([]);
    }
    const handleCheckedTodo = (own) => {
        const updatedTask =tasks.map((curTask) => {
            if (curTask.content === own) {
                return { ...curTask, checked: !curTask.checked };
            }
            return curTask;
        });

        setTasks(updatedTask);
    };
       
    
   
    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
               <TodoDate/>
            </header>
          <TodoForm onAddTodo={handleFormSubmit}/>
            <section className="myUnOrdList">
                <ul>
                    {tasks.map((task) => {
                       return <TodoList 
                       key={task.id}
                       data ={task.content}
                       checked = {task.checked}
                       onHandleDeleteTodo={handleDeleteTodo}
                       onHandleCheckedTodo = {handleCheckedTodo}
                       />
                      })}
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleClearTodoData}>Clear all</button>
            </section>
        </section>
    );
};
