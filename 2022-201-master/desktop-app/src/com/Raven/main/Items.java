/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.raven.form;

/**
 *
 * @author LENOVO
 */

public class Items {
    private final String REGEX_VARIABLE = "([public|private|protected]+\\s{1,})?([static|final]+)?([A-Z0-9_\\[\\]]+)(\\[)?([A-Z0-9_\\\"\\']+)?(\\])?\\s{1,}?([A-Z0-9_]+)(\\s{1,}=\\s{1,}(new)?\\s{1,}([A-Z0-9_]+)(\\[)?(\\()?([A-Z0-9_\\\"\\']+)?(\\])?(\\)?))?(\\s{1,}=\\s{1,}([A-Z0-9\\.\\\"\\\"\\[\\]]+))?;";
    private final String REGEX_IF = "(if)\\s{1,}\\(.+\\)\\s{1,}(\\{)?";
    private final String REGEX_SWITCH = "(switch)\\s{1,}\\(.+\\)\\s{1,}(\\{)";
    private final String REGEX_DO = "(do)\\s{1,}(\\{)";    
    private final String REGEX_WHILE = "(?:while)\\s{1,}\\((\\s{1,})?(.+)(\\s{1,})?(?:[\\<\\>\\=\\s])(?<COUNT>[0-9]+)(\\s{1,})?\\)";
    private final String REGEX_FOR = "(?:for)\\s{1,}\\((int|long|short)?\\s{1,}(?:[A-Z0-9_]+)(?:\\s{1,})?\\=(?:[A-Z0-9_]+)(\\s{1,})?;([A-Z0-9_]+)(\\s{1,})?([\\<\\>])(?<COUNT>[0-9]+)(\\s{1,})?;.+\\{";
    private final String[] ITEM_NAMES = new String[]{"if", "var", "switch", "while", "do", "for"};
    
    private String itemName;
    
    public Items(String itemName) {
        this.itemName = itemName;
    }
    
    public String[] getItemNames() {
        return this.ITEM_NAMES;
    }
    public String getItemName() {
        return this.itemName.toLowerCase();
    }
    
    public String getRegex() throws IllegalAccessException {
        this.itemName = this.itemName.toLowerCase();
        String regex = "";
        switch (this.itemName) {
            case "if":
                regex = this.REGEX_IF;
                break;
            case "var":
                regex = this.REGEX_VARIABLE;
                break;
            case "switch":
                regex = this.REGEX_SWITCH;
                break;
            case "while":
                regex = this.REGEX_WHILE;
                break;
            case "do":
                regex = this.REGEX_DO;
                break;            
            case "for":
                regex = this.REGEX_FOR;
                break;
            default:
                throw new IllegalAccessException("Invalid Item Name");
        }
        
        return regex;
    }
}
