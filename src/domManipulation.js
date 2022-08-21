import { format } from 'date-fns';
import editIcon from './imgs/edit.png';
const allProjects = document.querySelector('.all-projects');

function renderTask(taskName, taskNote, priorityValue, dueDate) {
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
   

    newTask.classList.add('task', 'w-[90%]', 'gap-4', 'mt-2', 'flex', 'items-center', 'mx-2');    
    newTask.innerHTML = `<div class="checkbox"> <input type="checkbox" name="done" id=""></div>
                    <div
                        class="task-info w-full h-full p-2 text-lg flex   border-l-[6px]    bg-yellow-100 justify-between rounded-md cursor-pointer ">
                        <div class="task-name border-${priorityColor}-500}">${taskName}</div>
                        <div class="notes text-sm flex w-max items-center">${taskNote}</div>
                        <div class="dueData text-sm flex items-center">${dueDate}</div>
                        </div>
                        <img src="" alt="edit" class="h-[20px] edit-btn hover:cursor-pointer hover:mb-1"></img>
                        `
    // add priority color css to task-info
    newTask.querySelector('.task-info').style.borderColor = priorityColor;
    // add edit-icon src to task-info
    newTask.querySelector('.edit-btn').src = editIcon;

    
   // add to allprojects
    allProjects.appendChild(newTask);
    

}

export { renderTask };