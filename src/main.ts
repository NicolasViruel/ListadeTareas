import {v4} from 'uuid'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './style.css'

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const taskList = document.querySelector<HTMLDivElement>('#taskList')

interface Task {
  title: string,
  description: string
  id: string
}

let tasks: Task[] = []

taskForm?.addEventListener('submit' , e=>{
  e.preventDefault()
  const title = taskForm['title'] as unknown as HTMLInputElement
  const description = taskForm['description'] as unknown as HTMLTextAreaElement
  
  
  tasks.push({
    title: title.value,
    description: description.value,
    id: v4()
  })
  
  localStorage.setItem('tasks' , JSON.stringify(tasks));

  Toastify({
    text: "Task Added",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();

  renderTasks(tasks)

  taskForm.reset()
  title.focus()
})
//para ejecutar codigo apenas cargue la pagina y muestre las listas
document.addEventListener('DOMContentLoaded' , () =>{
  
 tasks = JSON.parse(localStorage.getItem('tasks') || '[]')

 renderTasks(tasks);
})

//funcion para generar las tarjetas y crear un div para cada una
function renderTasks(tasks: Task[]){

  taskList!.innerHTML = ''

  tasks.forEach(task =>{
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-zinc-800 mb-1 p-4 roundend-lg hover:bg-zinc-700 hover:cursor-pointer '
    const header = document.createElement('header')
    header.className = 'flex justify-between'

    const title = document.createElement('span')
    title.innerText = task.title

    const btnDelete = document.createElement('button')
    btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md'
    btnDelete.innerText = 'Delete'

    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index , 1)
      localStorage.setItem('tasks' , JSON.stringify(tasks))

      Toastify({
        text: "Task Deleted",
        offset: {
          x: 50,
          y: 10 
        },
      }).showToast();
      renderTasks(tasks)
    })
    
    
    header.append(title)
    header.append(btnDelete)

    const description = document.createElement('p')
    description.innerText = task.description

    const id = document.createElement('p')
    id.innerText = task.id
    id.className = 'text-gray-400 text-xs my-2'
    
    taskList?.append(taskElement)
    
    taskElement.append(header)
    taskElement.append(description)
    taskElement.append(id)
    
  })
}
