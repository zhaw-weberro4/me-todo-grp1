package ch.zhaw.sml.iwi.meng.leantodo.controller;

import java.util.List;

import ch.zhaw.sml.iwi.meng.leantodo.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ch.zhaw.sml.iwi.meng.leantodo.entity.TaskRepository;

@Component
public class TaskController {


    @Autowired
    private TaskRepository taskRepository;

    public List<Task> listAllTasks(String user) {
        return taskRepository.findByUser(user);
    }

    public void getActiveTaskByProject(Long id, String user) {

    }

    public void addTask(Task newTask, String user) {
        newTask.setUser(user);
        newTask.setId(null);
        taskRepository.save(newTask);
    }

    public void updateTask(Task task, String user) {
        Task orig = taskRepository.getOne(task.getId());
        // Check if the original Task was present and that it belonged to the same owner
        if(orig == null || !orig.getUser().equals(user)) {
            return;
        }
        // Ok, let's overwrite the existing task.
        taskRepository.save(task);
    }
    
}
