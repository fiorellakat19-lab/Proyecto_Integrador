package com.ecomerce.facturacion_backend.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Data;


import java.util.List;
@Data
public class FacturaRequest {
   

    private String numero;
    private LocalDate fecha;
    private BigDecimal montoTotal;
    private ClienteDto cliente;
    private EmpresaDto empresa;
    private List<ItemFacturaDto> items;

    @Data
    // Clases internas estáticas para sub-objetos
    public static class ClienteDto {
        private String nombre;
        private String ubicacion;
        private String direccion;

    }
    @Data
    public static class EmpresaDto {
        private String nombre;
        private String ruc;

       
    }
    @Data
    public static class ItemFacturaDto {
        private Long id;
        private String producto;
        private Double precio;
        private Integer cantidad;

    }




}
