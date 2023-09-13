
package com.raven.form;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;


public class Form_2 extends javax.swing.JPanel {
    
    private Analyser analyser;

   
    public Form_2(int index) {
        initComponents();
        setOpaque(false);
        
       
    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        textField1 = new java.awt.TextField();
        jScrollPane1 = new javax.swing.JScrollPane();
        TextContent = new javax.swing.JTextArea();
        jButton1 = new javax.swing.JButton();
        jScrollPane2 = new javax.swing.JScrollPane();
        txtcount = new javax.swing.JTextArea();
        jScrollPane3 = new javax.swing.JScrollPane();
        txtcount1 = new javax.swing.JTextArea();

        textField1.setText("textField1");

        TextContent.setColumns(20);
        TextContent.setRows(5);
        jScrollPane1.setViewportView(TextContent);

        jButton1.setBackground(new java.awt.Color(51, 51, 51));
        jButton1.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        jButton1.setText("Choose File");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        txtcount.setColumns(20);
        txtcount.setRows(5);
        txtcount.setWrapStyleWord(true);
        jScrollPane2.setViewportView(txtcount);

        txtcount1.setColumns(20);
        txtcount1.setRows(5);
        jScrollPane3.setViewportView(txtcount1);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 602, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(33, 33, 33)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jScrollPane3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 154, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(125, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(25, 25, 25)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 368, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(32, 32, 32)
                        .addComponent(jScrollPane3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addGap(12, 12, 12)
                .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 43, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(20, 20, 20))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        List<String> strArray = new ArrayList<String>();
        List<String> strArray1 = new ArrayList<String>();
        JFileChooser fs = new JFileChooser();
        fs.showOpenDialog(null);
        File f = fs.getSelectedFile();
        String filename = f.getAbsolutePath();
        try{
            FileReader reader = new FileReader(filename);
            BufferedReader br = new BufferedReader(reader);
            TextContent.read(br,null);
            
            
            String text = TextContent.getText();
            analyser = new Analyser(text);
            
            Items items = new Items(null);
            String[] itemList = items.getItemNames();
            int itemListCount = itemList.length;
            int i = 0;
            int count1=0;
            for (i = 0;i<itemListCount;i++) {
                String item = itemList[i];
                String[] countData = analyser.countItems(new Items(item)).split("\\|");
                
                
                
                
               System.out.println(item.toUpperCase()+": " +countData[0]);
               strArray.add(item.toUpperCase()+": " +countData[0]);
               
               txtcount.setText(strArray.toString());
               count1= count1+ Integer.parseInt(countData[0]);
                   
               
                if (!countData[1].equals("-1")) {
                    System.out.println("Loop Runs: " +countData[1]);
                    System.out.println("\n");
                    strArray1.add("Loop Runs: " +countData[1]);
                    txtcount1.setText(strArray1.toString());
                }  
            }
            txtcount.setText(strArray.toString()+"\n" + "Total Count: " +count1);
            System.out.println(count1);

            br.close();
            TextContent.requestFocus();
        }
        catch(Exception e){
            JOptionPane.showMessageDialog(null, e);
        }
    }//GEN-LAST:event_jButton1ActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JTextArea TextContent;
    private javax.swing.JButton jButton1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane3;
    private java.awt.TextField textField1;
    private javax.swing.JTextArea txtcount;
    private javax.swing.JTextArea txtcount1;
    // End of variables declaration//GEN-END:variables
}
