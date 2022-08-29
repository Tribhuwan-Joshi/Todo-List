import editIcon from './imgs/edit.png';

// show new form 
// const containerAdd = document.querySelector("container-addTaskForm");



const allProjects = document.querySelector('.all-projects');
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
// }

function renderTask(allTasks) {
    //clear allproject div
    if (allTasks.length > 0) {
        allProjects.innerHTML = '';

        //add form to allProjects div
        allProjects.innerHTML = `<div
                    class="container-addTask   hidden w-auto md:w-[82%] mx-10 h-max p-2   bg-yellow-200 flex-col md:gap-3 rounded-md px-3">
                    <div class="naming md:flex flex-1 justify-between gap-2">
                        <input type="text" name="task" id="task-name" placeholder="Task *" maxlength="40"
                            class="rounded-sm focus:outline-1 focus:outline-red-400 outline-none px-2 py-1 flex-1" />
                        <input type="text" name="Note" id="task-note" placeholder="Note ( optional )" maxlength="60"
                            required
                            class="rounded-sm mt-2 md:mt-0 focus:outline-1 focus:outline-red-400 outline-none flex-1 md:flex-grow-[2] flex-shrink w-fit px-2 py-1" />
                    </div>
                    <div class="priorDate justify-between flex flex-1 gap-4 flex-wrap">
                        <div class="prior flex gap-2 items-center">
                            <div class="font-semibold mr-4 text-lg">Priority</div>
                            <div class="choices flex flex-wrap gap-2">
                                <div>
                                    <input type="radio" name="priority" id="low" value="low" />
                                    <label for="low" class="text-green-700 font-semibold">Low</label>
                                </div>
                                <div>
                                    <input type="radio" name="priority" id="medium" value="medium" />
                                    <label for="medium" class="text-blue-700 font-semibold">Medium</label>
                                </div>
                                <div>
                                    <input type="radio" name="priority" id="high" value="high" />
                                    <label for="high" class="text-red-700 font-semibold">High</label>
                                </div>
                            </div>
                        </div>
                        <div class="date">
                            <label for="dueDate" class="text-lg font-semibold mr-4">Due</label>
                            <input type="date" name="" id="due-date" class="rounded-md px-2"/>
                        </div>

                        <div class="buttons flex gap-2">
                            <button
                                class="bg-green-600 add-btn rounded-md px-4 py-1 hover:bg-green-700 active:bg-green-600 text-white">
                                Add
                            </button>
                            <button
                                class="bg-red-500 cancel-btn rounded-md px-4 py-1 hover:bg-red-600 active:bg-red-500 text-white">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>`;

        // add all tasks from allTasks array to allProjects div
        allTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task', 'w-[90%]', 'flex-row', 'gap-6', 'mt-2', 'flex', 'items-center', 'mx-2');
            taskElement.style.gap = "20px";
            taskElement.setAttribute('data-id', task.uniqueId);
            let priorityColor;

            if (task.priorityValue === 'high') {
                priorityColor = 'red';
            }
            else if (task.priorityValue === 'medium') {
                priorityColor = 'blue';
            }
            else {
                priorityColor = 'green';
            }
            taskElement.innerHTML = `<div class="checkbox"> <input data-id=${task.uniqueId} type="checkbox" name="done"></div>
                    <div
                        class="task-info w-full  h-full p-2 text-lg flex   border-l-[6px]    bg-yellow-100 justify-between rounded-md cursor-pointer ">
                        <div class="task-name }">${task.taskName}</div>
                        <div class="notes text-sm flex w-max items-center">${task.taskNote}</div>
                        <div class="dueData text-sm flex items-center">${task.dueDate}</div>
</div>
                        <img src="" alt="edit" class="hidden md:flex h-[20px] data-id=${task.uniqueId} edit-btn hover:cursor-pointer hover:mb-1"></img>
                       
                        `;
            taskElement.querySelector('.task-info').style.borderColor = priorityColor;
            taskElement.querySelector('.edit-btn').src = editIcon;
            allProjects.appendChild(taskElement);
        }
        );
    }
    else {
        console.log("Array size is 0");
    }


}

export { renderTask };