package curd.oparation.ems_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Employee not found")
public class ResourneNotFound extends RuntimeException {

    public ResourneNotFound(String message) {
        super(message);
    }
}