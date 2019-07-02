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

    public void persistProject(Project newProject, String user) {
        newProject.setId(null);
        newProject.setUser(user);
        projectRepository.save(newProject);
    }
    
}
