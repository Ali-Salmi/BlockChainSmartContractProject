package com.example.gestionService.Controllers;


import com.example.gestionService.Dao.ImmobilierRepository;
import com.example.gestionService.Entities.Immobilier;
import com.example.gestionService.Entities.Transaction;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
@RestController
public class ControllerImmobilier {

    @Autowired
    ImmobilierRepository immobilierRepository;


    @GetMapping("/listImmobilierByPrice/{price}/{address}")
    public List<Immobilier> listImmobilierByPrice(@PathVariable("price") double price,@PathVariable("address") String address){
        List<Immobilier> listImm=new ArrayList<Immobilier>();
        List<Immobilier> listImmobilier=immobilierRepository.findAll();
        for(int i=0;i<listImmobilier.size();i++){
            if(listImmobilier.get(i).getPrice()<=price && listImmobilier.get(i).isAnnounced()==true
                    && listImmobilier.get(i).isProved()==true
                    && !listImmobilier.get(i).getAddressOwner().equals(address)){
                listImm.add(listImmobilier.get(i));
            }
        }
        return listImm;
    }
    @GetMapping("/getMaxPrice/{address}")
    public double getmMaxPrice(@PathVariable("address") String address){
        List<Immobilier> listImmobilier=immobilierRepository.findAll();
        double max=listImmobilier.get(0).getPrice();
        for(int i=0;i<listImmobilier.size();i++){
            if( listImmobilier.get(i).isAnnounced()==true
                    && listImmobilier.get(i).isProved()==true
                    && !listImmobilier.get(i).getAddressOwner().equals(address)){
                if(max<listImmobilier.get(i).getPrice()) max=listImmobilier.get(i).getPrice();
            }
        }
        return max;
    }
    @GetMapping("/listImmobilier/{address}")
    public List<Immobilier> listImmobilier(@PathVariable("address") String address){
        List<Immobilier> listImm=new ArrayList<Immobilier>();
        List<Immobilier> listImmobilier=immobilierRepository.findAll();
        for(int i=0;i<listImmobilier.size();i++){
            if(listImmobilier.get(i).getAddressOwner().equals(address)){
                listImm.add(listImmobilier.get(i));
            }
        }
        return listImm;
    }
    ////////////////////////////////////////// get by id ///////////////
    @GetMapping("/getImmobilier/{id}")
    public Immobilier getImmobilier(@PathVariable("id") Long id){

        List<Immobilier> listImmobilier=immobilierRepository.findAll();
        for(int i=0;i<listImmobilier.size();i++){
            if(listImmobilier.get(i).getId()==id){
               return listImmobilier.get(i);
            }
        }
return null;
    }
    @GetMapping("/listVisibleImmobilier")
    public List<Immobilier> listVisibleImmobilier(){
        List<Immobilier> listImm=new ArrayList<Immobilier>();
        List<Immobilier> listImmobilier=immobilierRepository.findAll();
        for(int i=0;i<listImmobilier.size();i++){
            if(listImmobilier.get(i).isAnnounced()==true){
                listImm.add(listImmobilier.get(i));
            }
        }
        return listImm;
    }


    @GetMapping("/listImmobilierForHomePage/{address}")
    public List<Immobilier> listImmobilierForHomePage(@PathVariable("address") String address){
        List<Immobilier> listImm=new ArrayList<Immobilier>();
        List<Immobilier> listImmobilier=immobilierRepository.findAll();
        for(int i=0;i<listImmobilier.size();i++){
            if(listImmobilier.get(i).isAnnounced()==true
                    && listImmobilier.get(i).isProved()==true
                    && !listImmobilier.get(i).getAddressOwner().equals(address)){
                listImm.add(listImmobilier.get(i));
            }
        }
        return listImm;
    }


    @GetMapping("/transactions/{id}")
    public Collection<Transaction> getTransactionsOfImmobilier(@PathVariable("id") Long id){
        Immobilier immobilier=new Immobilier();
        List<Immobilier> listImmobilier=immobilierRepository.findAll();
        for(int i=0;i<listImmobilier.size();i++){
            if(listImmobilier.get(i).getId()==id){
                immobilier=listImmobilier.get(i);
                break;
            }
        }
        return immobilier.getTransactions();
    }

    @GetMapping("/allImmobilier")
    public List<Immobilier> allImmobilier(){
        return immobilierRepository.findAll();
    }
    @PostMapping("/saveImmobilier")
    public Immobilier saveImmobilier(@RequestBody Immobilier immobilier){
        immobilier.setAnnounced(true);
        immobilier.setProved(false);
        return immobilierRepository.save(immobilier);
    }
    @GetMapping("/changeAnnouncement/{id}")
    public void changeAnnouncement(@PathVariable("id") Long id){
        List<Immobilier> immobilierList=immobilierRepository.findAll();
        for(int i=0;i<immobilierList.size();i++){
            if(immobilierList.get(i).getId()==id){
                if(immobilierList.get(i).isAnnounced()==false) {immobilierList.get(i).setAnnounced(true);}
                else
                if(immobilierList.get(i).isAnnounced()==true) immobilierList.get(i).setAnnounced(false);
                immobilierRepository.save(immobilierList.get(i));
            }
        }
    }

    @PutMapping("/setPrice/{id}")
    public Immobilier setPriceImmobilier(@PathVariable("id") Long id,@RequestBody Immobilier immobilier){
        Immobilier immobilier1=this.immobilierRepository.findById(id).get();
        immobilier1.setPrice(immobilier.getPrice());
        return this.immobilierRepository.save(immobilier1);
    }

    @DeleteMapping("/deleteImobilier/{id}")
    public void deleteImmobilier(@PathVariable("id") Long id){
        List<Immobilier> immobilierList=immobilierRepository.findAll();
        for(int i=0;i<immobilierList.size();i++){
            if(immobilierList.get(i).getId()==id){
                immobilierRepository.delete(immobilierList.get(i));
            }
        }
    }
    @GetMapping("/listImmobilierNotProved")
    public List<Immobilier> listImmobilierNotProved(){
        List<Immobilier> listImm=new ArrayList<Immobilier>();
        List<Immobilier> listImmobilier=immobilierRepository.findAll();
        for(int i=0;i<listImmobilier.size();i++){
            if(listImmobilier.get(i).isProved()==false){
                listImm.add(listImmobilier.get(i));
            }
        }
        return listImm;
    }
    @PutMapping("/changeOwner/{id}")
    public String changeOwner(@PathVariable("id") Long id,@RequestBody String newOwner){
        Immobilier immobilier=this.immobilierRepository.findById(id).get();
        immobilier.setAddressOwner(newOwner);
        immobilier.setAnnounced(false);
        this.immobilierRepository.save(immobilier);
        return newOwner;
    }
    @GetMapping("/getImmobilierbyid/{id}")
    public Immobilier getImmobilierbyid(@PathVariable("id") Long id){
        return this.immobilierRepository.findById(id).get();
    }
    @PutMapping("/proveAnnouncement/{id}")
    public void proveAnnouncement(@PathVariable("id") Long id){
        List<Immobilier> immobilierList=immobilierRepository.findAll();
        for(int i=0;i<immobilierList.size();i++){
            if(immobilierList.get(i).getId()==id){
                immobilierList.get(i).setProved(true);
                immobilierRepository.save(immobilierList.get(i));
            }
        }
    }
}
