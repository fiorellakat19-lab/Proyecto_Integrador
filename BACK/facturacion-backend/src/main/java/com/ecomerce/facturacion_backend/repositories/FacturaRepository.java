package com.ecomerce.facturacion_backend.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecomerce.facturacion_backend.entities.Factura;

public interface FacturaRepository extends JpaRepository<Factura, Long> {

// 3. Buscar facturas por el nombre del cliente (gracias a que ClienteInfo está @Embedded)
   

    @Query("SELECT f FROM Factura f WHERE " +
           "(:fecha IS NULL OR f.fecha = :fecha) AND " +
           "(:nombreCliente IS NULL OR LOWER(f.cliente.cliente_nombre) LIKE LOWER(CONCAT('%', :nombreCliente, '%'))) AND " +
           "(:nombreEmpresa IS NULL OR LOWER(f.empresa.empresa_nombre) LIKE LOWER(CONCAT('%', :nombreEmpresa, '%')))")
    List<Factura> buscarConFiltrosDinamicos(
        @Param("fecha") LocalDate fecha,
        @Param("nombreCliente") String nombreCliente,
        @Param("nombreEmpresa") String nombreEmpresa
    );



    Optional<Factura> findTopByOrderByIdDesc();
}
