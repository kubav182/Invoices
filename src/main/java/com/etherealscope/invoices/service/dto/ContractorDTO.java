package com.etherealscope.invoices.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Contractor entity.
 */
public class ContractorDTO implements Serializable {

    private Long id;

    private String name;

    private String identificationNumber;

    private String taxIdentificationNumber;

    private String street;

    private String city;

    private String postcode;

    private String bankCode;

    private String bankAccountNumber;

    private String bankAccountPrefix;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    public String getTaxIdentificationNumber() {
        return taxIdentificationNumber;
    }

    public void setTaxIdentificationNumber(String taxIdentificationNumber) {
        this.taxIdentificationNumber = taxIdentificationNumber;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public String getBankAccountPrefix() {
        return bankAccountPrefix;
    }

    public void setBankAccountPrefix(String bankAccountPrefix) {
        this.bankAccountPrefix = bankAccountPrefix;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userAccountId) {
        this.userId = userAccountId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ContractorDTO contractorDTO = (ContractorDTO) o;
        if (contractorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contractorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContractorDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", identificationNumber='" + getIdentificationNumber() + "'" +
            ", taxIdentificationNumber='" + getTaxIdentificationNumber() + "'" +
            ", street='" + getStreet() + "'" +
            ", city='" + getCity() + "'" +
            ", postcode='" + getPostcode() + "'" +
            ", bankCode='" + getBankCode() + "'" +
            ", bankAccountNumber='" + getBankAccountNumber() + "'" +
            ", bankAccountPrefix='" + getBankAccountPrefix() + "'" +
            ", user=" + getUserId() +
            "}";
    }
}
