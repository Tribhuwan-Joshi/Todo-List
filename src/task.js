export class Task{
    constructor(taskName, taskNote, priorityValue, dueDate, uniqueId) {
        
        this.taskName = taskName;
        this.taskNote = taskNote;
        this.priorityValue = priorityValue;
        this.dueDate = dueDate;
        this.isFinish = false;
        this.uniqueId = uniqueId;
    }
    timeleft() {
        let timeleft = this.dueDate - new Date();
        return timeleft;
    }
    

}