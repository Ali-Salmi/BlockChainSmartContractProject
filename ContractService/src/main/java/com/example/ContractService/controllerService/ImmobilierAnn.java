package com.example.ContractService.controllerService;

public class ImmobilierAnn {

    private String ownerAdress;
    private String recipentAdress;
    private String titre;
    private String price;
    private String ownerPrivateKey;
    private String recipentPrivateKey;

    public void setOwnerAdress(String ownerAdress) {
        this.ownerAdress = ownerAdress;
    }

    public void setRecipentAdress(String recipentAdress) {
        this.recipentAdress = recipentAdress;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setOwnerPrivateKey(String ownerPrivateKey) {
        this.ownerPrivateKey = ownerPrivateKey;
    }

    public void setRecipentPrivateKey(String recipentPrivateKey) {
        this.recipentPrivateKey = recipentPrivateKey;
    }

    public String getOwnerAdress() {
        return ownerAdress;
    }

    public String getRecipentAdress() {
        return recipentAdress;
    }

    public String getTitre() {
        return titre;
    }

    public String getPrice() {
        return price;
    }

    public String getOwnerPrivateKey() {
        return ownerPrivateKey;
    }

    public String getRecipentPrivateKey() {
        return recipentPrivateKey;
    }
}
