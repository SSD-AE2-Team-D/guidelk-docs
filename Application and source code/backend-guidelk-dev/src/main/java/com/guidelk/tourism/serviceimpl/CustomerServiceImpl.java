package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.Customer;
import com.guidelk.tourism.entity.QCustomer;
import com.guidelk.tourism.repository.CustomerRepository;
import com.guidelk.tourism.service.CustomerService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.CustomerVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public ResponseEntity createCustomer(Customer customer) {
        ResponseEntity responseEntity;
        if (customer.getAddressBook() != null) {
            customer.getAddressBook().setStatus(MasterDataStatus.APPROVED.getStatusSeq());
        }
        this.customerRepository.save(customer);
        responseEntity = new ResponseEntity<>(customer, HttpStatus.CREATED);
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Customer> updateCustomer(Customer customer) {
        ResponseEntity<Customer> responseEntity;
        Optional<Customer> dbCustomer = this.customerRepository.findById(customer.getCustomerId());
        if (dbCustomer.isPresent()) {
            this.customerRepository.save(customer);
            responseEntity = new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(customer, HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Customer> deleteCustomer(Integer customerId) {
        Optional<Customer> dbCustomer = this.customerRepository.findById(customerId);
        ResponseEntity<Customer> responseEntity;
        if (dbCustomer.isPresent()) {
            dbCustomer.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            dbCustomer.get().getAddressBook().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.customerRepository.save(dbCustomer.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public List<Customer> getCustomerList() {
        return this.customerRepository.findByStatus(MasterDataStatus.APPROVED.getStatusSeq());
    }

    @Override
    public List<Customer> customerSearch(CustomerVo customerVo) {
        List<Customer> customerList = new ArrayList<>();
        try {
            QCustomer qCustomer = QCustomer.customer;
            BooleanBuilder builder = new BooleanBuilder();

            builder.and(qCustomer.organizationId.eq(customerVo.getOrganizationId()));

            if (customerVo.getFirstName() != null) {
                builder.and(qCustomer.firstName.containsIgnoreCase(customerVo.getFirstName()));
            }
            if (customerVo.getLastName() != null) {
                builder.and(qCustomer.lastName.containsIgnoreCase(customerVo.getLastName()));
            }
            if (customerVo.getPassportNumber() != null) {
                builder.and(qCustomer.passportNumber.containsIgnoreCase(customerVo.getPassportNumber()));
            }
            if (customerVo.getIdentificationNumber() != null) {
                builder.and(qCustomer.identificationNumber.containsIgnoreCase(customerVo.getIdentificationNumber()));
            }
            if (customerVo.getOccupation() != null) {
                builder.and(qCustomer.occupation.containsIgnoreCase(customerVo.getOccupation()));
            }
            if (customerVo.getTitleTypeId() != null) {
                builder.and(qCustomer.titleTypeId.eq(customerVo.getTitleTypeId()));
            }
            if (customerVo.getGenderTypeId() != null) {
                builder.and(qCustomer.genderTypeId.eq(customerVo.getGenderTypeId()));
            }
            if (customerVo.getCustomerTypeId() != null) {
                builder.and(qCustomer.customerTypeId.eq(customerVo.getCustomerTypeId()));
            }
            if (customerVo.getCountryId() != null) {
                builder.and(qCustomer.addressBook.countryId.eq(customerVo.getCountryId()));
            }
            if (customerVo.getLocationId() != null) {
                builder.and(qCustomer.addressBook.locationId.eq(customerVo.getLocationId()));
            }
            if (customerVo.getStatus() != null) {
                builder.and(qCustomer.status.eq(customerVo.getStatus()));
            }
            customerList = (List<Customer>) this.customerRepository.findAll(builder);
        } catch (Exception e) {
            logger.error("Customer Search Error", e.getMessage());
        }
        return customerList;
    }
}
