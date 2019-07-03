package ch.zhaw.sml.iwi.meng.leantodo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ch.zhaw.sml.iwi.meng.leantodo.entity.Project;
import ch.zhaw.sml.iwi.meng.leantodo.entity.ProjectRepository;
import ch.zhaw.sml.iwi.meng.leantodo.entity.Task;
import ch.zhaw.sml.iwi.meng.leantodo.entity.TaskRepository;

@Component
public class ProjectController {


    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskRepository taskRepository;


    public List<Project> listAllProjects(String loginName) {
        return projectRepository.findByUser(loginName);
    }

    public Project getProjectByTitle(String title) {
        return projectRepository.findByTitle(title);
    }

    public Project getProjectById(Long id) {
        if(projectRepository.findById(id).isPresent()){
            return projectRepository.findById(id).get();
        } else {
            throw new IllegalArgumentException("No Project found with this Id.");
        }
    }

    public void addProject(Project newProject, String user) {
        newProject.setId(null);
        newProject.setUser(user);
        projectRepository.save(newProject);
    }

    public void deleteProject(Long id, String user) {

        if(projectRepository.findById(id).isPresent()) {
            Project project = projectRepository.findById(id).get();

            if(project.getUser().equals(user) && !project.isStandard()) {
                List<Task> toDeleteTasks = taskRepository.findByProjectIdAndUser(id, user);
                taskRepository.deleteAll(toDeleteTasks);
                projectRepository.delete(project);
            }
        }
    }


    
}
