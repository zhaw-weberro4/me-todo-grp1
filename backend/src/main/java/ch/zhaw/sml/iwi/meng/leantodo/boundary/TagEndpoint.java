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
    public ResponseEntity addTag(@RequestBody Tag newTag, Principal principal) {

        System.out.println(newTag.getTitle());

        try {
            tagController.addTag(newTag, principal.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body("The tag was successfully added to your profile");
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }



    @RequestMapping(path = "/api/tag/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public ResponseEntity deleteTag(@PathVariable Long id, Principal principal) {
        try {
            boolean success = tagController.deleteTag(id, principal.getName());

            if(success){
                return ResponseEntity.status(HttpStatus.OK).body("The tag was successfully deleted");
            } else  {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Either the tag doesn't exists or you aren't the owner of the tag.");
            }
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }
}
