package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.Customer;
import com.guidelk.tourism.service.CustomerService;
import com.guidelk.tourism.util.CustomerType;
import com.guidelk.tourism.util.GenderType;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.util.TitleType;
import com.guidelk.tourism.vo.CustomerVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_CREATE')")
    public ResponseEntity createCustomer(@Valid @RequestBody Customer customer) {
        return this.customerService.createCustomer(customer);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_UPDATE')")
    public ResponseEntity<Customer> updateCustomer(@Valid @RequestBody Customer customer) {
        return this.customerService.updateCustomer(customer);
    }

    @DeleteMapping("{customerId}")
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_DELETE')")
    public ResponseEntity<Customer> deleteCustomer(@PathVariable("customerId") Integer customerId) {
        return this.customerService.deleteCustomer(customerId);
    }

    @PostMapping("/customerSearch")
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_VIEW')")
    public List<Customer> customerSearch(@RequestBody CustomerVo customerVo) {
        return this.customerService.customerSearch(customerVo);
    }

    @GetMapping("/getCustomerList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_VIEW')")
    public List<Customer> getCustomerList() {
        return this.customerService.getCustomerList();
    }

    @GetMapping("/getTitleList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_VIEW')")
    public List<TitleType> getTitleList() {
        return Arrays.asList(TitleType.values());
    }

    @GetMapping("/getGenderList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_VIEW')")
    public List<GenderType> getGenderList() {
        return Arrays.asList(GenderType.values());
    }

    @GetMapping("/getCustomerTypeList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_VIEW')")
    public List<CustomerType> getCustomerTypeList() {
        return Arrays.asList(CustomerType.values());
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@customer_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }
}
