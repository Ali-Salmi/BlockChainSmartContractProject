package org.sid.web;

import lombok.Data;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.sid.dao.AppUserRepository;
import org.sid.entities.AppUser;
import org.sid.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private AppUserRepository appUserRepository;
    @PostMapping("/register")
    public AppUser register(@RequestBody UserForm userForm){
        System.out.println("********************************"+userForm.getUsername()+" "+userForm.getAdress()+" "+userForm.getPassword());
        return  accountService.saveUser(userForm);
    }

  /*  @GetMapping(path="/getAdresssByUserName/{username}",produces= "application/json")//
    public String listImmobilier(@PathVariable("username") String username){
        List<AppUser> listUsers=appUserRepository.findAll();
        for(int i=0;i<listUsers.size();i++){
            if(listUsers.get(i).getUsername().equals(username)){
              return listUsers.get(i).getAdress();
            }
        }
        return listUsers.get(0).getAdress();
    }*/
  @GetMapping(path="/getAdresssByUserName/{username}",produces= "application/json")//
  public String listImmobilier(@PathVariable("username") String username){
      //JSONObject jo = new JSONObject();
      //JSONArray ja = new JSONArray();
      List<AppUser> listUsers=appUserRepository.findAll();
      for(int i=0;i<listUsers.size();i++){
          if(listUsers.get(i).getUsername().equals(username)){
              //ja.set(0,listUsers.get(i).getAdress());
            //  jo.put("addressUser",listUsers.get(i).getAdress());
              //return  "{ \"addressUser\": \""+listUsers.get(i).getAdress()+"\""+"}";
              return "{ \"addressUser\": \""+listUsers.get(i).getAdress()+"\""+"}";
          }
      }
      return "{ \"addressUser\": \""+listUsers.get(0).getAdress()+"\""+"}";
  }
}

