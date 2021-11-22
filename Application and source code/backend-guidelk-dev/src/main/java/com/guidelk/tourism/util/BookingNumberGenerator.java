package com.guidelk.tourism.util;

import com.guidelk.tourism.entity.BookingNumberConfig;
import com.guidelk.tourism.repository.BookingNumberConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;

@Service
public class BookingNumberGenerator {
    private final BookingNumberConfigRepository bookingNumberConfigRepository;

    @Autowired
    public BookingNumberGenerator(BookingNumberConfigRepository bookingNumberConfigRepository) {
        this.bookingNumberConfigRepository = bookingNumberConfigRepository;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public String  generateRefNo(String prefix){
        BookingNumberConfig refNoConfig = this.bookingNumberConfigRepository.findByPrefixAndStatus(prefix, MasterDataStatus.APPROVED.getStatusSeq());
        if (refNoConfig == null) {
            this.increaseRefNo(prefix);
            refNoConfig = this.bookingNumberConfigRepository.findByPrefixAndStatus(prefix, MasterDataStatus.APPROVED.getStatusSeq());
        }else {
            this.increaseRefNo(prefix);
        }
        String digitFormatting = String.format("%08d", refNoConfig.getNextNo());
        return prefix + "-" + Calendar.getInstance().get(Calendar.YEAR) + "-" + digitFormatting;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void increaseRefNo(String prefix) {
        BookingNumberConfig refNoConfig = this.bookingNumberConfigRepository.findByPrefixAndStatus(prefix, MasterDataStatus.APPROVED.getStatusSeq());
        if (refNoConfig == null) {
            BookingNumberConfig newRefNoConfig = new BookingNumberConfig();
            newRefNoConfig.setPrefix(prefix);
            newRefNoConfig.setNextNo(1);
            newRefNoConfig.setStatus(MasterDataStatus.APPROVED.getStatusSeq());
            this.bookingNumberConfigRepository.save(newRefNoConfig);
        } else {
            refNoConfig.setNextNo(refNoConfig.getNextNo() + 1);
            this.bookingNumberConfigRepository.save(refNoConfig);
        }
    }
}
