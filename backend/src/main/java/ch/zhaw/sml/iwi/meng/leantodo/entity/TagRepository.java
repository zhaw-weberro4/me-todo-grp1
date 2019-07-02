package ch.zhaw.sml.iwi.meng.leantodo.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    public List<Tag> findByUser(String user);
}
