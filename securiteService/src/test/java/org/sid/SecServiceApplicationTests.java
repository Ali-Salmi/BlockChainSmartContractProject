package org.sid;

import org.junit.jupiter.api.Test;
import org.sid.dao.AppRoleRepository;
import org.sid.dao.AppUserRepository;
import org.sid.entities.AppUser;
import org.sid.service.AccountService;
import org.sid.web.UserForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SecServiceApplicationTests {

    @Autowired
    private AccountService accountService;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private AppRoleRepository appRoleRepository;
    @Test
    void contextLoads() {
     //   accountService.saveUser(new UserForm("redd","dfedcc1232","1234","1234"));
        appUserRepository.save(new AppUser());
    }

}
