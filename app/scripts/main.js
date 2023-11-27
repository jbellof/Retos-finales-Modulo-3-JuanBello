// main.js
var tasks = [];

var Task = function(description, isCompleted) {
    this.description = description;
    this.isCompleted = isCompleted;
};

function addTask(tasks, description, isCompleted = false) {
    var newTasks = [].concat(tasks);
    newTasks.push(new Task(description, isCompleted));
    return newTasks;
}

function renderList(node, tasks) {
    node.innerHTML = '';

    var fragment = document.createDocumentFragment();

    tasks.forEach(function(task, index) {
        var listItem = createNode('div', task.description, { className: 'list-item' });
        var deleteButton = createDeleteButton(index);
        appendChildren(listItem, [deleteButton]);
        fragment.appendChild(listItem);
    });

    node.appendChild(fragment);
}

function createDeleteButton(taskIndex) {
    var deleteButton = createNode('button', 'Eliminar', { type: 'button', className: 'delete-button' });
    deleteButton.addEventListener('click', function() {
        handleDeleteTask(taskIndex);
    });
    return deleteButton;
}

function handleDeleteTask(index) {
    tasks.splice(index, 1);
    renderList(document.getElementById('taskList'), tasks);
}

function createNode(type, child, attrs) {
    var node = document.createElement(type);

    if (attrs) {
        Object.keys(attrs).map(function(attr) {
            node[attr] = attrs[attr];
        });
    }

    if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
    } else {
        node.appendChild(child);
    }

    return node;
}

function appendChildren(node, children) {
    var documentFragment = document.createDocumentFragment();

    children.forEach(function(child) {
        documentFragment.appendChild(child);
    });

    node.appendChild(documentFragment);
}

var addButton = document.getElementById('addButton');
addButton.addEventListener('click', handleClick);

function handleClick() {
    var input = document.getElementById('taskInput');
    if (input.value !== '') {
        tasks = addTask(tasks, input.value);
        input.value = '';
        renderList(document.getElementById('taskList'), tasks);
    }
}

// Línea para renderizar la lista inicialmente (si es necesario)
// renderList(document.getElementById('taskList'), tasks);
