import './style.css'
import { renderTask } from './domManipulation.js';
import { format } from 'date-fns';
import Icon from './imgs/icon.png'
import logo from './imgs/todologo.png'
import home from "../src/imgs/home.png"
import today from "../src/imgs/today.png"
import week from "../src/imgs/week.png"
import add from "../src/imgs/add.png"
import edit from "../src/imgs/edit.png"
import projectIcon from './imgs/project.png'
import addTaskIcon from './imgs/add2.png';

const homeImg = document.querySelector('.home-img');
const todayImg = document.querySelector('.today-img');
const weekImg = document.querySelector('.week-img');
const projectImg = document.querySelector('.project');
const editBtn = document.querySelector('.edit-btn');
const projectLogo = document.querySelector('.project-icon');
const addtaskAdd = document.querySelector('.add-task-icon');

const linkIcon = document.querySelector('link[rel="icon"]')
linkIcon.href = Icon
const Logo = document.querySelector('div img.logo');
Logo.src = logo;
homeImg.src = home;
todayImg.src = today;
weekImg.src = week;
projectImg.src = add;
projectLogo.src = projectIcon;
editBtn.src = edit;
addtaskAdd.src = addTaskIcon;



// addTask
const addTask = document.querySelector('.addTask');
const projects = document.querySelector('.all-projects');
const pageName = document.querySelector('.page-name');
const containerAdd = document.querySelector('.container-addTask');

// form data
const taskName = document.querySelector('.container-addTask input#task-name');
const taskNote = document.querySelector('.container-addTask input#task-note');
const priority = document.querySelectorAll('.container-addTask input[name="priority"]');
const dueDate = document.querySelector('.container-addTask input#due-date');



// cancel button
const cancelBtn = document.querySelector('.container-addTask .cancel-btn');
cancelBtn.addEventListener('click', hideModal);
// add button
const addBtn = document.querySelector('.container-addTask .add-btn');
addBtn.addEventListener('click', addnewTask);

addTask.addEventListener('click', showModal);

function showModal() {

    containerAdd.style.display = 'flex';
}
let priorityValue;
function addnewTask() {
    for (const i of priority) {
        if (i.checked) {
            priorityValue = i.value;
        }
    }

    if (!(taskName.value && taskNote.value && priorityValue && dueDate.value)) {
        alert('Please fill all fields');

    }
    else {

        renderTask(taskName.value, taskNote.value, priorityValue, dueDate.value);
        containerAdd.style.display = 'none';
        taskName.value = '';
        taskNote.value = '';
        dueDate.value = '';

    }


}

function hideModal() {
    containerAdd.style.display = 'none';
    taskName.value = '';
    taskNote.value = '';
    dueDate.value = '';
}



const stPattysDay = new Date('2020/03/17');
const formattedDate1 = format(stPattysDay, 'MM/dd/yyyy');
const formattedDate2 = format(stPattysDay, 'MMMM dd, yyyy');

console.log(formattedDate1);
// => "03/17/2020"

console.log(formattedDate2);