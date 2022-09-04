function Project(name, id) {
    let projectUid = id;
    let projectName = name;
    let projectTasksList = []
    return {
        projectName,
        projectTasksList,
        projectUid
    }
}

export { Project };