package com.codecool.web.service;

import com.codecool.web.model.Log;
import com.codecool.web.service.exception.ServiceException;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Stream;

public class ReadLogService {
    public List<Log> LogReader() throws IOException{
        String path = System.getProperty("catalina.home");
        System.out.println(path);
        Scanner in = new Scanner(new FileReader(path + "/logs/SM2000.log"));

        StringBuilder stringBuilder = new StringBuilder();
        List<Log> logList = new ArrayList<>();
        StringBuilder stringBuilder1 = new StringBuilder();
        List<String> stringList  = new ArrayList<>();

        while(in.hasNext()){
            stringBuilder.append(in.next());
        }
        in.close();
        String bigfcknstring = stringBuilder.toString();

        for (char a :bigfcknstring.toCharArray()){

            if((String.valueOf(a)).equals("|")){
                stringList.add(stringBuilder1.toString());
                stringBuilder1.setLength(0);
            }else{
                stringBuilder1.append(a);
            }

        }
        for (int i = 0; i < stringList.size() ; i += 5) {
             logList.add(new Log(stringList.get(i),stringList.get(i+1),stringList.get(i+2),stringList.get(i+3),stringList.get(i+4)));

        }
        System.out.println(logList);

        return logList;
    }
}
