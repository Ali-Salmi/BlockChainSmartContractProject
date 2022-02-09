package com.example.gestionService.sec;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests().antMatchers(HttpMethod.GET,"/allImmobilier").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/listImmobilier/**").permitAll();

        http.authorizeRequests().antMatchers(HttpMethod.GET,"/getImmobilier/**").permitAll();

        http.authorizeRequests().antMatchers(HttpMethod.GET,"/transactions/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/allTransactions/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/listImmobilierNotProved").permitAll();
        http.authorizeRequests().antMatchers("/changeOwner/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/changeOwner/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers("/listImmobilierForHomePage/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/listVisibleImmobilier").permitAll();
        http.authorizeRequests().antMatchers("/changeAnnouncement/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/deleteImobilier/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/proveAnnouncement/**").hasAuthority("ADMIN");
        // http.authorizeRequests().antMatchers("/listImmobilierNotProved").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/changeAnnouncement/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers("/saveImmobilier/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/saveImmobilier/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers("/getImmobilierbyid/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/getImmobilierbyid/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers("/setPrice/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/setPrice/**").hasAuthority("USER");

        http.authorizeRequests().antMatchers("/getMaxPrice/**").permitAll();

       // http.authorizeRequests().antMatchers("/listImmobilierByPrice/**").hasAuthority("USER");
         //   http.authorizeRequests().antMatchers("/listImmobilierByPrice/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/listImmobilierByPrice/**").permitAll();


        //   http.authorizeRequests().antMatchers("/transactions/**").hasAuthority("ADMIN");
      //  http.authorizeRequests().antMatchers("/transactions/**").hasAuthority("USER");
       /* http.authorizeRequests().antMatchers("/categories/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/categories/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/products/**").hasAuthority("USER"); */
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

}
