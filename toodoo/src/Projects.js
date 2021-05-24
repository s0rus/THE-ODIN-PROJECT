import Store from './Store';

export default class Projects {
  constructor() {
    this.projects = localStorage.getItem('projects');

    this.renderTaskList = function (tasks, projectName, projectIndex) {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = `
            <button id="add-task">+ ADD NEW TASK</button>
            <div id="new-task-form"></div>
            `;

      for (const [_, value] of Object.entries(tasks)) {
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML = `<button class="mark-task-done" data-title="${value.taskTitle}">✔</button><h3>${value.taskTitle}<h3>`;
        taskList.appendChild(task);
      }

      const addTask = document.getElementById('add-task');
      addTask.addEventListener('click', () =>
        this.handleAddTask(projectIndex, projectName)
      );

      const deleteProject = document.getElementById('delete-task');
      deleteProject.addEventListener('click', () =>
        Store.removeProject(projectName)
      );

      const markTaskDone = document.querySelectorAll('.mark-task-done');
      markTaskDone.forEach((task, taskIndex) =>
        task.addEventListener('click', () => {
          this.projects = localStorage.getItem('projects');
          const projects = JSON.parse(this.projects);

          const taskName = task.getAttribute('data-title');
          delete projects[projectIndex]['tasks'][taskName];
          localStorage.setItem('projects', JSON.stringify(projects));
          this.openProject(projectName, projectIndex);
        })
      );
    };

    this.openProject = function (projectName, projectIndex) {
      this.projects = localStorage.getItem('projects');
      const projects = JSON.parse(this.projects);

      const projectTitle = document.getElementById('project-title');
      projectTitle.innerHTML = `${projectName}<button id="delete-task">× DELETE</button>`;

      this.renderTaskList(
        projects[projectIndex]['tasks'],
        projectName,
        projectIndex
      );
    };

    this.handleAddTask = function (projectIndex, projectName) {
      if (document.getElementById('add-task').hasAttribute('active')) {
        this.removeTaskForm(document.getElementById('add-task'));
      } else {
        this.createTaskForm(
          document.getElementById('add-task'),
          projectIndex,
          projectName
        );
      }
    };

    this.createTaskForm = function (target, projectIndex, projectName) {
      const formContainer = document.getElementById('new-task-form');
      target.setAttribute('active', '');
      formContainer.setAttribute('active', '');
      target.textContent = '× CANCEL';

      formContainer.innerHTML = `
             <h3>TITLE:</h3>
             <input type="text" id="new-task-name">
             <button id="new-task-create">CREATE</button>
             `;

      const createTaskButton = document.getElementById('new-task-create');
      const createTaskName = document.getElementById('new-task-name');
      const projects = JSON.parse(this.projects);

      createTaskButton.addEventListener('click', () =>
        this.addNewTask(
          projectIndex,
          createTaskName.value,
          projects,
          projectName
        )
      );
    };

    this.removeTaskForm = function (target) {
      const formContainer = document.getElementById('new-task-form');
      target.removeAttribute('active');
      formContainer.removeAttribute('active');
      target.textContent = '+ ADD NEW TASK';

      formContainer.innerHTML = ``;
    };

    this.addNewTask = function (
      projectIndex,
      taskTitle,
      projects,
      projectName
    ) {
      if (taskTitle === '') return false;
      projects[projectIndex]['tasks'][taskTitle] = {
        taskTitle,
      };
      localStorage.setItem('projects', JSON.stringify(projects));
      this.openProject(projectName, projectIndex);
      this.renderTaskList(
        projects[projectIndex]['tasks'],
        projectName,
        projectIndex
      );
    };
  }

  renderProjectList = () => {
    const projectListContainer = document.getElementById('project-list');
    projectListContainer.innerHTML = `<h2>Your projects:</h2>`;
    const projects = JSON.parse(this.projects);
    projects.forEach((project, index) => {
      const projectItem = document.createElement('div');

      projectItem.classList.add('project');
      projectItem.textContent = project.projectName;
      projectItem.setAttribute('data-index', index);
      projectItem.addEventListener('click', () =>
        this.openProject(
          project.projectName,
          projectItem.getAttribute('data-index')
        )
      );

      projectListContainer.appendChild(projectItem);
    });
  };
}
