package ch.zhaw.sml.iwi.meng.leantodo.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    public List<Task> findByUser(String user);

    @Query("SELECT t FROM Task as t WHERE t.project.id = ?1 AND t.user = ?2 AND t.done = false")
    public List<Task> findByProjectIdAndUserAndStandard(Long id, User user, Boolean standard);

    
}
