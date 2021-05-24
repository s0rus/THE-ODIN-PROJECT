import Projects from './Projects';

export default class Store {
  static saveProject(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
    const ProjectList = new Projects();
    ProjectList.renderProjectList();
  }

  static removeProject(projectToDelete) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const filteredProjects = projects.filter(
      (v) => v.projectName !== projectToDelete
    );
    localStorage.setItem('projects', JSON.stringify(filteredProjects));
    location.reload();
  }
}
