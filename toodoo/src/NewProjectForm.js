import Store from './Store';

const projectList = JSON.parse(localStorage.getItem('projects')) || [];

function addProjectToList(name) {
  if (
    projectList.filter((project) => project.projectName === name).length ||
    name === ''
  ) {
    return false;
  }

  const projectName = document.getElementById('new-project-name');
  projectName.value = '';
  name = {
    projectName: name,
    tasks: {},
  };

  projectList.push(name);
  Store.saveProject('projects', projectList);
  return true;
}

function createForm(target) {
  const formContainer = document.getElementById('new-project-form');
  target.setAttribute('active', '');
  formContainer.setAttribute('active', '');
  target.textContent = '× CANCEL';

  formContainer.innerHTML = `
            <h3>TITLE:</h3>
            <input type="text" id="new-project-name">
            <button id="new-project-create">CREATE</button>
            `;

  const createProjectButton = document.getElementById('new-project-create');
  const createProjectName = document.getElementById('new-project-name');
  createProjectButton.addEventListener('click', () =>
    addProjectToList(createProjectName.value)
  );
}

function removeForm(target) {
  const formContainer = document.getElementById('new-project-form');
  target.removeAttribute('active');
  formContainer.removeAttribute('active');
  target.textContent = '+ ADD NEW PROJECT';

  formContainer.innerHTML = '';
}

function handleToggleForm(e) {
  if (e.target.hasAttribute('active')) {
    removeForm(e.target);
  } else {
    createForm(e.target);
  }
}

export default function toggleForm() {
  const newProjectButton = document.getElementById('new-project');
  newProjectButton.addEventListener('click', (e) => handleToggleForm(e));
}
