package ch.zhaw.sml.iwi.meng.leantodo.controller;

import ch.zhaw.sml.iwi.meng.leantodo.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TagController {


    @Autowired
    private TagRepository tagRepository;



    public List<Tag> listAllTags(String loginName) {
        return tagRepository.findByUser(loginName);
    }

    public void addTag(Tag newTag, String user) {
        newTag.setId(null);
        newTag.setUser(user);
        tagRepository.save(newTag);
    }

    public boolean deleteTag(Long id, String user) {

        boolean success = false;

        if(tagRepository.findById(id).isPresent()) {
            Tag tag = tagRepository.findById(id).get();

            if(tag.getUser().equals(user)) {
                tagRepository.delete(tag);
                success = true;
            }
        }
        return success;
    }
    
}
