// Getting the relevant tags
const input = document.querySelector('input[name=tarefa]')
const botao = document.querySelector('#botao')
const lista = document.querySelector('#lista')
const card = document.querySelector('.card')

// Checking if the db exists
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

function renderTasks() {
    // Limpando a tela para evitar renderizar a lista mais de uma vez
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
    // Salvando os dados no storage do navegador, apenas dados simples podem ser
    // armazenados (string, boolean, number, ...).
    // Chave, valor
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