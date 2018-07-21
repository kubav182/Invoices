package com.etherealscope.invoices.service.mapper;

import com.etherealscope.invoices.domain.*;
import com.etherealscope.invoices.service.dto.InvoiceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Invoice and its DTO InvoiceDTO.
 */
@Mapper(componentModel = "spring", uses = {ContractorMapper.class, CustomerMapper.class, ItemMapper.class})
public interface InvoiceMapper extends EntityMapper<InvoiceDTO, Invoice> {

    @Mapping(source = "contractor.id", target = "contractorId")
    @Mapping(source = "customer.id", target = "customerId")
    InvoiceDTO toDto(Invoice invoice);

    @Mapping(source = "contractorId", target = "contractor")
    @Mapping(source = "customerId", target = "customer")
    Invoice toEntity(InvoiceDTO invoiceDTO);

    default Invoice fromId(Long id) {
        if (id == null) {
            return null;
        }
        Invoice invoice = new Invoice();
        invoice.setId(id);
        return invoice;
    }
}
