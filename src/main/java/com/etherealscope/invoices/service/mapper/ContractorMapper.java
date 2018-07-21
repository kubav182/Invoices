package com.etherealscope.invoices.service.mapper;

import com.etherealscope.invoices.domain.*;
import com.etherealscope.invoices.service.dto.ContractorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Contractor and its DTO ContractorDTO.
 */
@Mapper(componentModel = "spring", uses = {UserAccountMapper.class})
public interface ContractorMapper extends EntityMapper<ContractorDTO, Contractor> {

    @Mapping(source = "user.id", target = "userId")
    ContractorDTO toDto(Contractor contractor);

    @Mapping(source = "userId", target = "user")
    Contractor toEntity(ContractorDTO contractorDTO);

    default Contractor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Contractor contractor = new Contractor();
        contractor.setId(id);
        return contractor;
    }
}
