package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Customer;
import com.guidelk.tourism.vo.CustomerVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CustomerService {
    ResponseEntity createCustomer(Customer customer);

    ResponseEntity<Customer> updateCustomer(Customer customer);

    ResponseEntity<Customer> deleteCustomer(Integer customerId);

    List<Customer> getCustomerList();

    List<Customer> customerSearch(CustomerVo customerVo);

}
