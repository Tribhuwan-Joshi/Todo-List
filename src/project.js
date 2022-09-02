function Project(name) {
   let projectName = name;
   let  projectTasksList = []
    return {
        projectName,
        projectTasksList
    }
}

export { Project };