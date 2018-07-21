package com.etherealscope.invoices.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Invoice.
 */
@Entity
@Table(name = "invoice")
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_number")
    private String number;

    @Column(name = "invoice_date")
    private Instant invoiceDate;

    @Column(name = "due_date")
    private Instant dueDate;

    @Column(name = "tax")
    private Integer tax;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Contractor contractor;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Customer customer;

    @ManyToMany
    @JoinTable(name = "invoice_items",
               joinColumns = @JoinColumn(name = "invoices_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "items_id", referencedColumnName = "id"))
    private Set<Item> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public Invoice number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Instant getInvoiceDate() {
        return invoiceDate;
    }

    public Invoice invoiceDate(Instant invoiceDate) {
        this.invoiceDate = invoiceDate;
        return this;
    }

    public void setInvoiceDate(Instant invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public Invoice dueDate(Instant dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public Integer getTax() {
        return tax;
    }

    public Invoice tax(Integer tax) {
        this.tax = tax;
        return this;
    }

    public void setTax(Integer tax) {
        this.tax = tax;
    }

    public Contractor getContractor() {
        return contractor;
    }

    public Invoice contractor(Contractor contractor) {
        this.contractor = contractor;
        return this;
    }

    public void setContractor(Contractor contractor) {
        this.contractor = contractor;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Invoice customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<Item> getItems() {
        return items;
    }

    public Invoice items(Set<Item> items) {
        this.items = items;
        return this;
    }

    public Invoice addItems(Item item) {
        this.items.add(item);
        return this;
    }

    public Invoice removeItems(Item item) {
        this.items.remove(item);
        return this;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Invoice invoice = (Invoice) o;
        if (invoice.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoice.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", invoiceDate='" + getInvoiceDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", tax=" + getTax() +
            "}";
    }
}
