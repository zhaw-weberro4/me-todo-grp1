package ch.zhaw.sml.iwi.meng.leantodo.boundary;

import java.security.Principal;
import java.util.List;


import ch.zhaw.sml.iwi.meng.leantodo.controller.TaskController;
import ch.zhaw.sml.iwi.meng.leantodo.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ch.zhaw.sml.iwi.meng.leantodo.controller.ProjectController;
import ch.zhaw.sml.iwi.meng.leantodo.entity.Project;

@RestController
public class ProjectEndpoint {

    @Autowired
    private ProjectController projectController;


    @RequestMapping(path = "/api/projects", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public List<Project> getProjects(Principal principal) {
        return projectController.listAllProjects(principal.getName());
    }

    @RequestMapping(path = "/api/project/{name}", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public Project getProjectByName(@PathVariable("name") String projectTitle) {
        return projectController.getProjectByTitle(projectTitle);
    }

    @RequestMapping(path = "/api/project", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public void addProject(@RequestBody Project newProject, Principal principal) {
        projectController.addProject(newProject, principal.getName());
    }

    @RequestMapping(path = "/api/project/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public void deleteProject(@PathVariable Long id, Principal principal) {
        projectController.deleteProject(id, principal.getName());
    }

}
