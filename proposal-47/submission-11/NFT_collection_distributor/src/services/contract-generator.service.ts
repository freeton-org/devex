import path from 'path'
import fs from 'fs'
import { sha256 } from 'js-sha256';

import { globals } from '../config/globals'
import { Collection } from "../models/collection";
import { AddParamsService } from './add-params.service';
import { EnumParameter } from '../models/enum';
import { MediaFile } from '../models/mediafile';

const aDataCoreFile = path.join(globals.CONTRACTS_ROOT, 'ADataCore.sol');
const aRoyaltyPayerFile = path.join(globals.CONTRACTS_ROOT, 'ARoyaltyPayer.sol');
const aRoyaltyRecipientFile = path.join(globals.CONTRACTS_ROOT, 'ARoyaltyRecipient.sol');
const auctionFile = path.join(globals.CONTRACTS_ROOT, 'Auction.sol');
const auctionRootFile = path.join(globals.CONTRACTS_ROOT, 'AuctionRoot.sol');
const dataFile = path.join(globals.CONTRACTS_ROOT, 'Data.sol');
const directSaleFile = path.join(globals.CONTRACTS_ROOT, 'DirectSale.sol');
const directSaleRootFile = path.join(globals.CONTRACTS_ROOT, 'DirectSaleRoot.sol');
const indexFile = path.join(globals.CONTRACTS_ROOT, 'Index.sol');
const indexBasisFile = path.join(globals.CONTRACTS_ROOT, 'IndexBasis.sol');
const nftRootFile = path.join(globals.CONTRACTS_ROOT, 'NftRoot.sol');
const interfacesDir = path.join(globals.CONTRACTS_ROOT, 'interfaces');
const librariesDir = path.join(globals.CONTRACTS_ROOT, 'libraries');
const resolversDir = path.join(globals.CONTRACTS_ROOT, 'resolvers');
const debotLibDir = path.join(globals.CONTRACTS_ROOT, 'debotLib')
const debotsDir = path.join(globals.CONTRACTS_ROOT, 'debots');

class ContractGenerator {

  getTempDir(collectionSettings: Collection) {
    const hashContract = sha256(JSON.stringify(collectionSettings));
    const tempDir = path.resolve(globals.RESULT_COLLECTION, hashContract);
    return tempDir;
  }

  async generateContract(collectionSettings: Collection, jsonCollection: string, enums?: EnumParameter[], mediafiles?: MediaFile[], creatorFee?: number) {
    const hashContract = sha256(JSON.stringify(collectionSettings));
    const tempDir = path.join(globals.RESULT_COLLECTION, hashContract);

    const aDataCoreFileTemp = path.join(tempDir, 'ADataCore.sol');
    const aRoyaltyPayerFileTemp = path.join(tempDir, 'ARoyaltyPayer.sol')
    const aRoyaltyRecipientFileTemp = path.join(tempDir, 'ARoyaltyRecipient.sol');
    const auctionFileTemp = path.join(tempDir, 'Auction.sol');
    const auctionRootFileTemp = path.join(tempDir, 'AuctionRoot.sol');
    const dataFileTepm = path.join(tempDir, 'Data.sol');
    const directSaleFileTemp = path.join(tempDir, 'DirectSale.sol');
    const directSaleRootFileTemp = path.join(tempDir, 'DirectSaleRoot.sol');
    const indexFileTepm = path.join(tempDir, 'Index.sol');
    const indexBasisFileTepm = path.join(tempDir, 'IndexBasis.sol');
    const nftRootFileTepm = path.join(tempDir, 'NftRoot.sol');
    const interfacesDirTepm = path.join(tempDir, 'interfaces');
    const librariesDirTepm = path.join(tempDir, 'libraries');
    const resolversDirTepm = path.join(tempDir, 'resolvers');
    const debotLibDirTepm = path.join(tempDir, 'debotLib');
    const debotsDirTepm = path.join(tempDir, 'debots');
    const iDataFileTemp = path.join(tempDir, 'interfaces', 'IData.sol')
    const enumsFileTemp = path.join(tempDir, 'libraries', 'Enums.sol');
    const debotFileTemp = path.join(tempDir, 'debots', 'MintingDebot.sol');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
      fs.cpSync(interfacesDir, interfacesDirTepm, { recursive: true });
      fs.cpSync(librariesDir, librariesDirTepm, { recursive: true });
      fs.cpSync(resolversDir, resolversDirTepm, { recursive: true });
      fs.cpSync(debotLibDir, debotLibDirTepm, { recursive: true });
      fs.cpSync(debotsDir, debotsDirTepm, { recursive: true });
      fs.copyFileSync(aDataCoreFile, aDataCoreFileTemp);
      fs.copyFileSync(aRoyaltyPayerFile, aRoyaltyPayerFileTemp);
      fs.copyFileSync(aRoyaltyRecipientFile, aRoyaltyRecipientFileTemp);
      fs.copyFileSync(auctionFile, auctionFileTemp);
      fs.copyFileSync(auctionRootFile, auctionRootFileTemp);
      fs.copyFileSync(directSaleFile, directSaleFileTemp);
      fs.copyFileSync(directSaleRootFile, directSaleRootFileTemp);
      fs.copyFileSync(indexFile, indexFileTepm);
      fs.copyFileSync(indexBasisFile, indexBasisFileTepm);
      fs.writeFileSync(path.join(tempDir, "collectionInfo.json"), jsonCollection, { flag: 'w' });

      let addParamsService = new AddParamsService();

      if (collectionSettings.getParameters().length == 0) {
        fs.copyFileSync(nftRootFile, nftRootFileTepm);
        fs.copyFileSync(dataFile, dataFileTepm);
      } else {
        await addParamsService.addSeveralParams(collectionSettings.getParameters(), nftRootFile, nftRootFileTepm);
        await addParamsService.addSeveralParams(collectionSettings.getParameters(), dataFile, dataFileTepm);
        await addParamsService.addSeveralParams(collectionSettings.getParameters(), iDataFileTemp, iDataFileTemp);
        await addParamsService.addSeveralParams(collectionSettings.getParameters(), debotFileTemp, debotFileTemp);
        if (enums !== undefined) {
          await addParamsService.addEnums(enums, enumsFileTemp, enumsFileTemp);
          await addParamsService.addEnums(enums, debotFileTemp, debotFileTemp);
        }
        if (mediafiles !== undefined) {
          await addParamsService.addMediaFiles(mediafiles, debotFileTemp, debotFileTemp);
        }
      }
      if (collectionSettings.getRarities().length == 0 ||
        (collectionSettings.getRarities().length == 1 && collectionSettings.getRarities()[0].getName() == '')) {
        await addParamsService.removeNftTypeChecking(nftRootFileTepm, debotFileTemp);
      }
      await addParamsService.addCreatorFee(path.join(librariesDirTepm, 'FeeValues.sol'), creatorFee);
    }
    console.log(collectionSettings, collectionSettings.getRarities().length);

    return tempDir;

  }

  deleteContractDirTemp(collectionSettings: Collection) {
    const hashContract = sha256(JSON.stringify(collectionSettings));
    const tempDir = path.join(globals.RESULT_COLLECTION, hashContract)

    fs.access(tempDir, fs.constants.F_OK, (err) => {
      if (err) {
        console.log("Временной папки для данного контракта нет")
      } else {
        fs.rm(tempDir, { recursive: true, force: true }, () => {
          console.log(`Временный файл ${hashContract} удален`)
        })
      }
    });
  }

}

export const { generateContract } = new ContractGenerator()
export const { deleteContractDirTemp } = new ContractGenerator()
export const { getTempDir } = new ContractGenerator()