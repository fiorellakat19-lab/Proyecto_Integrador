package com.ecomerce.facturacion_backend.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;


import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

// import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(name="facturas")
@Getter
@Setter
@NoArgsConstructor
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identificador único en la base de datos

    @Column(name = "numero", nullable = false, unique = true)
    private String numero; // Ejemplo: 'F001-002'

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha; // Mapeado correctamente a fecha

    @Column(name = "monto_total", precision = 12, scale = 2, nullable = false)
    private BigDecimal montoTotal;

    @Embedded
    private ClienteInfo cliente;

    @Embedded
    private EmpresaInfo empresa;
   
    @OneToMany(mappedBy = "factura", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemFactura> items = new ArrayList<>();

    // --- Métodos de ayuda para mantener la bidireccionalidad ---
    public void addItem(ItemFactura item) {
        items.add(item);
        item.setFactura(this);
    }

    public void removeItem(ItemFactura item) {
        items.remove(item);
        item.setFactura(null);
    }



    public void setItems(List<ItemFactura> items) { 
        this.items.clear();
        if (items != null) {
            for (ItemFactura item : items) {
                addItem(item);
            }
        }
    }
}
