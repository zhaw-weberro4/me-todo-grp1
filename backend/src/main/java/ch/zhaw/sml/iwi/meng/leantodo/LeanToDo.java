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

import java.util.Calendar;
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

        Project inbox = this.dummyProject("Inbox", "user", true);
        Project archive = this.dummyProject("Archive", "user", true);
        Project someday = this.dummyProject("Irgendwann", "user", true);
        Project mond = this.dummyProject("Mond Landung", "user", false);
        Project mb = this.dummyProject("Mobile Engineering", "user", false);

        Tag programming = this.dummyTag("Programmieren", "user");
        Tag phone = this.dummyTag("Telefon", "user");

        this.dummyTask("Ferien eintragen", "Ferien mitteilen und eintragen", "user", programming, mond, 1);
        this.dummyTask("Auf den Mond fliegen", "Mittag essen organisieren", "user", programming, mond, 3);
        this.dummyTask("Bestellung abschicken", "Neue Bestellung abschicken", "user", programming, archive, 4);
        this.dummyTask("Finish This app", "Programming the GTD App", "user", phone, mb, 5);
        this.dummyTask("Phone Call", "Programming the GTD App", "user", phone, mb, 10);
        this.dummyTask("Programming", "Programming the GTD App", "user", phone, mond, 40);
    }

    private Project dummyProject(String title, String user, Boolean standard) {
        Project project = new Project();
        project.setTitle(title);
        project.setUser(user);
        project.setStandard(standard);
        return projectRepository.save(project);
    }

    private Tag dummyTag(String title, String user) {
        Tag tag = new Tag();
        tag.setTitle(title);
        tag.setUser(user);
        return tagRepository.save(tag);
    }

    private Task dummyTask(String title, String desc, String user, Tag tag, Project project, int day) {
        Date dt = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(dt);
        c.add(Calendar.DATE, 1);

        Task task = new Task();
        task.setTitle(title);
        task.setDescription(desc);
        task.setUser(user);
        task.addTag(tag);
        task.setProject(project);

        c.add(Calendar.DATE, day);
        task.setDueDate(c.getTime());
        return taskRepository.save(task);
    }
}
