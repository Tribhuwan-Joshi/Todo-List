/* Imports js */
import { format } from 'date-fns';
import "./style.css";
import { renderTask } from "./domManipulation.js";

// import classes
import {Task} from './task'

// link Icon
import Icon from "./imgs/icon.png";
const linkIcon = document.querySelector('link[rel="icon"]');
linkIcon.href = Icon;



/* header style and object logic */

// Github Icon code
import githubIcon from "./imgs/github.png";

const githubImg = document.querySelector(".github-icon");
githubImg.src = githubIcon
const githubName = document.querySelector(".github-name");

githubImg.addEventListener("mouseover", () => {
    githubName.style.display = "block";
});
githubImg.addEventListener("mouseout", () => {
    githubName.style.display = "none";
});

// tick Logo
import tickLogoSrc from "./imgs/tickLogo.png";
const tickLogo = document.querySelector("div img.tick-logo");
tickLogo.src = tickLogoSrc;





/* Navbar style and object logic */

import home from "../src/imgs/home.png";
const homeImg = document.querySelector(".home-img");
homeImg.src = home;

import today from "../src/imgs/today.png";
const todayImg = document.querySelector(".today-img");
todayImg.src = today;

import week from "../src/imgs/week.png";
const weekImg = document.querySelector(".week-img");
weekImg.src = week;


// Projects
import projectIcon from '../src/imgs/project.png'
const projectLogo = document.querySelector(".project-icon");
projectLogo.src = projectIcon;

import projectAdd from '../src/imgs/projectAdd.png'
const projectAddImg = document.querySelector(".project-add-img");
projectAddImg.src = projectAdd;


// Project bars onClick effect
const pages = document.querySelectorAll('[class*="-index"]');
pages.forEach((page) => {
    page.addEventListener("click", () => {
        pages.forEach((page) => {
            page.classList.remove("bg-gray-100");
        });
        page.classList.add("bg-gray-100");
    });
});











/* Main { header and Container} */
import editSrc from "../src/imgs/edit.png";
import taskAddIcon from "../src/imgs/taskAdd.png";
const addTaskDiv = document.querySelector(".addTask-btn");
const addTaskIcon = document.querySelector("img.add-task-icon")
addTaskIcon.src = taskAddIcon;
addTaskDiv.addEventListener("click", showAddForm);

// container Form

const containerAdd = document.querySelector(".container-addTask");
function showAddForm() {
    containerAdd.style.display = "flex";
}
const taskName = document.querySelector(".container-addTask input#task-name");
const taskNote = document.querySelector(".container-addTask input#task-note");
const priority = document.querySelectorAll(
    '.container-addTask input[name="priority"]'
);
const dueDate = document.querySelector(".container-addTask input#due-date");
const addBtn = document.querySelector(".container-addTask .add-btn");
addBtn.addEventListener("click", addnewTask);
const cancelBtn = document.querySelector(".container-addTask .cancel-btn");
cancelBtn.addEventListener("click", hideTaskForm);



// append task

const projects = document.querySelector(".all-projects");

let uniqueId = 0;
let priorityValue;

function addnewTask() {
    for (const i of priority) {
        if (i.checked) {
            priorityValue = i.value;
        }
    }
    
    if (!(taskName.value && priorityValue && dueDate.value)) {
        alert("Please fill required fields");
    } else {
        let taskDate = new Date(dueDate.value);

        let formattedDate = format(taskDate, "dd MMM yyyy");

        renderTask(
            taskName.value,
            taskNote.value,
            priorityValue,
            formattedDate,
            uniqueId
        );
        const newTask = new Task(
            taskName.value,
            taskNote.value,
            priorityValue,
            taskDate,
            uniqueId++
        );

        containerAdd.style.display = "none";
        taskName.value = "";
        taskNote.value = "";
        dueDate.value = "";
    }
}

function hideTaskForm() {
    containerAdd.style.display = "none";
    taskName.value = "";
    taskNote.value = "";
    dueDate.value = "";
}









