package com.guidelk.tourism.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class DateUtil {

    /**
     * convert given string to given date format
     *
     * @param format
     * @param date
     * @return
     */
    public static Date convertStringToDate(DateFormat format, String date) {
        try {
            return format.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Set given time to given date
     *
     * @param date
     * @param hour
     * @param minute
     * @param second
     * @return
     */
    public static Date setTimeToDate(Date date, Integer hour, Integer minute, Integer second) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, second);
        return calendar.getTime();
    }

    public static Date getEndOfTheDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 99);
        return calendar.getTime();
    }

    public static Date getStartOfTheDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static String convertTime(long time)
    {
        String finalTime = "";
        long hour = (time) / 60;
        long minutes = (time%(24*60)) % 60;
        long seconds = time / (24*3600);

//        finalTime = String.format("%02d H :%02d M :%02d S",
//                TimeUnit.HOURS.toHours(hour) ,
//                TimeUnit.MINUTES.toMinutes(minutes),
//                TimeUnit.SECONDS.toSeconds(seconds));
//        return finalTime;
        finalTime = String.format("%02d H :%02d M",
                TimeUnit.HOURS.toHours(hour) ,
                TimeUnit.MINUTES.toMinutes(minutes),
                TimeUnit.SECONDS.toSeconds(seconds));
        return finalTime;
    }

}
