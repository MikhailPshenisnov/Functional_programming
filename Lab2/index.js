// Функции для работы с задачами на уровне работы со списками
const addTaskToList = (tasks, text) => [
    ...tasks,
    {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date(),
        completedAt: null,
        expanded: false
    }
];

const updateTaskById = (tasks, id, updates) =>
    tasks.map(task => task.id === id ? {...task, ...updates} : task);

const removeTask = (tasks, id) =>
    tasks.filter(task => task.id !== id);

const switchTaskStatus = (tasks, id) => updateTaskById(tasks, id, {
    completed: !tasks.find(t => t.id === id).completed,
    completedAt: !tasks.find(t => t.id === id).completed ? new Date() : null
});

const switchTaskExpand = (tasks, id) => updateTaskById(tasks, id, {
    expanded: !tasks.find(t => t.id === id).expanded
});

const filterTasks = (tasks, filter) => {
    switch (filter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
};

const sortTasks = (tasks, sortType) => [...tasks].sort((a, b) =>
    sortType === 'timeAsc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt);

// Вспомогательные функции для формата текста задачи и даты
const trimText = (text, maxLength = 32) =>
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
const formatDate = (date) =>
    date ? date.toLocaleString() : '';

// Начальное значение списка задач
const initialState = {
    tasks: [],
    filter: 'all',
    sortType: 'timeDesc'
};

// Глобальная переменная для списка задач
const state = {...initialState};

// Функции для работы с задачами на уровне модели и последующей отрисовкой данных
const addTask = (state) => {
    const input = document.querySelector('.task-input');
    const text = input.value.trim();
    if (text) {
        state.tasks = addTaskToList(state.tasks, text);
        input.value = '';
        render(state);
    }
};

const switchTask = (state, id) => {
    state.tasks = switchTaskStatus(state.tasks, id);
    render(state);
};

const expandTask = (state, id) => {
    state.tasks = switchTaskExpand(state.tasks, id);
    render(state);
};

const deleteTask = (state, id) => {
    state.tasks = removeTask(state.tasks, id);
    render(state);
};

const setFilter = (state, filter) => {
    if (state.filter !== filter) {
        state.filter = filter;
        render(state);
    }
};

const setSort = (state, sortType) => {
    if (state.sortType !== sortType) {
        state.sortType = sortType;
        render(state);
    }
};

// Функция отрисовки карточек задач (без обработчиков)
const renderTask = (state, task) => `
    <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <div class="task-content">
            <span class="task-text ${task.expanded ? 'expanded' : ''}">
                ${task.expanded ? task.text : trimText(task.text)}
            </span>
            <div class="task-times">
                <div>Создано: ${formatDate(task.createdAt)}</div>
                ${task.completed ? `<div>Завершено: ${formatDate(task.completedAt)}</div>` : ''}
            </div>
        </div>
        <button>Удалить</button>
    </li>
`;

// Функция отрисовки модели планировщика задач (также создаются обработчики для кнопок)
const render = (state) => {
    const taskList = document.getElementById('taskList');
    const processedTasks = sortTasks(filterTasks(state.tasks, state.filter), state.sortType);
    const newHTML = processedTasks.map(task => renderTask(state, task)).join('');
    if (taskList.innerHTML !== newHTML) {
        taskList.innerHTML = newHTML;
        taskList.querySelectorAll('.task-item').forEach(item => {
            const id = Number(item.dataset.id);
            item.querySelector('input[type="checkbox"]')
                .addEventListener('change', () => switchTask(state, id));
            item.querySelector('.task-text')
                .addEventListener('click', () => expandTask(state, id));
            item.querySelector('button')
                .addEventListener('click', () => deleteTask(state, id));
        });
    }
};

// Добавление возможности создать задачу на клавишу Enter
document.querySelector('.task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(state);
});

// Начальная отрисовка (на случай если в state есть задачи изначально)
render(state)