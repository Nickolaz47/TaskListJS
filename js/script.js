const input = document.querySelector('input[name=tarefa]')
const botao = document.querySelector('#botao')
const lista = document.querySelector('#lista')
const card = document.querySelector('.card')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

function renderTasks() {
    lista.innerHTML = ''

    for (const task of tasks) {
        let listItem = document.createElement('li')
        listItem.setAttribute('class', 'list-group-item list-group-item-action')
        listItem.innerHTML = task
        listItem.onclick = () => {
            if (window.confirm('Quer mesmo deletar a tarefa?')) {
                deleteTask(this)
            } 
        }
        lista.appendChild(listItem)
    }
}

function deleteSpans() {
    const spans = document.querySelectorAll('span')   

    for (const span of spans) {
        card.removeChild(span)
    }

}

function deleteTask(task) {
    tasks.splice(tasks.indexOf(task.textContent), 1)
    renderTasks()
    saveDataOnStorage()
}

function saveDataOnStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

botao.onclick = () => {    
    deleteSpans()
    if (input.value !== '') {
        tasks.unshift(input.value)
        input.value = ''
        saveDataOnStorage()        
    } else {        
        let span = document.createElement('span')
        span.setAttribute('class', 'alert alert-warning')
        span.innerHTML = 'Você precisa informar a tarefa!'
        card.appendChild(span)
    }    
    renderTasks()
}

renderTasks()