package com.ecomerce.facturacion_backend.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ecomerce.facturacion_backend.entities.ClienteInfo;
import com.ecomerce.facturacion_backend.entities.EmpresaInfo;
import com.ecomerce.facturacion_backend.entities.Factura;
import com.ecomerce.facturacion_backend.entities.FacturaRequest;
import com.ecomerce.facturacion_backend.entities.ItemFactura;
import com.ecomerce.facturacion_backend.repositories.FacturaRepository;

import jakarta.transaction.Transactional;

@Service
public class FacturaService {
    
   
    private FacturaRepository facturaRepository;

    // 2. Constructor para inyectar la dependencia
    public FacturaService(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }



    public List<Factura> buscarFacturas(LocalDate fecha, String nombreCliente, String nombreEmpresa) {
        
        // Si vienen cadenas vacías desde el frontend, las convertimos a null
        if (nombreCliente != null && nombreCliente.trim().isEmpty()) {
            nombreCliente = null;
        }
        if (nombreEmpresa != null && nombreEmpresa.trim().isEmpty()) {
            nombreEmpresa = null;
        }

        // Llamamos al repositorio que evaluará dinámicamente qué campos usar
        return facturaRepository.buscarConFiltrosDinamicos(fecha, nombreCliente, nombreEmpresa);
    }

    @Transactional
    public Factura guardar(FacturaRequest dto) {
        // 1. Crear y poblar la entidad principal Factura
        Factura factura = new Factura();
        factura.setNumero(dto.getNumero());
        factura.setFecha(dto.getFecha());
        factura.setMontoTotal(dto.getMontoTotal());
        
        // 2. Mapear y asignar el Cliente (Embeddable)
        if (dto.getCliente() != null) {
            ClienteInfo clienteInfo = new ClienteInfo();
            clienteInfo.setCliente_nombre(dto.getCliente().getNombre());
            clienteInfo.setCliente_ubicacion(dto.getCliente().getUbicacion());
            clienteInfo.setCliente_direccion(dto.getCliente().getDireccion());
            factura.setCliente(clienteInfo);
        }

        // 3. Mapear y asignar la Empresa (Embeddable)
        if (dto.getEmpresa() != null) {
            EmpresaInfo empresaInfo = new EmpresaInfo();
            empresaInfo.setEmpresa_nombre(dto.getEmpresa().getNombre());
            empresaInfo.setEmpresa_ruc(dto.getEmpresa().getRuc());
            factura.setEmpresa(empresaInfo);
        }

        // 4. Mapear y agregar los ítems usando el método de ayuda (addItem)
        if (dto.getItems() != null) {
            for (var itemDto : dto.getItems()) {
                ItemFactura item = new ItemFactura();
                item.setProducto(itemDto.getProducto());
                item.setPrecio(itemDto.getPrecio());
                item.setCantidad(itemDto.getCantidad());
                
                // Esto asigna tanto el ítem a la factura como la referencia inversa de la factura al ítem
                factura.addItem(item);
            }
        }

        // 5. Guardar en la base de datos
        // Gracias a CascadeType.ALL en la entidad Factura, esto también guardará los ItemFactura automáticamente.
        return facturaRepository.save(factura);
    }
    

    
    
    public String calcularSiguienteNumero() {
        Optional<Factura> ultimaFacturaOpt = facturaRepository.findTopByOrderByIdDesc();

        // Si la tabla está vacía, retornamos el primer correlativo por defecto
        if (ultimaFacturaOpt.isEmpty()) {
            return "F001-00001";
        }

        String ultimoNumero = ultimaFacturaOpt.get().getNumero(); // Ejemplo: "F001-00004"

        try {
            // Dividimos por el guion '-' (Parte 1: "F001", Parte 2: "00004")
            String[] partes = ultimoNumero.split("-");
            String serie = partes[0]; 
            int correlativo = Integer.parseInt(partes[1]) + 1; // Sumamos 1 -> 5

            // Formateamos de nuevo a 5 dígitos rellenando con ceros (Ej: "00005")
            String nuevoCorrelativo = String.format("%05d", correlativo);

            return serie + "-" + nuevoCorrelativo; // Resultado: "F001-00005"
            
        } catch (Exception e) {
            // Por seguridad, si el formato guardado previamente fuera irregular
            return "F001-00001";
        }
    }


 


}
