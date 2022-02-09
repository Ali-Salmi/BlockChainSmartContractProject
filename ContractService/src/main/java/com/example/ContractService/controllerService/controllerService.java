package com.example.ContractService.controllerService;

import com.example.ContractService.AnnonceContract.AnnonceContract;
import org.springframework.web.bind.annotation.*;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;
import java.math.BigDecimal;
import java.math.BigInteger;

@RestController
public class controllerService {
    Web3j web3j= Web3j.build(new HttpService("HTTP://127.0.0.1:7545"));
    private static BigInteger GAS_LIMIT= BigInteger.valueOf(6721975L);
    private static BigInteger GAS_PRICE =BigInteger.valueOf(20000000000L);

    private String deployContract(Web3j web3j,TransactionManager transactionManager) throws Exception {

        return AnnonceContract.deploy(web3j,transactionManager,GAS_PRICE,GAS_LIMIT).send().getContractAddress();
    }
    @PostMapping("/DeployContract")
    public void  DeployContract() throws Exception {
        TransactionManager transactionManager = new RawTransactionManager(
                web3j,
                getCredentialsFromPrivateKey("9ad22684f48baa24c9ecd1cd2b91096709289e405f3bcca8bd6991096dd66c06")
        );
        String deployedAddress = deployContract(web3j,transactionManager);
        System.out.println("**********************");
    }

    private AnnonceContract loadContract(Web3j web3j, TransactionManager transactionManager){
        //CONTRACT_ADDRESS
        String contractAddress="0xCD56A79d5fE240db0dBa72129d26419CF293047F";
        return AnnonceContract.load(contractAddress,web3j,transactionManager,GAS_PRICE,GAS_LIMIT);
    }
    @PostMapping("/addImmobilier")
    public void addImmobilier(@RequestBody ImmobilierAnn immobilierAnn) throws Exception {
        System.out.println("owner :"+immobilierAnn.getOwnerAdress()+" Price: "+immobilierAnn.getPrice()+"Titre: "+immobilierAnn.getTitre());
        TransactionManager transactionManager = new RawTransactionManager(
                //miner is static, he's always the owner
                web3j,getCredentialsFromPrivateKey("9ad22684f48baa24c9ecd1cd2b91096709289e405f3bcca8bd6991096dd66c06") );
        AnnonceContract annonceContract=loadContract(web3j,transactionManager);
        annonceContract.addImmobilier(immobilierAnn.getOwnerAdress(),immobilierAnn.getTitre()).send();
        System.out.println("Immobiler added");
    }

    private static Credentials getCredentialsFromPrivateKey(String P) {
        return Credentials.create(P);
    }

    //transfer eth
    @PostMapping("/transfertEher/{ownerAdress}")
    public boolean transfertEherr(@RequestBody ImmobilierAnn immobilierAnn,@PathVariable("ownerAdress") String ownerAdress) throws Exception {
        TransactionManager transactionManager=new RawTransactionManager(
                web3j,
                getCredentialsFromPrivateKey(immobilierAnn.getOwnerPrivateKey())
        );
        //get Ether of an account
        EthGetBalance ethGetBalance = web3j
                .ethGetBalance(ownerAdress, DefaultBlockParameterName.LATEST)
                .sendAsync()
                .get();
        //Convert BgInteger to Ether
        BigDecimal amountWei=Convert.fromWei(ethGetBalance.getBalance().toString(), Convert.Unit.ETHER);
        System.out.println("after: "+ethGetBalance.getBalance());
        System.out.println("befor: "+amountWei);

        if(amountWei.compareTo(BigDecimal.valueOf(Double.valueOf(immobilierAnn.getPrice())))==1){
            Transfer transfer=new Transfer(web3j,transactionManager);
            TransactionReceipt transactionReceipt=transfer.sendFunds(
                    immobilierAnn.getRecipentAdress(),
                    BigDecimal.valueOf(Double.valueOf(immobilierAnn.getPrice())),
                    Convert.Unit.ETHER,
                    GAS_PRICE,
                    GAS_LIMIT
            ).send();
            return true;
        }
        return false;

    }


   /* //transfer eth
    @PostMapping("/transfertEher/{ownerAdress}")
    public boolean transfertEherr(@RequestBody ImmobilierAnn immobilierAnn,@PathVariable("ownerAdress") String ownerAdress) throws Exception {
        TransactionManager transactionManager=new RawTransactionManager(
                web3j,
                getCredentialsFromPrivateKey(immobilierAnn.getRecipentPrivateKey())
        );
        //get Ether of an account
        EthGetBalance ethGetBalance = web3j
                .ethGetBalance(immobilierAnn.getRecipentAdress(), DefaultBlockParameterName.LATEST)
                .sendAsync()
                .get();
        //Convert BgInteger to Ether
        BigDecimal amountWei=Convert.fromWei(ethGetBalance.getBalance().toString(), Convert.Unit.ETHER);
        System.out.println("after: "+ethGetBalance.getBalance());
        System.out.println("befor: "+amountWei);

        if(amountWei.compareTo(BigDecimal.valueOf(Double.valueOf(immobilierAnn.getPrice())))==1){
            Transfer transfer=new Transfer(web3j,transactionManager);
            TransactionReceipt transactionReceipt=transfer.sendFunds(
                    ownerAdress,
                    BigDecimal.valueOf(Double.valueOf(immobilierAnn.getPrice())),
                    Convert.Unit.ETHER,
                    GAS_PRICE,
                    GAS_LIMIT
            ).send();
            return true;
        }
        return false;

    }
*/

    @PostMapping("/transfertEher")
    public boolean transfertEher(@RequestBody ImmobilierAnn immobilierAnn) throws Exception {
        TransactionManager transactionManager=new RawTransactionManager(
                web3j,
                getCredentialsFromPrivateKey(immobilierAnn.getRecipentPrivateKey())
        );
        //get Ether of an account
        EthGetBalance ethGetBalance = web3j
                .ethGetBalance(immobilierAnn.getRecipentAdress(), DefaultBlockParameterName.LATEST)
                .sendAsync()
                .get();
        //Convert BgInteger to Ether
        BigDecimal amountWei=Convert.fromWei(ethGetBalance.getBalance().toString(), Convert.Unit.ETHER);
        System.out.println("after: "+ethGetBalance.getBalance());
        System.out.println("befor: "+amountWei);

        if(amountWei.compareTo(BigDecimal.valueOf(Double.valueOf(immobilierAnn.getPrice())))==1){
            Transfer transfer=new Transfer(web3j,transactionManager);
            TransactionReceipt transactionReceipt=transfer.sendFunds(
                    immobilierAnn.getOwnerAdress(),
                    BigDecimal.valueOf(Double.valueOf(immobilierAnn.getPrice())),
                    Convert.Unit.ETHER,
                    GAS_PRICE,
                    GAS_LIMIT
            ).send();
            return true;
        }
        return false;

    }

    @PostMapping("/transferImmobilier")
    public boolean transferImmobilier(@RequestBody ImmobilierAnn immobilierAnn) throws Exception {
       // System.out.println(immobilierAnn.getTitre());
        TransactionManager transactionManager=new RawTransactionManager(
                web3j,
                getCredentialsFromPrivateKey(immobilierAnn.getRecipentPrivateKey())
        );
        if (!this.transfertEher(immobilierAnn)) return false;
        System.out.println("DONE");
        AnnonceContract annonceContract=loadContract(web3j,transactionManager);
        annonceContract.transferImmobilier(immobilierAnn.getRecipentAdress(),immobilierAnn.getOwnerAdress(),immobilierAnn.getTitre()).send();
        System.out.println("Immobilier trasferer with success");
        double a=Double.parseDouble(immobilierAnn.getPrice());
        a=a*0.05;
        immobilierAnn.setPrice(Double.toString(a));
        immobilierAnn.setOwnerAdress("0xacC56de6BcA57cfE0Ee3b1bbdCa4949BF6977D82");
        if (!this.transfertEher(immobilierAnn)) return false;
        return true;
    }
    @GetMapping("/gett")
    public String gett(){
        return "hello redwane";
    }
    @PostMapping("/gettt")
    public String gettt(){
        return "hello redwane Mahjoubi";
    }

}
