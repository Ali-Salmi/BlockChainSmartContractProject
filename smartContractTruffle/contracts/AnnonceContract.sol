// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AnnonceContract {
  

  
struct Immobilier
    {
        address ownerAddress;
        string N_titre;
    }
    event Add(address _owner, string _N_titre);
    mapping (address => Immobilier[]) public __ownerImmobiliers;

  function addImmobilier(address propertyOwner,string memory _N_titre) public
    {
        Immobilier memory MyImmobilier = Immobilier(
        {
        ownerAddress: propertyOwner,
        N_titre: _N_titre
        });
        __ownerImmobiliers[propertyOwner].push(MyImmobilier);
        emit Add(msg.sender, _N_titre);
    }
    
    function compareStrings(string memory str1, string memory str2) public pure returns (bool) {
        return (keccak256(abi.encodePacked((str1))) == keccak256(abi.encodePacked((str2))));
    }
   
    function transferImmobilier(address _Buyer,address _propertyOwner, string memory _N_titre) payable public returns (bool)
    {
        for(uint i=0; i < __ownerImmobiliers[_propertyOwner].length;i++)
        {
            if (compareStrings(__ownerImmobiliers[_propertyOwner][i].N_titre, _N_titre))
            {
                Immobilier memory myImmobilier= Immobilier(
                {
                ownerAddress:_Buyer,
                N_titre: __ownerImmobiliers[_propertyOwner][i].N_titre
                });
                __ownerImmobiliers[_Buyer].push(myImmobilier);
                delete __ownerImmobiliers[_propertyOwner][i];      // ici on supprimer l'immobilier pour _propertyOwner
                return true;
            }
 }
        return false;

    }
}
