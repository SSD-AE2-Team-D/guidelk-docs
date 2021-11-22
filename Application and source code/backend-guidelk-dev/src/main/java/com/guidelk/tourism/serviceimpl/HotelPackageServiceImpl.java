package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.HotelPackage;
import com.guidelk.tourism.entity.PackageFeedback;
import com.guidelk.tourism.entity.QHotelPackage;
import com.guidelk.tourism.repository.HotelPackageRepository;
import com.guidelk.tourism.repository.PackageFeedbackRepository;
import com.guidelk.tourism.service.HotelPackageService;
import com.guidelk.tourism.util.DateUtil;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.HotelPackageVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class HotelPackageServiceImpl implements HotelPackageService {
    private final HotelPackageRepository hotelPackageRepository;
    private final PackageFeedbackRepository packageFeedbackRepository;
    private final Logger logger = LoggerFactory.getLogger(HotelPackageServiceImpl.class);

    @Autowired
    public HotelPackageServiceImpl(HotelPackageRepository hotelPackageRepository,
                                   PackageFeedbackRepository packageFeedbackRepository) {
        this.hotelPackageRepository = hotelPackageRepository;
        this.packageFeedbackRepository = packageFeedbackRepository;
    }

    @Override
    @Transactional
    public ResponseEntity createHotelPackage(HotelPackage hotelPackage) {
        ResponseEntity responseEntity;
        this.hotelPackageRepository.save(hotelPackage);
        responseEntity = new ResponseEntity<>(hotelPackage, HttpStatus.CREATED);
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity feedback(PackageFeedback packageFeedback) {
        ResponseEntity responseEntity;
        packageFeedback.setStatus(MasterDataStatus.APPROVED.getStatusSeq());
        this.packageFeedbackRepository.save(packageFeedback);
        responseEntity = new ResponseEntity<>(packageFeedback, HttpStatus.CREATED);
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<HotelPackage> updateHotelPackage(HotelPackage hotelPackage) {
        ResponseEntity<HotelPackage> responseEntity;
        Optional<HotelPackage> dbHotelPackage = this.hotelPackageRepository.findById(hotelPackage.getHotelPackageId());
        if (dbHotelPackage.isPresent()) {
            this.hotelPackageRepository.save(hotelPackage);
            responseEntity = new ResponseEntity<>(hotelPackage, HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(hotelPackage, HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<HotelPackage> deleteHotelPackage(Integer hotelPackageId) {
        ResponseEntity<HotelPackage> responseEntity;
        Optional<HotelPackage> dbHotelPackage = this.hotelPackageRepository.findById(hotelPackageId);
        if (dbHotelPackage.isPresent()) {
            dbHotelPackage.get().getHotelPackageActivities().forEach(hotelPackageActivity -> hotelPackageActivity.setStatus(MasterDataStatus.DELETED.getStatusSeq()));
            dbHotelPackage.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.hotelPackageRepository.save(dbHotelPackage.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return responseEntity;
    }

    @Override
    public List<PackageFeedback> viewFeedBack(Integer packageId) {
        return this.packageFeedbackRepository.findByPackageId(packageId);
    }

    @Override
    public List<HotelPackage> hotelPackageSearch(HotelPackageVo hotelPackageVo) {
        List<HotelPackage> hotelPackageList = new ArrayList<>();
        try {
            QHotelPackage qHotelPackage = QHotelPackage.hotelPackage;
            BooleanBuilder builder = new BooleanBuilder();

            builder.and(qHotelPackage.organizationId.eq(hotelPackageVo.getOrganizationId()));

            if (hotelPackageVo.getPackageName() != null) {
                builder.and(qHotelPackage.packageName.containsIgnoreCase(hotelPackageVo.getPackageName()));
            }
            if (hotelPackageVo.getHotelId() != null) {
                builder.and(qHotelPackage.hotelId.eq(hotelPackageVo.getHotelId()));
            }
            if (hotelPackageVo.getRoomTypeId() != null) {
                builder.and(qHotelPackage.roomTypeId.eq(hotelPackageVo.getRoomTypeId()));
            }
            if (hotelPackageVo.getActivityTypeId() != null) {
                builder.and(qHotelPackage.hotelPackageActivities.any().activityTypeId.eq(hotelPackageVo.getActivityTypeId()));
            }
            if (hotelPackageVo.getStartDate() != null) {
                Date startDate = DateUtil.setTimeToDate(hotelPackageVo.getStartDate(), 23, 59, 59);
                builder.and(qHotelPackage.startDate.after(startDate));
            }
            if (hotelPackageVo.getEndDate() != null) {
                Date endDate = DateUtil.setTimeToDate(hotelPackageVo.getEndDate(), 23, 59, 59);
                builder.and(qHotelPackage.endDate.before(endDate));
            }
            if (hotelPackageVo.getStatus() != null) {
                builder.and(qHotelPackage.status.eq(hotelPackageVo.getStatus()));
            }
            hotelPackageList = (List<HotelPackage>) this.hotelPackageRepository.findAll(builder);
        } catch (Exception e) {
            logger.error("Hotel Package Search Error", e.getMessage());
        }
        return hotelPackageList;

    }

   }
