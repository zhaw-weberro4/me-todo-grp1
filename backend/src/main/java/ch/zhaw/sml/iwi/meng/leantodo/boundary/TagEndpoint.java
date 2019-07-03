package ch.zhaw.sml.iwi.meng.leantodo.boundary;


import ch.zhaw.sml.iwi.meng.leantodo.controller.TagController;
import ch.zhaw.sml.iwi.meng.leantodo.entity.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class TagEndpoint {

    @Autowired
    private TagController tagController;

    @RequestMapping(path = "/api/tags", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public List<Tag> getTags(Principal principal) {
        return tagController.listAllTags(principal.getName());
    }



    @RequestMapping(path = "/api/tag", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public void addTag(@RequestBody Tag newTag, Principal principal) {
        tagController.addTag(newTag, principal.getName());
    }



    @RequestMapping(path = "/api/tag/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public void deleteTag(@PathVariable Long id, Principal principal) {
            boolean success = tagController.deleteTag(id, principal.getName());
    }
}
