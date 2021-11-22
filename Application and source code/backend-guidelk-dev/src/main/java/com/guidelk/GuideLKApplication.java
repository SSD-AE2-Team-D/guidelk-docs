package com.guidelk;

import com.cosium.spring.data.jpa.entity.graph.repository.support.EntityGraphJpaRepositoryFactoryBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableJpaRepositories(repositoryFactoryBeanClass = EntityGraphJpaRepositoryFactoryBean.class)
@EnableJpaAuditing(dateTimeProviderRef = "dateAuditingProvider", auditorAwareRef = "usernameAuditorAware")
@EnableSwagger2
@EntityScan
public class GuideLKApplication {

    public static void main(String[] args) {
        SpringApplication.run(GuideLKApplication.class, args);
    }
}
