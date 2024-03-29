/* Imports css */

import "./style.css";
import { renderTask, deleteAllProjects, allProjectArr, currentPageName, getProjectByName } from "./domManipulation.js";

// link Icon
import Icon from "./imgs/Icon.png";
const linkIcon = document.querySelector('link[rel="icon"');
linkIcon.href = Icon;



// Auth logic 

import Cookies from "universal-cookie/cjs/Cookies";
import { auth } from "./firebase-config";
import defaultpfp from "./imgs/bgImg.jpg"
const cookies = new Cookies();

// import db
import { db } from "./firebase-config";
import { collection,addDoc,getDocs } from "firebase/firestore";
async function addDataToFirestore(){
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Alan",
          middle: "Mathison",
          last: "Turing",
          born: 1912
        });
      
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

addDataToFirestore();

async function getDataFirestore(){


const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

}
getDataFirestore();




import { signInWithGoogle } from "./Auth";
const signIn = document.querySelector(".sign-in");
signIn.addEventListener("click",signInWithGoogle);


/* 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

*/

let isAuth = cookies.get('auth-token') || false;
setAuth(isAuth);

// when auth got changed

auth.onAuthStateChanged((user) => {
    if (user) {
        const pfp = document.querySelector(".pfp");
      const userPfp = auth.currentUser.photoURL || defaultpfp;
      const userName = document.querySelector('.username');
      pfp.style.backgroundImage = `url(${userPfp})`;
      pfp.classList.add("bg-cover");
      userName.textContent = auth.currentUser.displayName;

    }
  });

function setAuth(val){
    isAuth=val;
    const signInDiv = document.querySelector(".sign-in-div");
    const userHeader = document.querySelector(".user-data");
    const fullMain = document.querySelector(".full-main");
    function handler(e) {
        e.stopPropagation();
        e.preventDefault();
      }
    if(isAuth){

        signInDiv.classList.add('hidden');
        signInDiv.classList.remove('flex');
        userHeader.classList.remove('hidden');
        userHeader.classList.add('flex');
        fullMain.classList.remove("blur-sm");
        fullMain.removeEventListener("click",handler);
        // writeData();

    }
        
    else{
        signInDiv.classList.remove('hidden');
        userHeader.classList.add('hidden');
        userHeader.classList.remove('flex');
        signInDiv.classList.add('flex');
        fullMain.classList.add("blur-sm");
        fullMain.addEventListener("click",handler,true);
        const userName = document.querySelector('.username');
        userName.textContent = "";

    }
}
function getAuth(){
    return isAuth;
}

// sign Out 
import { signOut } from "firebase/auth";

const signUserOut  = (async()=>{
    await signOut(auth);
    cookies.remove("auth-token");
    setAuth(false);
})



const signOutBtn = document.querySelector('.sign-out');
signOutBtn.addEventListener("click",()=>{
    
        let shouldSignOut = confirm("Are you sure to sign Out ? ");
        if(shouldSignOut)  signUserOut();
}
    
);




// import classes
import { Task } from './task'




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


// Projects
import projectIcon from '../src/imgs/project.png'
const projectLogo = document.querySelector(".project-icon");
projectLogo.src = projectIcon;

import projectAdd from '../src/imgs/projectAdd.png'
const projectAddImg = document.querySelector(".project-add-img");
projectAddImg.src = projectAdd;


/* Main { header and Container} */
// import editSrc from "../src/imgs/edit.png";
import taskAddIcon from "../src/imgs/taskAdd.png";
import bgImgSrc from './imgs/bgImg.jpg'
const main = document.querySelector('.main');
main.style.backgroundImage = `url(${bgImgSrc})`;
const addTaskDiv = document.querySelector(".addTask-btn");
const addTaskIcon = document.querySelector("img.add-task-icon")
addTaskIcon.src = taskAddIcon;
addTaskDiv.addEventListener("click", showAddForm);

// tasks arr and their uniqueId 
let allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
let uniqueId = (allTasks.length) ? localStorage.getItem("uniqueId") : 0;
/* const getData = async () => {
  try {
    const doc = await db.collection('collectionName').doc('docName').get();
    return doc.data();
  } catch (error) {
    console.log(error);
  }
};
*/






// Dom object for adding new tasks form

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

const checkboxes = document.querySelectorAll('.task .checkbox input[type=checkbox]');
const projects = document.querySelector(".all-projects");



let formClose = true;
// keep track of any editForm or AddForm is opened

// firebase sign -in 


function showAddForm() {
    if (
        formClose
    ) {
        formClose = false;
        const containerAdd = document.querySelector(".container-addTask");
        containerAdd.classList.remove("hidden");
        containerAdd.classList.add("flex");

        // set autofocus on input element
        const taskName = document.querySelector(".container-addTask input#task-name");
        taskName.focus();
        const addBtn = document.querySelector(".container-addTask .add-btn");
        addBtn.addEventListener("click", addnewTask);
        const cancelBtn = document.querySelector(".container-addTask .cancel-btn");
        cancelBtn.addEventListener("click", hideTaskForm);
    }
}

function hideTaskForm() {
    formClose = true;
    const containerAdd = document.querySelector(".container-addTask");
    containerAdd.classList.remove("flex");
    containerAdd.classList.add("hidden");
    const addBtn = document.querySelector(".container-addTask .add-btn");
    addBtn.addEventListener("click", addnewTask);
    const cancelBtn = document.querySelector(".container-addTask .cancel-btn");
    cancelBtn.addEventListener("click", hideTaskForm);

    const taskName = document.querySelector(".container-addTask input#task-name");
    const taskNote = document.querySelector(".container-addTask input#task-note");
    const priority = document.querySelectorAll(
        '.container-addTask input[name="priority"]'
    );
    const dueDate = document.querySelector(".container-addTask input#due-date");

    taskName.value = "";
    taskNote.value = "";
    dueDate.value = "";
}

function addnewTask() {
    let tempArr;
    if (currentPageName == "Home") tempArr = allTasks;
    else {
        let obj = getProjectByName(currentPageName);
        tempArr = obj.projectTasksList;
    }
    if (tempArr.length < 1) {
        uniqueId = 0;
        localStorage.setItem("uniqueId", 0);
    }

    const taskNameValue = document.querySelector(".container-addTask input#task-name").value.trim();
    const taskNoteValue = document.querySelector(".container-addTask input#task-note").value.trim();
    const priority = document.querySelectorAll(
        '.container-addTask input[name="priority"]'
    );
    let priorityValue;
    taskName.select();
    const dueDateValue = document.querySelector(".container-addTask input#due-date").value;
    for (const i of priority) {
        if (i.checked) {
            priorityValue = i.value;
        }
    }

    if (!(taskNameValue && priorityValue && dueDateValue)) {
        alert("Please fill all required fields");
    } else {

        let myTask = new Task(
            taskNameValue,
            taskNoteValue,
            priorityValue,
            dueDateValue,
            uniqueId++
        );
        if (currentPageName != "Home") {
            let currentProjectObj = getProjectByName(currentPageName);
            currentProjectObj.projectTasksList.push(myTask);

            localStorage.setItem("allProjectArr", JSON.stringify(allProjectArr));
        }
        else {
            tempArr.push(myTask);
            
            localStorage.setItem("allTasks", JSON.stringify(tempArr));
        }
        localStorage.setItem("uniqueId", uniqueId)




        hideTaskForm();

        renderTask(
            currentPageName
        );


    }

}


function getTaskById(id) {
    if (currentPageName == "Home")
        return allTasks.find((t) => t.uniqueId == id)
    else {
        let obj = getProjectByName(currentPageName);
        return obj.projectTasksList.find((t) => t.uniqueId == id);
    }
}

function activateCheckboxes() {
    let tempArr;
    if (currentPageName == "Home") tempArr = allTasks;
    else {
        let obj = getProjectByName(currentPageName);
        tempArr = obj.projectTasksList;
    }
    if (tempArr.length > 0) {
        const checkboxes = document.querySelectorAll('.task .checkbox input[type=checkbox]');

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("click", () => {


                let data_id = checkbox.getAttribute("data-id");


                // remove checked task
                tempArr = tempArr.filter((task) => {
                    return task.uniqueId != data_id;
                });
                if (currentPageName == "Home"){
                    localStorage.setItem("allTasks", JSON.stringify(tempArr));
            }
                else {
                    getProjectByName(currentPageName).projectTasksList = tempArr;
                    localStorage.setItem("allProjectArr", JSON.stringify(allProjectArr));
                    
                }
                

                let element = document.querySelector(`div[data-id="${data_id}"]`);
                element.parentNode.removeChild(element);

            }
            );
        }
        );
    }
}

function activateEditBtns() {
    let tempArr;
    if (currentPageName == "Home") tempArr = allTasks;
    else {
        let obj = getProjectByName(currentPageName);
        tempArr = obj.projectTasksList;
    }
    if (tempArr.length > 0) {
        const editBtns = document.querySelectorAll(".task .edit-btn");
        editBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                hideTask(e.target.getAttribute("data-id"));

            }
            )
        }
        )
    }
}

function hideTask(id) {
    if (formClose) {
        formClose = false;

        const taskDiv = document.querySelector(`.task[data-id='${id}']`);
        let editedTask = getTaskById(id);

        taskDiv.classList = ""

        let classlist = "container-addTask w-auto mb-2 mt-2 md:w-[82%] mx-10 h-max p-2 bg-yellow-200 flex-col md:gap-3 rounded-md px-3 flex".split(" ");
        taskDiv.classList.add(...classlist);
        taskDiv.setAttribute("data-id", id);

        taskDiv.innerHTML = `<div class="naming md:flex flex-1 justify-between gap-2">
                        <input type="text" name="task" id="task-name"  onfocus="this.value = this.value;" placeholder="Task *" maxlength="40" value="${editedTask.taskName}"
                            class="rounded-sm focus:outline-1 focus:outline-red-400 outline-none px-2 py-1 flex-1" />
                        <input type="text" name="Note" id="task-note" placeholder="Note ( optional )" maxlength="60"
                            value="${editedTask.taskNote}"
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
                            <label for="dueDate" class="text-lg font-semibold mr-4" >Due</label>
                            <input type="date" name="" id="due-date" value="${editedTask.dueDate}" class="rounded-md px-2"/>
                        </div>

                        <div class="buttons flex gap-2">
                            <button
                                class="bg-green-600 save-btn rounded-md px-4 py-1 hover:bg-green-700 active:bg-green-600 text-white">
                                Save
                            </button>
                            <button
                                class="bg-red-500 cancel-edit-btn rounded-md px-4 py-1 hover:bg-red-600 active:bg-red-500 text-white">
                                Cancel
                            </button>
                        </div>
                    </div>`
        let priority = editedTask.priorityValue;

        document.querySelector(`.container-addTask[data-id='${id}'] input[value='${priority}']`).checked = true;
        const taskNamediv = document.querySelector(`.container-addTask[data-id='${id}'] input#task-name`);
        const taskNotediv = document.querySelector(`.container-addTask[data-id='${id}'] input#task-note`);
        const Duediv = document.querySelector(`.container-addTask[data-id='${id}'] input#due-date`);
        const prioritydiv = document.querySelectorAll(
            '.container-addTask input[name="priority"]'
        );
        const len = taskNamediv.value.length;
        taskNamediv.setSelectionRange(len, len)
        taskNamediv.focus();


        const saveBtn = document.querySelector("button.save-btn");
        const cancelEdit = document.querySelector("button.cancel-edit-btn");
        saveBtn.addEventListener("click", () => {
            const currentName = taskNamediv.value.trim();
            const currentNote = taskNotediv.value.trim();
            const currDate = Duediv.value;
            let currPrior;
            for (const i of prioritydiv) {
                if (i.checked) {
                    currPrior = i.value;
                }
            }
            editedTask.taskName = currentName;
            editedTask.taskNote = currentNote;
            editedTask.dueDate = currDate;
            editedTask.priorityValue = currPrior;
            if (currentPageName == "Home")
                localStorage.setItem("allTasks", JSON.stringify(allTasks));
            else
                localStorage.setItem("allProjectArr", JSON.stringify(allProjectArr));
            formClose = true;
            renderTask(currentPageName);



        });
        cancelEdit.addEventListener("click", () => {

            formClose = true;
            renderTask(currentPageName);

        })
    }
}








// delete all Tasks
const deleteAllBtn = document.querySelector("button.delete-all");
deleteAllBtn.addEventListener("click", () => {
    if (allTasks.length || allProjectArr.length) {
        let decision = confirm("You want to delete all of your todos ?"); 1
        if (decision) {
            allTasks = []
            localStorage.setItem("allTasks", JSON.stringify(allTasks));
            uniqueId = 0
            localStorage.setItem("uniqueId", 0);
            deleteAllProjects();
            renderTask(currentPageName);
        }
    }
})

renderTask(currentPageName);
export { activateCheckboxes, activateEditBtns, allTasks,setAuth}





