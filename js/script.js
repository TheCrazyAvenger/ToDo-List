'use strict';

const addButton = document.getElementById('add');
const headerInput = document.querySelector('.header-input');
const todoUl = document.querySelector('.todo');
const completedUl = document.getElementById('completed');
const removeButton = document.querySelectorAll('.todo-remove');
const completeButton = document.querySelectorAll('.todo-complete');
const form = document.querySelector('.todo-control');

let data = {
    todo: [],
    completed: []
}

const checkInput = () => {
    const value = headerInput.value;
    if(value.length >= 1) {
        addTask();
    } else {
        alert('Введите цель');
    }
}

const completeTask = (item) => {
    const li = item.parentNode.parentNode;
    const liParent = li.parentNode;
    const id = liParent.id;
    const liText = li.textContent;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(liText), 1);
        data.completed.push(liText);
        saveData();
        completedUl.appendChild(li);
    }
    if (id === 'completed') {
        data.completed.splice(data.completed.indexOf(liText), 1);
        data.todo.push(liText);
        saveData();
        todoUl.appendChild(li);
    }
}

const removeLi = (item) => {
    const li = item.parentNode.parentNode;
    const liParent = li.parentNode;
    const id = liParent.id;
    const liText = li.textContent;

    if(id === 'todo') {
        data.todo.splice(data.todo.indexOf(liText), 1);
        saveData();
    }
    if(id === 'completed') {
        data.completed.splice(data.completed.indexOf(liText), 1);
        saveData();
    }

    liParent.removeChild(li);
}

const addTask = (item, text) => {
    const newLi = document.createElement('li');
    const newP = document.createElement('p');
    const buttonsDiv = document.createElement('div');
    const removeButton = document.createElement('button');
    const completeButton = document.createElement('button');

    newLi.classList.add('todo-item');
    newP.textContent = headerInput.value || text;
    buttonsDiv.classList.add('todo-buttons');
    removeButton.classList.add('todo-remove');
    completeButton.classList.add('todo-complete');

    newLi.appendChild(newP);
    newLi.appendChild(buttonsDiv);
    buttonsDiv.appendChild(removeButton);
    buttonsDiv.appendChild(completeButton);

    if(item == todoUl){
        todoUl.appendChild(newLi)
        data.todo.push(headerInput.value || text);
    }
    if(item == completedUl){
        completedUl.appendChild(newLi);
        data.completed.push(headerInput.value || text);
    }
    if(item !== todoUl && item !== completedUl) {
        todoUl.appendChild(newLi)
        data.todo.push(headerInput.value || text);
    }

    completeButton.addEventListener('click', (event) => {
        completeTask(event.target);
    });
    removeButton.addEventListener('click', (event) => {
        removeLi(event.target);
    });

}

const saveData = () => {
    localStorage.getItem('todo') === null && localStorage.setItem('todo', '');
    localStorage.getItem('completed') === null && localStorage.setItem('completed', '');
  
    let todoArr = localStorage.getItem('todo');
    let completedArr = localStorage.getItem('completed');
    
    todoArr = data.todo;
    completedArr = data.completed;
    localStorage.setItem('todo', todoArr);
    localStorage.setItem('completed', completedArr);
}

addButton.addEventListener('click', checkInput);
addButton.addEventListener('click', saveData);

form.addEventListener('submit', saveData);

document.addEventListener('DOMContentLoaded', ()=> {
    let todoArr = localStorage.getItem('todo');
    let completedArr = localStorage.getItem('completed');
    todoArr !== '' && todoArr.split(',').map(text => { addTask(todoUl, text) }) 
    completedArr !== '' && completedArr.split(',').map(text => { addTask(completedUl, text) })
})