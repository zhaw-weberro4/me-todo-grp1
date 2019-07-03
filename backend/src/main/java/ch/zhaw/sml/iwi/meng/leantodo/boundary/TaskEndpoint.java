package ch.zhaw.sml.iwi.meng.leantodo.boundary;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import ch.zhaw.sml.iwi.meng.leantodo.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ch.zhaw.sml.iwi.meng.leantodo.controller.TaskController;

@RestController
public class TaskEndpoint {

    @Autowired
    private TaskController taskController;

    @RequestMapping(path = "/api/tasks", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public List<Task> getTasks(Principal principal) {
        return  taskController.listAllTasks(principal.getName());
    }

    @RequestMapping(path = "/api/task/{id}", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public Task getTasksById(@PathVariable("id") Long id) throws Exception {
        return  taskController.getTaskById(id);
    }

    @RequestMapping(path = "/api/tasks/project/{id}", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public List<Task> getTaskByProject(@PathVariable("id") Long id, Principal principal) {
        return  taskController.getActiveTaskByProject(id, principal.getName());
    }

    @RequestMapping(path = "/api/tasks/{dueDate}", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public List<Task> getTaskByDueDate(@PathVariable("dueDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date dueDate, Principal principal) {
        return taskController.getTaskByDueDate(dueDate, principal.getName());
    }

    @RequestMapping(path = "/api/tasks/{startDate}/{endDate}", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public List<Task> getTaskByTimeInterval(@PathVariable("startDate") @DateTimeFormat(pattern = "dd.MM.yyyy") Date startDate, @PathVariable("endDate") @DateTimeFormat(pattern = "dd.MM.yyyy") Date endDate, Principal principal) {
        return taskController.getTaskTimeInterval(startDate, endDate, principal.getName());
    }

    @RequestMapping(path = "/api/task", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public void addTask(@RequestBody Task newTask, Principal principal) {
        taskController.addTask(newTask, principal.getName());
    }

    @RequestMapping(path = "/api/task", method = RequestMethod.PUT)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public void updateTask(@RequestBody Task task, Principal principal) {
        taskController.updateTask(task, principal.getName());
    }

    @RequestMapping(path = "/api/task", method = RequestMethod.DELETE)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public void deleteTask(@RequestBody Task task, Principal principal) {
        taskController.deleteTask(task, principal.getName());
    }


}
