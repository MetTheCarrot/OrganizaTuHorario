function getGroupList() {
  const storedGroup = window.sessionStorage.getItem("groupList");
  return storedGroup === null ? [] : JSON.parse(storedGroup);
}

let globalGroupList = getGroupList(); // TODO: Global Variable

function getGroupById(idGroup = -1){
  if (idGroup === -1) return [];
  return globalGroupList.find((element) => element.key === idGroup);
}

function globalDeleteGroups(){
  globalGroupList.splice(0, globalGroupList.length);
  addSessionStorageGroup(globalGroupList);
}

function existGroups(){
  return globalGroupList.length !== 0;
}

function deleteSpecifiedGroup(idGroup = 0){
  const index = globalGroupList.findIndex((element) => element.key === idGroup);
  globalGroupList.splice(index, 1);
  addSessionStorageGroup(globalGroupList);
}

function findIndexGroup(idGroup = 0){
  return globalGroupList.findIndex((element) => element.key === idGroup);
}

function getNextIdForANewGroup(){
  return globalGroupList.length === 0 ? 1 : Math.max(...globalGroupList.map((element) => element.key)) + 1;
}

function replaceGroupList(newGroupList = []){
  globalGroupList.splice(0, globalGroupList.length);
  globalGroupList = newGroupList;
  addSessionStorageGroup(globalGroupList);
}

// Modify Default Values

function modifyGroupName(idGroupName = 0, newName = ""){
  const index = findIndexGroup(idGroupName);
  globalGroupList[index].name = newName;
  addSessionStorageGroup(globalGroupList);
}

function modifyColorName(idGroupName = 0, newColor = ""){
  const index = findIndexGroup(idGroupName);
  globalGroupList[index].color = newColor;
  addSessionStorageGroup(globalGroupList);
}

function modifyMaterias(idGroupName = 0, newMaterias = []){
  const index = findIndexGroup(idGroupName);
  globalGroupList[index].materias = newMaterias;
  addSessionStorageGroup(globalGroupList);
}

// Default Values

function saveValues(name, color){
  addGroupToSystem(name, color);
}

function addGroupToSystem(name = "", color = ""){
  const newGroup = {
    key: getNextIdForANewGroup(),
    name: name,
    color: color,
    materias : [],
  };
  globalGroupList.push(newGroup)
  addSessionStorageGroup(globalGroupList);
}

function duplicateGroup(idGroup = 0){
  const grupo = getGroupById(idGroup);
  const newGroup = {
    key: getNextIdForANewGroup(),
    name: grupo.name + ' (Copia)',
    color: grupo.color,
    materias: grupo.materias,
  };
  globalGroupList.push(newGroup);
  addSessionStorageGroup(globalGroupList);
}

function addSessionStorageGroup(newGroupList = []){
  window.sessionStorage.setItem("groupList", JSON.stringify(newGroupList));
}

export {
  saveValues,
  getGroupList,
  addGroupToSystem,
  addSessionStorageGroup,
  getGroupById,
  deleteSpecifiedGroup,
  modifyGroupName,
  modifyColorName,
  globalDeleteGroups,
  modifyMaterias,
  replaceGroupList,
  existGroups,
  duplicateGroup,
  globalGroupList
};