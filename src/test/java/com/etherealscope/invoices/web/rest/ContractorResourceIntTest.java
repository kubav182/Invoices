package com.etherealscope.invoices.web.rest;

import com.etherealscope.invoices.InvoicesApp;

import com.etherealscope.invoices.domain.Contractor;
import com.etherealscope.invoices.repository.ContractorRepository;
import com.etherealscope.invoices.service.ContractorService;
import com.etherealscope.invoices.service.dto.ContractorDTO;
import com.etherealscope.invoices.service.mapper.ContractorMapper;
import com.etherealscope.invoices.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.etherealscope.invoices.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ContractorResource REST controller.
 *
 * @see ContractorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InvoicesApp.class)
public class ContractorResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTIFICATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICATION_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_TAX_IDENTIFICATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TAX_IDENTIFICATION_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_POSTCODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTCODE = "BBBBBBBBBB";

    private static final String DEFAULT_BANK_CODE = "AAAAAAAAAA";
    private static final String UPDATED_BANK_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_BANK_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BANK_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_BANK_ACCOUNT_PREFIX = "AAAAAAAAAA";
    private static final String UPDATED_BANK_ACCOUNT_PREFIX = "BBBBBBBBBB";

    @Autowired
    private ContractorRepository contractorRepository;


    @Autowired
    private ContractorMapper contractorMapper;
    

    @Autowired
    private ContractorService contractorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContractorMockMvc;

    private Contractor contractor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContractorResource contractorResource = new ContractorResource(contractorService);
        this.restContractorMockMvc = MockMvcBuilders.standaloneSetup(contractorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contractor createEntity(EntityManager em) {
        Contractor contractor = new Contractor()
            .name(DEFAULT_NAME)
            .identificationNumber(DEFAULT_IDENTIFICATION_NUMBER)
            .taxIdentificationNumber(DEFAULT_TAX_IDENTIFICATION_NUMBER)
            .street(DEFAULT_STREET)
            .city(DEFAULT_CITY)
            .postcode(DEFAULT_POSTCODE)
            .bankCode(DEFAULT_BANK_CODE)
            .bankAccountNumber(DEFAULT_BANK_ACCOUNT_NUMBER)
            .bankAccountPrefix(DEFAULT_BANK_ACCOUNT_PREFIX);
        return contractor;
    }

    @Before
    public void initTest() {
        contractor = createEntity(em);
    }

    @Test
    @Transactional
    public void createContractor() throws Exception {
        int databaseSizeBeforeCreate = contractorRepository.findAll().size();

        // Create the Contractor
        ContractorDTO contractorDTO = contractorMapper.toDto(contractor);
        restContractorMockMvc.perform(post("/api/contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contractorDTO)))
            .andExpect(status().isCreated());

        // Validate the Contractor in the database
        List<Contractor> contractorList = contractorRepository.findAll();
        assertThat(contractorList).hasSize(databaseSizeBeforeCreate + 1);
        Contractor testContractor = contractorList.get(contractorList.size() - 1);
        assertThat(testContractor.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testContractor.getIdentificationNumber()).isEqualTo(DEFAULT_IDENTIFICATION_NUMBER);
        assertThat(testContractor.getTaxIdentificationNumber()).isEqualTo(DEFAULT_TAX_IDENTIFICATION_NUMBER);
        assertThat(testContractor.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testContractor.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testContractor.getPostcode()).isEqualTo(DEFAULT_POSTCODE);
        assertThat(testContractor.getBankCode()).isEqualTo(DEFAULT_BANK_CODE);
        assertThat(testContractor.getBankAccountNumber()).isEqualTo(DEFAULT_BANK_ACCOUNT_NUMBER);
        assertThat(testContractor.getBankAccountPrefix()).isEqualTo(DEFAULT_BANK_ACCOUNT_PREFIX);
    }

    @Test
    @Transactional
    public void createContractorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contractorRepository.findAll().size();

        // Create the Contractor with an existing ID
        contractor.setId(1L);
        ContractorDTO contractorDTO = contractorMapper.toDto(contractor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContractorMockMvc.perform(post("/api/contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contractorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Contractor in the database
        List<Contractor> contractorList = contractorRepository.findAll();
        assertThat(contractorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllContractors() throws Exception {
        // Initialize the database
        contractorRepository.saveAndFlush(contractor);

        // Get all the contractorList
        restContractorMockMvc.perform(get("/api/contractors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contractor.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].identificationNumber").value(hasItem(DEFAULT_IDENTIFICATION_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].taxIdentificationNumber").value(hasItem(DEFAULT_TAX_IDENTIFICATION_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].postcode").value(hasItem(DEFAULT_POSTCODE.toString())))
            .andExpect(jsonPath("$.[*].bankCode").value(hasItem(DEFAULT_BANK_CODE.toString())))
            .andExpect(jsonPath("$.[*].bankAccountNumber").value(hasItem(DEFAULT_BANK_ACCOUNT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].bankAccountPrefix").value(hasItem(DEFAULT_BANK_ACCOUNT_PREFIX.toString())));
    }
    

    @Test
    @Transactional
    public void getContractor() throws Exception {
        // Initialize the database
        contractorRepository.saveAndFlush(contractor);

        // Get the contractor
        restContractorMockMvc.perform(get("/api/contractors/{id}", contractor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contractor.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.identificationNumber").value(DEFAULT_IDENTIFICATION_NUMBER.toString()))
            .andExpect(jsonPath("$.taxIdentificationNumber").value(DEFAULT_TAX_IDENTIFICATION_NUMBER.toString()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.postcode").value(DEFAULT_POSTCODE.toString()))
            .andExpect(jsonPath("$.bankCode").value(DEFAULT_BANK_CODE.toString()))
            .andExpect(jsonPath("$.bankAccountNumber").value(DEFAULT_BANK_ACCOUNT_NUMBER.toString()))
            .andExpect(jsonPath("$.bankAccountPrefix").value(DEFAULT_BANK_ACCOUNT_PREFIX.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingContractor() throws Exception {
        // Get the contractor
        restContractorMockMvc.perform(get("/api/contractors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContractor() throws Exception {
        // Initialize the database
        contractorRepository.saveAndFlush(contractor);

        int databaseSizeBeforeUpdate = contractorRepository.findAll().size();

        // Update the contractor
        Contractor updatedContractor = contractorRepository.findById(contractor.getId()).get();
        // Disconnect from session so that the updates on updatedContractor are not directly saved in db
        em.detach(updatedContractor);
        updatedContractor
            .name(UPDATED_NAME)
            .identificationNumber(UPDATED_IDENTIFICATION_NUMBER)
            .taxIdentificationNumber(UPDATED_TAX_IDENTIFICATION_NUMBER)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .postcode(UPDATED_POSTCODE)
            .bankCode(UPDATED_BANK_CODE)
            .bankAccountNumber(UPDATED_BANK_ACCOUNT_NUMBER)
            .bankAccountPrefix(UPDATED_BANK_ACCOUNT_PREFIX);
        ContractorDTO contractorDTO = contractorMapper.toDto(updatedContractor);

        restContractorMockMvc.perform(put("/api/contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contractorDTO)))
            .andExpect(status().isOk());

        // Validate the Contractor in the database
        List<Contractor> contractorList = contractorRepository.findAll();
        assertThat(contractorList).hasSize(databaseSizeBeforeUpdate);
        Contractor testContractor = contractorList.get(contractorList.size() - 1);
        assertThat(testContractor.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testContractor.getIdentificationNumber()).isEqualTo(UPDATED_IDENTIFICATION_NUMBER);
        assertThat(testContractor.getTaxIdentificationNumber()).isEqualTo(UPDATED_TAX_IDENTIFICATION_NUMBER);
        assertThat(testContractor.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testContractor.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testContractor.getPostcode()).isEqualTo(UPDATED_POSTCODE);
        assertThat(testContractor.getBankCode()).isEqualTo(UPDATED_BANK_CODE);
        assertThat(testContractor.getBankAccountNumber()).isEqualTo(UPDATED_BANK_ACCOUNT_NUMBER);
        assertThat(testContractor.getBankAccountPrefix()).isEqualTo(UPDATED_BANK_ACCOUNT_PREFIX);
    }

    @Test
    @Transactional
    public void updateNonExistingContractor() throws Exception {
        int databaseSizeBeforeUpdate = contractorRepository.findAll().size();

        // Create the Contractor
        ContractorDTO contractorDTO = contractorMapper.toDto(contractor);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContractorMockMvc.perform(put("/api/contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contractorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Contractor in the database
        List<Contractor> contractorList = contractorRepository.findAll();
        assertThat(contractorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContractor() throws Exception {
        // Initialize the database
        contractorRepository.saveAndFlush(contractor);

        int databaseSizeBeforeDelete = contractorRepository.findAll().size();

        // Get the contractor
        restContractorMockMvc.perform(delete("/api/contractors/{id}", contractor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Contractor> contractorList = contractorRepository.findAll();
        assertThat(contractorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contractor.class);
        Contractor contractor1 = new Contractor();
        contractor1.setId(1L);
        Contractor contractor2 = new Contractor();
        contractor2.setId(contractor1.getId());
        assertThat(contractor1).isEqualTo(contractor2);
        contractor2.setId(2L);
        assertThat(contractor1).isNotEqualTo(contractor2);
        contractor1.setId(null);
        assertThat(contractor1).isNotEqualTo(contractor2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContractorDTO.class);
        ContractorDTO contractorDTO1 = new ContractorDTO();
        contractorDTO1.setId(1L);
        ContractorDTO contractorDTO2 = new ContractorDTO();
        assertThat(contractorDTO1).isNotEqualTo(contractorDTO2);
        contractorDTO2.setId(contractorDTO1.getId());
        assertThat(contractorDTO1).isEqualTo(contractorDTO2);
        contractorDTO2.setId(2L);
        assertThat(contractorDTO1).isNotEqualTo(contractorDTO2);
        contractorDTO1.setId(null);
        assertThat(contractorDTO1).isNotEqualTo(contractorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(contractorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(contractorMapper.fromId(null)).isNull();
    }
}
