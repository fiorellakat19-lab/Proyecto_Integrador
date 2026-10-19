package com.ecomerce.facturacion_backend.entities;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class EmpresaInfo {
   private String empresa_nombre;
    private String empresa_ruc;

  
} 
