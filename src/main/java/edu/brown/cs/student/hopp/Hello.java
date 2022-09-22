package edu.brown.cs.student.hopp;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author JavaSolutionsGuide
 *
 */
@RestController
public class Hello {

  @CrossOrigin(origins = "*", allowedHeaders = "*")
  @PostMapping(value = "/posts")
  public String sayHelloWorld() {
    System.out.println("handling login");
    return "Hello JavaSolutionsGuide Readers";
  }
}