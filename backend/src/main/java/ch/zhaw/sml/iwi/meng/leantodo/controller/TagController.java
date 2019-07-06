package ch.zhaw.sml.iwi.meng.leantodo.controller;

import ch.zhaw.sml.iwi.meng.leantodo.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ListIterator;

@Component
public class TagController {


    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TaskController taskController;



    public List<Tag> listAllTags(String loginName) {
        return tagRepository.findByUser(loginName);
    }

    public void addTag(Tag newTag, String user) {
        newTag.setId(null);
        newTag.setUser(user);
        tagRepository.save(newTag);
    }

    public void deleteTag(Long id, String user) {

        if(tagRepository.findById(id).isPresent()) {
            Tag tag = tagRepository.findById(id).get();

            if(tag.getUser().equals(user)) {
                List<Task> tasks = taskController.getTasksByTag(id, user);
                for(Task task : tasks) {
                    ListIterator<Tag> iterator = task.getTags().listIterator();

                    while(iterator.hasNext()) {
                        if(iterator.next().getId().equals(id)) {
                            iterator.remove();
                        }
                    }
                }
                tagRepository.delete(tag);
            }
        }
    }

    public Tag getTagById(Long id) {
        if(tagRepository.findById(id).isPresent()){
            return tagRepository.findById(id).get();
        } else {
            throw new IllegalArgumentException("No Tag found with this Id.");
        }
    }
}
