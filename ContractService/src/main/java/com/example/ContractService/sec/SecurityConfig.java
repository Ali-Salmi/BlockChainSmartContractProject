package com.example.ContractService.sec;

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

        http.authorizeRequests().antMatchers(HttpMethod.POST,"/transfertEher/**").permitAll();

        http.authorizeRequests().antMatchers(HttpMethod.POST,"/transferImmobilier/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.POST,"/gettt").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/gett").permitAll();

        http.authorizeRequests().antMatchers(HttpMethod.POST,"/addImmobilier").hasAuthority("ADMIN");
      /*  http.authorizeRequests().antMatchers(HttpMethod.GET,"/listImmobilier/**").permitAll();

        http.authorizeRequests().antMatchers(HttpMethod.GET,"/getImmobilier/**").permitAll();

        http.authorizeRequests().antMatchers(HttpMethod.GET,"/transactions/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/allTransactions/**").permitAll();*/
       // http.authorizeRequests().antMatchers("/com.example.ContractService.controllerService/**").hasAuthority("ADMIN");
        //http.authorizeRequests().antMatchers("/com.example.ContractService.controllerService/**").hasAuthority("USER");

     //   http.authorizeRequests().antMatchers("/transactions/**").hasAuthority("ADMIN");
      //  http.authorizeRequests().antMatchers("/transactions/**").hasAuthority("USER");
       /* http.authorizeRequests().antMatchers("/categories/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/categories/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/products/**").hasAuthority("USER"); */
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

}
