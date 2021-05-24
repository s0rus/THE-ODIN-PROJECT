/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/NewProjectForm.js":
/*!*******************************!*\
  !*** ./src/NewProjectForm.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toggleForm)\n/* harmony export */ });\n/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ \"./src/Store.js\");\n\n\nconst projectList = JSON.parse(localStorage.getItem('projects')) || [];\n\nfunction addProjectToList(name) {\n  if (\n    projectList.filter((project) => project.projectName === name).length ||\n    name === ''\n  ) {\n    return false;\n  }\n\n  const projectName = document.getElementById('new-project-name');\n  projectName.value = '';\n  name = {\n    projectName: name,\n    tasks: {},\n  };\n\n  projectList.push(name);\n  _Store__WEBPACK_IMPORTED_MODULE_0__.default.saveProject('projects', projectList);\n  return true;\n}\n\nfunction createForm(target) {\n  const formContainer = document.getElementById('new-project-form');\n  target.setAttribute('active', '');\n  formContainer.setAttribute('active', '');\n  target.textContent = '× CANCEL';\n\n  formContainer.innerHTML = `\n            <h3>TITLE:</h3>\n            <input type=\"text\" id=\"new-project-name\">\n            <button id=\"new-project-create\">CREATE</button>\n            `;\n\n  const createProjectButton = document.getElementById('new-project-create');\n  const createProjectName = document.getElementById('new-project-name');\n  createProjectButton.addEventListener('click', () =>\n    addProjectToList(createProjectName.value)\n  );\n}\n\nfunction removeForm(target) {\n  const formContainer = document.getElementById('new-project-form');\n  target.removeAttribute('active');\n  formContainer.removeAttribute('active');\n  target.textContent = '+ ADD NEW PROJECT';\n\n  formContainer.innerHTML = '';\n}\n\nfunction handleToggleForm(e) {\n  if (e.target.hasAttribute('active')) {\n    removeForm(e.target);\n  } else {\n    createForm(e.target);\n  }\n}\n\nfunction toggleForm() {\n  const newProjectButton = document.getElementById('new-project');\n  newProjectButton.addEventListener('click', (e) => handleToggleForm(e));\n}\n\n\n//# sourceURL=webpack://toodoo/./src/NewProjectForm.js?");

/***/ }),

/***/ "./src/Projects.js":
/*!*************************!*\
  !*** ./src/Projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Projects)\n/* harmony export */ });\n/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ \"./src/Store.js\");\n\r\n\r\nclass Projects {\r\n  constructor() {\r\n    this.projects = localStorage.getItem('projects');\r\n\r\n    this.renderTaskList = function (tasks, projectName, projectIndex) {\r\n      const taskList = document.getElementById('task-list');\r\n      taskList.innerHTML = `\r\n            <button id=\"add-task\">+ ADD NEW TASK</button>\r\n            <div id=\"new-task-form\"></div>\r\n            `;\r\n\r\n      for (const [_, value] of Object.entries(tasks)) {\r\n        const task = document.createElement('div');\r\n        task.classList.add('task');\r\n        task.innerHTML = `<button class=\"mark-task-done\" data-title=\"${value.taskTitle}\">✔</button><h3>${value.taskTitle}<h3>`;\r\n        taskList.appendChild(task);\r\n      }\r\n\r\n      const addTask = document.getElementById('add-task');\r\n      addTask.addEventListener('click', () =>\r\n        this.handleAddTask(projectIndex, projectName)\r\n      );\r\n\r\n      const deleteProject = document.getElementById('delete-task');\r\n      deleteProject.addEventListener('click', () =>\r\n        _Store__WEBPACK_IMPORTED_MODULE_0__.default.removeProject(projectName)\r\n      );\r\n\r\n      const markTaskDone = document.querySelectorAll('.mark-task-done');\r\n      markTaskDone.forEach((task, taskIndex) =>\r\n        task.addEventListener('click', () => {\r\n          this.projects = localStorage.getItem('projects');\r\n          const projects = JSON.parse(this.projects);\r\n\r\n          const taskName = task.getAttribute('data-title');\r\n          delete projects[projectIndex]['tasks'][taskName];\r\n          localStorage.setItem('projects', JSON.stringify(projects));\r\n          this.openProject(projectName, projectIndex);\r\n        })\r\n      );\r\n    };\r\n\r\n    this.openProject = function (projectName, projectIndex) {\r\n      this.projects = localStorage.getItem('projects');\r\n      const projects = JSON.parse(this.projects);\r\n\r\n      const projectTitle = document.getElementById('project-title');\r\n      projectTitle.innerHTML = `${projectName}<button id=\"delete-task\">× DELETE</button>`;\r\n\r\n      this.renderTaskList(\r\n        projects[projectIndex]['tasks'],\r\n        projectName,\r\n        projectIndex\r\n      );\r\n    };\r\n\r\n    this.handleAddTask = function (projectIndex, projectName) {\r\n      if (document.getElementById('add-task').hasAttribute('active')) {\r\n        this.removeTaskForm(document.getElementById('add-task'));\r\n      } else {\r\n        this.createTaskForm(\r\n          document.getElementById('add-task'),\r\n          projectIndex,\r\n          projectName\r\n        );\r\n      }\r\n    };\r\n\r\n    this.createTaskForm = function (target, projectIndex, projectName) {\r\n      const formContainer = document.getElementById('new-task-form');\r\n      target.setAttribute('active', '');\r\n      formContainer.setAttribute('active', '');\r\n      target.textContent = '× CANCEL';\r\n\r\n      formContainer.innerHTML = `\r\n             <h3>TITLE:</h3>\r\n             <input type=\"text\" id=\"new-task-name\">\r\n             <button id=\"new-task-create\">CREATE</button>\r\n             `;\r\n\r\n      const createTaskButton = document.getElementById('new-task-create');\r\n      const createTaskName = document.getElementById('new-task-name');\r\n      const projects = JSON.parse(this.projects);\r\n\r\n      createTaskButton.addEventListener('click', () =>\r\n        this.addNewTask(\r\n          projectIndex,\r\n          createTaskName.value,\r\n          projects,\r\n          projectName\r\n        )\r\n      );\r\n    };\r\n\r\n    this.removeTaskForm = function (target) {\r\n      const formContainer = document.getElementById('new-task-form');\r\n      target.removeAttribute('active');\r\n      formContainer.removeAttribute('active');\r\n      target.textContent = '+ ADD NEW TASK';\r\n\r\n      formContainer.innerHTML = ``;\r\n    };\r\n\r\n    this.addNewTask = function (\r\n      projectIndex,\r\n      taskTitle,\r\n      projects,\r\n      projectName\r\n    ) {\r\n      if (taskTitle === '') return false;\r\n      projects[projectIndex]['tasks'][taskTitle] = {\r\n        taskTitle,\r\n      };\r\n      localStorage.setItem('projects', JSON.stringify(projects));\r\n      this.openProject(projectName, projectIndex);\r\n      this.renderTaskList(\r\n        projects[projectIndex]['tasks'],\r\n        projectName,\r\n        projectIndex\r\n      );\r\n    };\r\n  }\r\n\r\n  renderProjectList = () => {\r\n    const projectListContainer = document.getElementById('project-list');\r\n    projectListContainer.innerHTML = `<h2>Your projects:</h2>`;\r\n    const projects = JSON.parse(this.projects);\r\n    projects.forEach((project, index) => {\r\n      const projectItem = document.createElement('div');\r\n\r\n      projectItem.classList.add('project');\r\n      projectItem.textContent = project.projectName;\r\n      projectItem.setAttribute('data-index', index);\r\n      projectItem.addEventListener('click', () =>\r\n        this.openProject(\r\n          project.projectName,\r\n          projectItem.getAttribute('data-index')\r\n        )\r\n      );\r\n\r\n      projectListContainer.appendChild(projectItem);\r\n    });\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack://toodoo/./src/Projects.js?");

/***/ }),

/***/ "./src/Store.js":
/*!**********************!*\
  !*** ./src/Store.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Store)\n/* harmony export */ });\n/* harmony import */ var _Projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Projects */ \"./src/Projects.js\");\n\n\nclass Store {\n  static saveProject(name, data) {\n    localStorage.setItem(name, JSON.stringify(data));\n    const ProjectList = new _Projects__WEBPACK_IMPORTED_MODULE_0__.default();\n    ProjectList.renderProjectList();\n  }\n\n  static removeProject(projectToDelete) {\n    const projects = JSON.parse(localStorage.getItem('projects'));\n    const filteredProjects = projects.filter(\n      (v) => v.projectName !== projectToDelete\n    );\n    localStorage.setItem('projects', JSON.stringify(filteredProjects));\n    location.reload();\n  }\n}\n\n\n//# sourceURL=webpack://toodoo/./src/Store.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NewProjectForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewProjectForm */ \"./src/NewProjectForm.js\");\n/* harmony import */ var _Projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Projects */ \"./src/Projects.js\");\n\n\n\n(0,_NewProjectForm__WEBPACK_IMPORTED_MODULE_0__.default)();\nconst ProjectList = new _Projects__WEBPACK_IMPORTED_MODULE_1__.default();\nProjectList.renderProjectList();\n\n\n//# sourceURL=webpack://toodoo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;