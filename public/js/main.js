const task_input = document.querySelector('.input-add');
const task_desc = document.querySelector('.input-desc');
const task_status = document.querySelector('.input-status');


const task_filter = document.querySelector('.input-filter');
const add_btn = document.querySelector('.add-task-button');
const filter_btn = document.querySelector('.filter-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');
/*const delete_all_btn = document.querySelector('.delete-all-btn');*/
const ascendente_btn = document.querySelector('.ascendente-btn');
const descendente_btn = document.querySelector('.descendente-btn');
let ordem = -1;

let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('DOMContentLoaded', showAllTodos);

//get random unique id
function getRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addToDo(task_input) {
    let task = {
        id: getRandomId(),
        task: task_input.value,
        desc: task_desc.value,
        status: task_status.value
    }
    todos.push(task);
}

task_input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && task_input.value.length > 0) {
        addToDo(task_input);
        saveToLocalStorage();
        task_input.value = '';
        showAllTodos();
    }
});

filter_btn.addEventListener('click', () => {
    showAllTodos();
});

add_btn.addEventListener('click', () => {
    if (task_input.value === '') {
        showAlertMessage('Please enter a task', 'error');
    } else {
        addToDo(task_input);
        saveToLocalStorage();
        showAllTodos();
        task_input.value = '';
        task_desc.value = '';
        showAlertMessage('Task added successfully', 'success');
    }
});

ascendente_btn.addEventListener('click', () => {
    ordem = 1;
    showAllTodos();
});

descendente_btn.addEventListener('click', () => {
    ordem = -1;
    showAllTodos();
});

/*delete_all_btn.addEventListener('click', clearAllTodos);*/

//show all todos
function showAllTodos() {
    todos_list.innerHTML = '';
    todos.sort((a, b) => a.task < b.task ? -1 * ordem : 1 * ordem);
    todos.forEach((todo) => {
        if (todo.task.includes(task_filter.value)) {
            todos_list.innerHTML += `
                <li class="todo-item" data-id="${todo.id}">
                    <p class="task-body">
                        ${todo.task} - ${todo.desc} (${todo.status})
                    </p>
                    <div class="todo-actions">
                        <button class="btn btn-success" onclick="editTodo('${todo.id}')">
                            <i class="bx bx-edit-alt bx-sm"></i>    
                        </button>
                        <button class="btn btn-error" onclick="deleteTodo('${todo.id}')">
                            <i class="bx bx-trash bx-sm"></i>
                        </button>
                    </div>
                </li>
            `;
        }});
}

//save todos to local storage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//show alert message
function showAlertMessage(message, type) {
    let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `
    alert_message.innerHTML = alert_box;
    alert_message.classList.remove('hide');
    alert_message.classList.add('show');
    setTimeout(() => {
        alert_message.classList.remove('show');
        alert_message.classList.add('hide');
    }, 3000);
}

//delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    showAlertMessage('Todo deleted successfully', 'success');
    showAllTodos();
}

//edit todo
function editTodo(id) {
    let todo = todos.find(todo => todo.id === id);
    task_input.value = todo.task;
    task_desc.value = todo.desc;
    task_status.value = todo.status;    
    todos = todos.filter(todo => todo.id !== id);
    add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
    saveToLocalStorage();
    add_btn.addEventListener('click', () => {
        add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>"; 
        showAlertMessage('Todo updated successfully', 'success');
    });
}

//clear all todos
function clearAllTodos() {
    if(todos.length > 0) {
        todos = [];
        saveToLocalStorage();
        showAlertMessage('All todos cleared successfully', 'success');
        showAllTodos();
    }else{
        showAlertMessage('No todos to clear', 'error');
    }
}