package ch.zhaw.sml.iwi.meng.leantodo.entity;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    public List<Task> findByUser(String user);

    @Query("SELECT t FROM Task as t WHERE t.project.id = ?1 AND t.user = ?2 AND t.done = false")
    public List<Task> findByActiveProjectIdAndUser(Long id, String user);

    @Query("SELECT t FROM Task as t WHERE t.project.id = ?1 AND t.user = ?2")
    public List<Task> findByProjectIdAndUser(Long id, String user);

    public List<Task> findByDone(boolean done);

    public List<Task> findByDueDateAndUser(Date dueDate, String user);

    @Query("SELECT t FROM Task as t WHERE t.dueDate >= :startDate AND t.dueDate <= :endDate AND t.user = :user")
    public List<Task> findByTimeInterval(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("user") String user);

    @Query("SELECT t FROM Task t JOIN t.tags s WHERE s.id = ?1 AND t.user = ?2 ")
    public List<Task> findTasksByTag(Long id, String user);
}
