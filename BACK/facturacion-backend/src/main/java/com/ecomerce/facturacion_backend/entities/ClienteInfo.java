package com.ecomerce.facturacion_backend.entities;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class ClienteInfo {
    
    private String cliente_nombre;
    private String cliente_ubicacion;
    private String cliente_direccion;

 
}
