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

    // Alle Projekte zurückgeben, um im Menü anzuzeigen
    public List<Project> listAllProjects(String loginName) {
        return projectRepository.findByUser(loginName);
    }

    // Projekt nach Titel zurückgeben
    public Project getProjectByTitle(String title) {
        return projectRepository.findByTitle(title);
    }

    // Projekt nach der ID zurückgeben
    public Project getProjectById(Long id) {
        if(projectRepository.findById(id).isPresent()){
            return projectRepository.findById(id).get();
        } else {
            throw new IllegalArgumentException("No Project found with this Id.");
        }
    }

    // Neues Projekt erstellen
    public void addProject(Project newProject, String user) {
        newProject.setId(null);
        newProject.setUser(user);
        projectRepository.save(newProject);
    }

    // Projekt und alle dazugehörigen Tasks löschen
    public void deleteProject(Long id, String user) {
        // Gibt es dieses Projekt
        if(projectRepository.findById(id).isPresent()) {
            Project project = projectRepository.findById(id).get();
            // Wenn das Projekt gelöscht werden darf (Nicht Inbox, Archiv, Irgendwann)
            if(project.getUser().equals(user) && !project.isStandard()) {
                // Alle Tasks in diesem Projekt löschen
                List<Task> toDeleteTasks = taskRepository.findByProjectIdAndUser(id, user);
                taskRepository.deleteAll(toDeleteTasks);
                // Das Projekt löschen
                projectRepository.delete(project);
            }
        }
    }
}
