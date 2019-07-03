package ch.zhaw.sml.iwi.meng.leantodo.controller;

import java.util.Date;
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

    public Task getTaskById(Long id) throws Exception {
        if(taskRepository.findById(id).isPresent()) {
            return taskRepository.findById(id).get();
        } else {
            throw new IllegalArgumentException("Task with id " + id + " not found!");
        }
    }

    public List<Task> getTaskByProject(Long id, String user) {
        return taskRepository.findByProjectIdAndUser(id, user);
    }

    public List<Task> getActiveTaskByProject(Long id, String user) {
        return taskRepository.findByActiveProjectIdAndUser(id, user);
    }

    public List<Task> getArchieve(String user){
        return taskRepository.findByDone(true);
    }

    public void addTask(Task newTask, String user) {
        newTask.setUser(user);
        newTask.setId(null);
        newTask.setDueDate(null);
        newTask.setDone(false);
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

    public void toggleDone(Task task) {
        if(task.isDone()) {
            task.setDone(false);
        } else {
            task.setDone(true);
        }
    }

    public boolean deleteTask(Task task, String user){

        Task orig = taskRepository.getOne(task.getId());
        task.setUser(user);

        if(!orig.getUser().equals(task.getUser())) {
            return false;
        }

        taskRepository.deleteById(task.getId());
        return true;
    }

    public List<Task> getTaskByDueDate(Date dueDate, String user) {
        return taskRepository.findByDueDateAndUser(dueDate, user);
    }

    public List<Task> getTaskTimeInterval(Date startDate, Date endDate, String user) {
        return taskRepository.findByTimeInterval(startDate, endDate, user);
    }

    public List<Task> getTasksByTag(Long id) {
        return taskRepository.findTasksByTag(id);
    }
    
}
