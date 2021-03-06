package com.etherealscope.invoices.service;

import com.etherealscope.invoices.service.dto.ContractorDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Contractor.
 */
public interface ContractorService {

    /**
     * Save a contractor.
     *
     * @param contractorDTO the entity to save
     * @return the persisted entity
     */
    ContractorDTO save(ContractorDTO contractorDTO);

    /**
     * Get all the contractors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ContractorDTO> findAll(Pageable pageable);


    /**
     * Get the "id" contractor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ContractorDTO> findOne(Long id);

    /**
     * Delete the "id" contractor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
