import { format } from 'date-fns';
const containerAddTask = document.querySelector('.container-addTask');

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
    console.log(priorityColor); 

    newTask.classList.add('task', 'w-[90%]', 'gap-4', 'mt-3', 'flex', 'items-center', 'mx-2');    
    newTask.innerHTML = `<div class="checkbox"> <input type="checkbox" name="done" id=""></div>
                    <div
                        class="task w-full h-full p-2 text-lg flex   border-l-[6px] border-${'green'}-600   bg-yellow-100 justify-between rounded-md cursor-pointer ">
                        <div class="task-name">${taskName}</div>
                        <div class="notes text-sm flex w-max items-center">${taskNote}</div>
                        <div class="dueData text-sm flex items-center">${dueDate}</div>
                        </div>
                        <img src="" alt="edit" class="h-[20px] edit-btn hover:cursor-pointer hover:mb-1"></img>
                        `
    
     containerAddTask.parentNode.insertBefore(newTask, containerAddTask);   

}

export { renderTask };