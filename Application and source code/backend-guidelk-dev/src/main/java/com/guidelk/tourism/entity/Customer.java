package com.guidelk.tourism.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.guidelk.tourism.util.CustomerType;
import com.guidelk.tourism.util.GenderType;
import com.guidelk.tourism.util.TitleType;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
@Table(name = "customer", schema = "tourism")
public class Customer extends SharedModel {
    private Integer customerId;
    private String firstName;
    private String lastName;
    private String passportNumber;
    private String identificationNumber;
    private String occupation;
    private Integer titleTypeId;
    private Integer genderTypeId;
    private Integer customerTypeId;
    private Integer organizationId;
    private Integer addressBookId;

    private AddressBook addressBook;

    private String customerTypeDescription;
    private String titleDescription;
    private String genderDescription;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUSTOMER_G1")
    @SequenceGenerator(name = "CUSTOMER_G1", sequenceName = "customer_id", schema = "tourism", allocationSize = 1)
    @Column(name = "customer_id", nullable = false, precision = 0, unique = true)
    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    @Basic
    @Column(name = "first_name", nullable = false)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "passport_number")
    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    @Basic
    @Column(name = "identification_number")
    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    @Basic
    @Column(name = "occupation", nullable = false)
    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    @Basic
    @Column(name = "title_type_id", nullable = false)
    public Integer getTitleTypeId() {
        return titleTypeId;
    }

    public void setTitleTypeId(Integer titleTypeId) {
        this.titleTypeId = titleTypeId;
        if (titleTypeId != null) {
            this.setTitleDescription(TitleType.findOne(titleTypeId).getTitleDescription());
        }
    }

    @Basic
    @Column(name = "gender_type_id", nullable = false)
    public Integer getGenderTypeId() {
        return genderTypeId;
    }

    public void setGenderTypeId(Integer genderTypeId) {
        this.genderTypeId = genderTypeId;
        if (genderTypeId != null) {
            this.setGenderDescription(GenderType.findOne(genderTypeId).getGenderDescription());
        }
    }

    @Basic
    @Column(name = "customer_type_id", nullable = false)
    public Integer getCustomerTypeId() {
        return customerTypeId;
    }

    public void setCustomerTypeId(Integer customerTypeId) {
        this.customerTypeId = customerTypeId;
        if (customerTypeId != null) {
            this.setCustomerTypeDescription(CustomerType.findOne(customerTypeId).getCustomerDescription());
        }
    }

    @Basic
    @Column(name = "organization_id", nullable = false)
    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
    }

    @Transient
    public Integer getAddressBookId() {
        return addressBookId;
    }

    public void setAddressBookId(Integer addressBookId) {
        this.addressBookId = addressBookId;
    }

    @Transient
    public String getCustomerTypeDescription() {
        return customerTypeDescription;
    }

    public void setCustomerTypeDescription(String customerTypeDescription) {
        this.customerTypeDescription = customerTypeDescription;
    }

    @Transient
    public String getTitleDescription() {
        return titleDescription;
    }

    public void setTitleDescription(String titleDescription) {
        this.titleDescription = titleDescription;
    }

    @Transient
    public String getGenderDescription() {
        return genderDescription;
    }

    public void setGenderDescription(String genderDescription) {
        this.genderDescription = genderDescription;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_book_id")
    public AddressBook getAddressBook() {
        return addressBook;
    }

    public void setAddressBook(AddressBook addressBook) {
        this.addressBook = addressBook;
    }
}
