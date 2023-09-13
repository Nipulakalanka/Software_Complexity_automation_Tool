/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.raven.form;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.apache.commons.io.IOUtils;
import org.json.JSONObject;

/**
 *
 * @author LENOVO
 */
public class APICall {
    String finalresult = null;
    
    
    public String apirun(String age,String lan,String JDK, String OOP, String arch,String frame,String exp,String complex){
          System.out.println(age +"\n" +lan+"\n"+JDK+"\n"+OOP+"\n"+arch+"\n"+frame+"\n"+exp+"\n"+complex );  
          String jsonInputString = "[{\"Age\":24,\"Knowledge rating based on preferd programming language\":4,\"Java JDK\":3,\"Java OOP\":4,\"Java Architecture\":3,\"Java Framework\":5,\"Experience\":3,\"Source Code Complexity(%)\":84,\"Pro_lan\":0}]";
          //String jsonInputString1 = "[{\"Age :" +age+ "\",\"Knowledge rating based on preferd programming language :" +lan+ "\",\"Java JDK: " +JDK+ "\",\"Java OOP: " +OOP+ "\",\"Java Architecture: " +arch+ "\",\"Java Framework: " +frame+ "\",\"Experience: " +exp+ "\",\"Source Code Complexity(%): " +complex+ "\",\"Pro_lan\":0}]";
          //String jsonInputString = "[{\"Age\":,\"Knowledge rating based on preferd programming language\":4,\"Java JDK\":3,\"Java OOP\":4,\"Java Architecture\":3,\"Java Framework\":5,\"Experience\":3,\"Source Code Complexity(%)\":84,\"Pro_lan\":0}]";
          System.out.println(jsonInputString);
          System.out.println("ran");
          try{
            
            URL url = new URL ("http://127.0.0.1:5002/complexity/predict");
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setConnectTimeout(5000);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; charset-UTF-8");
            con.setRequestProperty("Accept", "application/json");
            OutputStream os  = con.getOutputStream();
            os.write(jsonInputString.getBytes("UTF-8"));
            os.close();


    //        try(OutputStream os = con.getOutputStream()) {
    //            byte[] input = jsonInputString.getBytes("utf-8");
    //               os.write(input, 0, input.length);			
    //            }
    //        try(BufferedReader br = new BufferedReader(
    //            new InputStreamReader(con.getInputStream(), "utf-8"))) {
    //                StringBuilder response = new StringBuilder();
    //                String responseLine = null;
    //                while ((responseLine = br.readLine()) != null) {
    //                    response.append(responseLine.trim());
    //                }
    //                System.out.println(response.toString());
    //            }

                InputStream in  = new BufferedInputStream(con.getInputStream());
                String result = IOUtils.toString(in, "UTF-8");
                System.out.println(result);
                System.out.println("Results after reading json Response");
                JSONObject myresponse = new JSONObject(result);
                System.out.println(myresponse);
                in.close();
                con.disconnect();
                finalresult=myresponse.toString();
                System.out.println(finalresult);
                
        }catch (Exception e ){
            
            System.out.println(e);
        }
        
        return finalresult;
        
    }
    
}
