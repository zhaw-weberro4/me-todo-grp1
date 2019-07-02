package ch.zhaw.sml.iwi.meng.leantodo;

import ch.zhaw.sml.iwi.meng.leantodo.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import ch.zhaw.sml.iwi.meng.leantodo.entity.Task;

import java.util.Date;

@SpringBootApplication
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class LeanToDo implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(LeanToDo.class, args);
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TagRepository tagRepository;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    // This is only really relevant for development, where we have different servers for frontend and backend
                    .allowedOrigins("http://localhost:8100")
                    .allowedMethods("GET", "PUT", "POST", "DELETE")
                    // AllowCredentials is necessary, as it sets 'Access-Control-Allow-Credentials'. 
                    // Otherwise Angular's HttpClient will not pass the Cookie back.
                    .allowCredentials(true);
            }
        };
    }

    @Override
    public void run(String... args) throws Exception {
        User u = new User();
        u.setLoginName("user");
        u.setPasswordHash(new BCryptPasswordEncoder().encode("user"));
        Role r = new Role();
        r.setRoleName("ROLE_USER");
        roleRepository.save(r);
        u.getRoles().add(r);
        userRepository.save(u);

        Project inboxProject = new Project();
        inboxProject.setTitle("Inbox");
        inboxProject.setUser("user");
        inboxProject = projectRepository.save(inboxProject);

        Project archiveProject = new Project();
        archiveProject.setTitle("Archive");
        archiveProject.setUser("user");
        archiveProject = projectRepository.save(archiveProject);

        Project gtdProject = new Project();
        gtdProject.setTitle("GTD-Project");
        gtdProject.setUser("user");
        gtdProject = projectRepository.save(gtdProject);

        Tag tagOne = new Tag();
        tagOne.setTitle("Programming");
        tagOne.setUser("user");
        tagOne = tagRepository.save(tagOne);

        Tag tagTwo = new Tag();
        tagTwo.setTitle("Phone Call");
        tagTwo.setUser("user");
        tagTwo = tagRepository.save(tagTwo);

        Task taskOne = new Task();
        taskOne.setTitle("Finish This app");
        taskOne.setDescription("Programming the GTD App");
        taskOne.setDueDate(new Date());
        taskOne.setUser("user");
        taskOne.addTag(tagOne);
        taskOne.setProject(archiveProject);
        taskRepository.save(taskOne);

        Task taskTwo = new Task();
        taskTwo.setTitle("Reply to student");
        taskTwo.setDescription("Reply to the monday meeting by Mail.");
        taskTwo.setDueDate(new Date());
        taskTwo.setUser("user");
        taskTwo.addTag(tagTwo);
        taskTwo.setProject(inboxProject);
        taskRepository.save(taskTwo);

        Task taskThree = new Task();
        taskThree.setTitle("Finishing Calendar");
        taskThree.setDescription("Work until the calendar page works.");
        taskThree.setDueDate(new Date());
        taskThree.setUser("user");
        taskThree.addTag(tagTwo);
        taskThree.setProject(gtdProject);
        taskRepository.save(taskThree);







    }
}
