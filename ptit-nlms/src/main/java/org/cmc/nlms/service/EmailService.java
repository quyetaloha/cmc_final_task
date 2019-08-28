package org.cmc.nlms.service;

import java.nio.charset.StandardCharsets;

import javax.mail.internet.MimeMessage;

import org.cmc.nlms.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;
    
    @Autowired
    private SpringTemplateEngine templateEngine;

    public void sendForgetPasswordEmail(Mail mail) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            Context context = new Context();
            context.setVariables(mail.getModel());
            String html = templateEngine.process("email/forgotpassword-template", context);

            helper.setTo(mail.getTo());
            helper.setText(html, true);
            helper.setSubject(mail.getSubject());
            helper.setFrom(mail.getFrom());

            Thread thread = new Thread(new Runnable() {
				@Override
				public void run() {
					emailSender.send(message);
				}
			});
			thread.start();
            
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    
    public void sendUserRegistrationEmail(Mail mail) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            Context context = new Context();
            context.setVariables(mail.getModel());
            String html = templateEngine.process("email/userregistration-template", context);

            helper.setTo(mail.getTo());
            helper.setText(html, true);
            helper.setSubject(mail.getSubject());
            helper.setFrom(mail.getFrom());

            Thread thread = new Thread(new Runnable() {
				@Override
				public void run() {
					emailSender.send(message);
				}
			});
			thread.start();
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}