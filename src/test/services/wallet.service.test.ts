import dotenv from 'dotenv'
import { MongoDBDataSource } from '../../datasources/mongodb.datasource'
import { WalletModel } from '../../model'
import { WalletRepository } from '../../repository/wallet.repository'
import { WalletService } from '../../services'
dotenv.config()


describe('Wallet', ()=>{
  it('credits user', ()=>{
    const walletService = new WalletService(new WalletRepository(new MongoDBDataSource(), new WalletModel()))
  }
  )
})