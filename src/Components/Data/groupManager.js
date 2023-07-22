function getGroupList() {
  const storedGroup = window.sessionStorage.getItem("groupList");
  return storedGroup === null ? [] : JSON.parse(storedGroup);
}

let globalGroupList = getGroupList(); // TODO: Global Variable

function getGroupById(idGroup = 0){
  return globalGroupList.find((element) => element.key === idGroup);
}

function globalDeleteGroups(){
  globalGroupList.splice(0, globalGroupList.length);
  addSessionStorageGroup(globalGroupList);
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
  globalGroupList
};