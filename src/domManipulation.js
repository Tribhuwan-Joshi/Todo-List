import editIcon from "./imgs/edit.png";
import projDeleteIconSrc from "./imgs/proDelete.png";
import { format } from "date-fns";
import { Project } from "./project";
import { activateCheckboxes, activateEditBtns, allTasks } from "./index";
import { changeContent } from './projectsDOM'

const allProjects = document.querySelector(".all-projects"); // refer to that  of tasks

const projectAddForm = document.querySelector(".project-add-form");

const projectFormbtn = document.querySelector("img.project-add-img");
const projectPlusbtn = document.querySelector("button.project-add-btn");
const projectCancelbtn = document.querySelector("button.project-cancel-btn");

let allProjectArr = JSON.parse(localStorage.getItem("allProjectArr") )|| [];
console.log(allProjectArr);

projectPlusbtn.addEventListener("click", addProject);
projectCancelbtn.addEventListener("click", hideProjectForm);

projectFormbtn.addEventListener("click", () => {
    projectAddForm.classList.remove("hidden");
    projectAddForm.querySelector("input").focus();
    const projectContainer = document.querySelector(".projects-container");
    projectContainer.style.height = "300px";
});

let projectUid = localStorage.getItem("projectUid") || 0;


// add project to projectlists
function addProject() {
    if (allProjectArr.length == 0) {
        projectUid = 0;
        localStorage.setItem("projectUid", 0);
    }
    const projName = projectAddForm.querySelector("input").value;
    if (!allProjectArr.find((i) => i.projectName == projName)) {
        let myProject = Project(projName, projectUid);
        projectUid++;
        localStorage.setItem("projectUid", projectUid);
        allProjectArr.push(myProject);

        localStorage.setItem("allProjectArr", JSON.stringify(allProjectArr));
        projectAddForm.classList.add("hidden");
        // console.log(allProjectArr);
        renderProjects(allProjectArr);

        let nodelist = document.querySelectorAll(".projects-container .proj-index");
        let newCreatedProject = nodelist[nodelist.length - 1];
        newCreatedProject.click();
        newCreatedProject.scrollIntoView();
        hideProjectForm();
    } else {
        alert(" Project name must be different !");
        projectAddForm.querySelector("input").value = "";
        projectAddForm.querySelector("input").focus();
    }
}


// hide project form to add new project
function hideProjectForm() {

    projectAddForm.classList.add("hidden");
    projectAddForm.querySelector("input").value = "";
    const projectContainer = document.querySelector(".projects-container");
    projectContainer.style.height = "400px";
}

// keep track of the current Page 
let currentPageName = "Home";


// change the current Page ( switch between projects )
function updatePagesEffect() {

    const pages = document.querySelectorAll('[class*="-index"]');
    const projectDeleteBtns = document.querySelectorAll(".pro-delete");
    console.log("called me");
    pages.forEach((page) => {
        page.addEventListener("click", () => {
            pages.forEach((page) => {

                page.classList.remove("bg-white");
                if (!page.textContent.includes("Home")) {
                    projectDeleteBtns.forEach((pd) => {
                        pd.classList.add("invisible");
                    });
                }
            });
            page.classList.add("bg-white");
            currentPageName = page.textContent.trim();
            if (!page.textContent.includes("Home"))
                page.parentNode
                    .querySelector(".pro-delete")
                    .classList.remove("invisible");
            else currentPageName = "Home";

            changeContent(currentPageName);
            renderTask(currentPageName);
        });
    });
}

// Render all projects on navbar

function renderProjects(allProjectArr) {
    const projectContainer = document.querySelector(".projects-container");
    projectContainer.textContent = "";
    if (allProjectArr.length > 0) {
        // render Home page when currentProject is null

        allProjectArr.forEach((project) => {
            let thisProjName = project.projectName;
            projectContainer.innerHTML += `<div class="text-center flex justify-around  items-center w-full ">
                <div class="proj-index w-[75%] break-words  last:bg-red-400
rounded-md hover:cursor-pointer py-1 " project-id="${project.projectUid}">${thisProjName}</div>
                <img class="pro-delete hover:cursor-pointer invisible hover:visible h-[14px]"  title="Delete" src="" alt="pro-delete">
                
            </div>
            <hr>`;
        });
        renderProjectDeleteIcon();
        activateDeleteIcon();
        updatePagesEffect();
    }
}


// add eventlistener to delete icon of projects

function activateDeleteIcon() {
    const projectDeleteBtns = document.querySelectorAll(".pro-delete");
    projectDeleteBtns.forEach((pd) => {
        pd.addEventListener("click", (e) => {
            let name = e.target.parentNode.querySelector(".proj-index").textContent;

            allProjectArr = allProjectArr.filter((i) => {
                return i.projectName != name;
            });
            localStorage.setItem("allProjectArr", JSON.stringify(allProjectArr));
            renderProjects(allProjectArr);
            const homePage = document.querySelector(".home-index");
            homePage.click();
        });
    });
}


// add image source for delete icon of project 
function renderProjectDeleteIcon() {
    const projectDeleteBtns = document.querySelectorAll(".pro-delete");
    projectDeleteBtns.forEach((pd) => {
        pd.src = projDeleteIconSrc;
    });
}


// By currentPage name get all the tasks objects for that page
function getTaskArr(currentPageName) {
    if (currentPageName == "Home") return allTasks
    else {
        let project = getProjectByName(currentPageName);
        return project.projectTasksList
    }
}


// get the project object by page name
function getProjectByName(currentPageName) {
    return allProjectArr.find(i => i.projectName == currentPageName)

}


// Render all the tasks of that page 

function renderTask(currentPageName) {

    console.log(currentPageName, " inside renderTasks");
    //clear allproject div
    let tempArr = getTaskArr(currentPageName);
    // console.log("CurrentPage inside renderTask",currentPageName);

    allProjects.innerHTML = "";

    //add form to allProjects div
    allProjects.innerHTML = `<div
                    class="container-addTask   hidden w-auto mb-2 mt-2 md:w-[82%] mx-10 h-max p-2   bg-yellow-200 flex-col md:gap-3 rounded-md px-3">
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
    if (tempArr.length > 0) {
        // add all tasks from allTasks array to allProjects div
        tempArr.forEach((task) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add(
                "task",
                "w-[90%]",
                "flex-row",
                "gap-6",
                "mt-2",
                "flex",
                "items-center",
                "mx-2"
            );
            taskElement.style.gap = "20px";
            taskElement.setAttribute("data-id", task.uniqueId);

            let priorityColor;

            if (task.priorityValue === "high") {
                priorityColor = "red";
            } else if (task.priorityValue === "medium") {
                priorityColor = "blue";
            } else {
                priorityColor = "green";
            }
            let taskDate = new Date(task.dueDate);
            let formattedDate = format(taskDate, "dd MMM yyyy");
            taskElement.innerHTML = `<div class="checkbox"> <input data-id=${task.uniqueId} type="checkbox" name="done"></div>
                    <div
                        class="task-info w-full  h-full p-2 text-lg flex   border-l-[6px]    bg-yellow-100 justify-between rounded-md cursor-pointer ">
                        <div class="task-name break-words w-[40%]">${task.taskName}</div>
                        <div class="notes text-sm flex w-max items-center">${task.taskNote}</div>
                        <div class="dueData text-sm flex items-center">${formattedDate}</div>
</div>
                        <img src="" alt="edit" class="hidden md:flex h-[20px]  edit-btn hover:cursor-pointer hover:mb-1" data-id=${task.uniqueId}></img>

                        `;
            taskElement.querySelector(".task-info").style.borderColor = priorityColor;
            taskElement.querySelector(".edit-btn").src = editIcon;
            allProjects.appendChild(taskElement);
        });
        activateCheckboxes();
        activateEditBtns();
    }
}


// Function to delete everything ( all todos and projects )
function deleteAllProjects() {
    allProjectArr = [];
    localStorage.setItem("allProjectArr", JSON.stringify(allProjectArr));
    renderProjects(allProjectArr);
    const homePage = document.querySelector(".home-index");
    console.log(homePage);
    homePage.click();
}



renderProjects(allProjectArr);

export { renderTask, deleteAllProjects, allProjectArr, currentPageName, getProjectByName };
