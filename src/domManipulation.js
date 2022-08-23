import editIcon from './imgs/edit.png';

// show new form 
const containerAdd = document.querySelector("container-addTaskForm");



const allProjects = document.querySelector('.all-projects');
let tasks = [];
function addEventListeners() {
    // add event listener to checkbox
    const checkbox = document.querySelectorAll('.checkbox input');
    checkbox.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            const task = checkbox.parentElement.parentElement;
            if (checkbox.checked) {
                allProjects.removeChild(task);
                let id = checkbox.getAttribute('data-id');
                tasks = tasks.filter(task => task.id !== id);
                
            }
           
        }
        );
    }
    );
    // add event listener to edit-btn
    const editBtn = document.querySelectorAll('.edit-btn');
    // editBtn.forEach(editBtn => {
    //     editBtn.addEventListener('click', () => {
    //         const task = editBtn.parentElement.parentElement;
    //         task.classList.toggle('bg-gray-100');
    //     }
    //     );
    // }
    // );
}

function renderTask(taskName, taskNote, priorityValue, dueDate,uniqueId) {
    const newTask = document.createElement('div');
    let priorityColor;

    if (priorityValue === 'high') {
        priorityColor = 'red';
    }
    else if (priorityValue === 'medium') {
        priorityColor = 'blue';
    }
    else {
        priorityColor = 'green';
    }
   

    newTask.classList.add('task', 'w-[90%]', 'gap-6', 'mt-2', 'flex', 'items-center', 'mx-2');    
    newTask.innerHTML = `<div class="checkbox"> <input data-id=${uniqueId} type="checkbox" name="done" id=""></div>
                    <div
                        class="task-info w-full h-full p-2 text-lg flex   border-l-[6px]    bg-yellow-100 justify-between rounded-md cursor-pointer ">
                        <div class="task-name border-${priorityColor}-500}">${taskName}</div>
                        <div class="notes text-sm flex w-max items-center">${taskNote}</div>
                        <div class="dueData text-sm flex items-center">${dueDate}</div>
                        </div>
                        <img src="" alt="edit" class="h-[20px] data-id=${uniqueId} edit-btn hover:cursor-pointer hover:mb-1"></img>
                        `
    // add priority color css to task-info
    newTask.querySelector('.task-info').style.borderColor = priorityColor;
    allProjects.appendChild(newTask);
    // add edit-icon src to task-info
    // let editBtn = document.querySelectorAll('.edit-btn');
    // editBtn = editBtn[editBtn.length -1]
    // editBtn.src = editIcon;
    newTask.querySelector('.edit-btn').src = editIcon;
    tasks.push(newTask);
    console.log(tasks);
    addEventListeners(newTask);
   // add to allprojects
    
    

}

export { renderTask };