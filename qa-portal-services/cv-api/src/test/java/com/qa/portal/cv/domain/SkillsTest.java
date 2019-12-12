package com.qa.portal.cv.domain;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SkillsTest {


    private List<String> programmingLanguages = Arrays.asList("Java", "Go", "Python");
    private List<String> ides = Arrays.asList("IntelliJ", "VS Code");
    private List<String> operatingSystems = Arrays.asList("Ubuntu", "Debian", "Windows 10");
    private List<String> devops = Arrays.asList("Docker", "Maven", "Git");
    private List<String> databases = Arrays.asList("MySQL", "SQLite", "Redis", "PostgreSQL");
    private List<String> platforms = Arrays.asList("Windows", "Mac", "Android");
    private List<String> other = Arrays.asList("Photoshop", "Vegas Pro");

    @InjectMocks
    public Skills skills;

    @Before
    public void setVariables() {
        skills.setProgrammingLanguages(programmingLanguages);
        skills.setIdes(ides);
        skills.setOperatingSystems(operatingSystems);
        skills.setDevops(devops);
        skills.setDatabases(databases);
        skills.setPlatforms(platforms);
        skills.setOther(other);
    }

    @Test
    public void getProgrammingLanguagesTest() {
        assertEquals("getProgrammingLanguages() returning an unexpected value",
                programmingLanguages,
                skills.getProgrammingLanguages());
        assertEquals("Programming language list incorrectly sized",
                3,
                skills.getProgrammingLanguages().size());
    }

    @Test
    public void getIdesTest() {
        assertEquals("getIdes() returning an unexpected value",
                ides,
                skills.getIdes());
        assertEquals("IDE list incorrectly sized",
                2,
                skills.getIdes().size());
    }

    @Test
    public void getOperatingSystemsTest() {
        assertEquals("getOperatingSystems() returning an unexpected value",
                operatingSystems,
                skills.getOperatingSystems());
        assertEquals("OS list incorrectly sized",
                3,
                skills.getOperatingSystems().size());
    }

    @Test
    public void getDevopsTest() {
        assertEquals("getDevops() returning an unexpected value",
                devops,
                skills.getDevops());
        assertEquals("DevOps list incorrectly sized",
                3,
                skills.getDevops().size());
    }

    @Test
    public void getDatabasesTest() {
        assertEquals("getDatabases returning an unexpected value",
                databases,
                skills.getDatabases());
        assertEquals("Databases list incorrectly sized",
                4,
                skills.getDatabases().size());
    }

    @Test
    public void getPlatformsTest() {
        assertEquals("getPlatforms() returning an unexpected value",
                platforms,
                skills.getPlatforms());
        assertEquals("Platforms list incorrectly sized",
                3,
                skills.getPlatforms().size());
    }

    @Test
    public void getOtherTest() {
        assertEquals("getOther() returning an unexpected value",
                other,
                skills.getOther());
        assertEquals("Other list incorrectly sized",
                2,
                skills.getOther().size());
    }

}
