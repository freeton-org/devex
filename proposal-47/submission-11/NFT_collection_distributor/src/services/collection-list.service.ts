import { Account } from '@tonclient/appkit';
import { signerKeys, TonClient } from '@tonclient/core';
import { libNode } from '@tonclient/lib-node';
import fs from 'fs'
import path from 'path';
import { everscale_settings } from '../config/everscale-settings';
import { globals } from '../config/globals';

export type CollectionInfo = {
  name : string
  address : string
  icon : string
}

export class CollectionListService {
  private client: TonClient;

  constructor(){
    TonClient.useBinaryLibrary(libNode);
    this.client = new TonClient({
        network: {
            endpoints: [everscale_settings.ENDPOINTS]
        }
    });
  }
  destructor() : void {
    this.client.close();
  }

  async getCollectionList() : Promise<CollectionInfo[]> {
    let collectionsInfo : CollectionInfo[] = []
     
    let collectionDirList = fs.readdirSync(globals.RESULT_COLLECTION, {withFileTypes: true}).filter((fileOrDir) => {
      return fileOrDir.isDirectory()
    })

    for (const collectionDir of collectionDirList) {
      try{
        let collectionAccount = await this.getCollectionAccount(collectionDir.name);
      
        let collectionIcon = (await collectionAccount.runLocal("getIcon", {})).decoded?.output.icon;
        let collectionName = (await collectionAccount.runLocal("getName", {})).decoded?.output.name;
        collectionName = Buffer.from(collectionName, 'hex').toString()
        let oneCollectionInfo : CollectionInfo = {
          name: collectionName,
          address: await collectionAccount.getAddress(),
          icon: collectionIcon
        }
        collectionsInfo.push(oneCollectionInfo)

      } catch (err) {
        console.log(err)
        console.log(`Коллекции с адресом 0:${collectionDir.name} не существует`)
      }
    }

    return collectionsInfo
  }

  private async getCollectionAccount(tempCollectionDir : string) : Promise<Account> {
    let abi = await JSON.parse(fs.readFileSync(path.join(globals.RESULT_COLLECTION, tempCollectionDir, 'NftRoot.abi.json')).toString());
    let tvc = fs.readFileSync(path.join(globals.RESULT_COLLECTION, tempCollectionDir, 'NftRoot.tvc'), {encoding: 'base64'});
    let address = "0:" + tempCollectionDir;
    const collectionAccount = new Account({
      abi: abi,
      tvc: tvc
    }, {
      signer: signerKeys(everscale_settings.KEYS),
      address: address,
      client: this.client
    });
    return collectionAccount;
  }

}