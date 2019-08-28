package org.cmc.nlms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class PtitNlmsApplication extends SpringBootServletInitializer {
//    @Bean
//    public AuditorAware<String> auditorAware() {
//        return new AuditorAwareImpl();
//    }
	public static void main(String[] args) {
		SpringApplication.run(PtitNlmsApplication.class, args);
		System.out.println("alo");
	}

	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(PtitNlmsApplication.class);
    }
}
