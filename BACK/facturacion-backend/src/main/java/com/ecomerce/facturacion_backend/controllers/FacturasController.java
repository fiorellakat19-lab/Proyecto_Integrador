package com.ecomerce.facturacion_backend.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecomerce.facturacion_backend.entities.Factura;
import com.ecomerce.facturacion_backend.entities.FacturaRequest;
import com.ecomerce.facturacion_backend.services.FacturaService;




@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "*")
public class FacturasController {

   // 1. Declaras la variable como final (sin asignarle null)
    private final FacturaService facturaService;

    // 2. Creas el constructor para que Spring le asigne la instancia automáticamente
    public FacturasController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }
   @GetMapping("/buscar")
    public ResponseEntity<List<Factura>> buscarFacturas(
            @RequestParam(required = false) 
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
            
            @RequestParam(required = false) String nombreCliente,
            
            @RequestParam(required = false) String nombreEmpresa
    ) {
        List<Factura> facturas = facturaService.buscarFacturas(fecha, nombreCliente, nombreEmpresa);
        return ResponseEntity.ok(facturas);
    }  

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarFactura(@RequestBody FacturaRequest facturaRequest) {
        try {
            // Validación rápida de items vacíos
            if (facturaRequest.getItems() == null || facturaRequest.getItems().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("mensaje", "La factura debe incluir al menos un ítem.");
                return ResponseEntity.badRequest().body(error);
            }

            // Procesamiento a través de capa de servicio
            var facturaRegistrada = facturaService.guardar(facturaRequest);

            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Factura registrada exitosamente");
            response.put("data", facturaRegistrada);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Error al registrar la factura: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }

   
       


    }

     @GetMapping("/siguiente-numero")
       public ResponseEntity<Map<String, String>> obtenerSiguienteNumero() {
        String siguienteNumero = facturaService.calcularSiguienteNumero(); // Lógica para calcular F001-000X
        
        Map<String, String> response = new HashMap<>();
        response.put("numero", siguienteNumero);
        
        return ResponseEntity.ok(response);
      }


}
