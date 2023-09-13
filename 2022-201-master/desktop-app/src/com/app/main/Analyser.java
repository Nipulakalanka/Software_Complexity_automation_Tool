/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mypackage;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author LENOVO
 */
public class Analyser {
    private String source;
    private final String COUNT = "COUNT";
    
    private long forRunCount = 0;    
    private long whileRunCount = 0;
    private long doRunCount = 0;    

    
    public Analyser(String source) {
        this.source = source;
    }
    
    public String countItems(Items item) {
        Pattern pattern = null;
        Matcher matcher = null;
        String itemName = item.getItemName();
        try {
            pattern = Pattern.compile(item.getRegex(), Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
            matcher = pattern.matcher(this.source);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(Analyser.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        String runCountStr = "-1";
        long count = 0;
        long runCount = -1;
        while (matcher.find()) {
            count++;
            
            switch (itemName) {
                case "for":
                    this.forRunCount += Long.parseLong(matcher.group(this.COUNT));  
                    runCount = this.forRunCount;
                    break;            
                case "while":
                    this.whileRunCount += Long.parseLong(matcher.group(this.COUNT));  
                    runCount = this.whileRunCount;
                    break;
    //            case "do":
    //                this.doRunCount += Long.parseLong(matcher.group(this.COUNT));  
    //                runCount = this.forRunCount;
    //                break;
            }
        }
        

        return count+"|"+runCount;
    }
    
}
