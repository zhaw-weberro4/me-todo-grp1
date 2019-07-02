package ch.zhaw.sml.iwi.meng.leantodo.boundary;

import java.security.Principal;
import java.util.List;


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

    @RequestMapping(path = "/api/project", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public List<Project> getProjects(Principal principal) {
        return projectController.listAllProjects(principal.getName());
    }

    @RequestMapping(path = "/api/project", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public ResponseEntity addProject(@RequestBody Project newProject, Principal principal) {
        try {
            projectController.addProject(newProject, principal.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body("Das Projekt wurde ihrem Benutzer erfolgreich hinzugefügt.");
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    @RequestMapping(path = "/api/project/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public ResponseEntity deleteProject(@PathVariable Long id, Principal principal) {
        try {
            boolean success = projectController.deleteProject(id, principal.getName());

            if(success){
                return ResponseEntity.status(HttpStatus.OK).body("Das Projekt wurde erfolgreich gelöscht.");
            } else  {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Das Projekt existiert nicht oder Sie sind nicht der Eigner dieses Projekts.");
            }
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }
}
