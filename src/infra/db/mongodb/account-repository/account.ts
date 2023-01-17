import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMapper } from '../mappers/account.mapper'

export interface AccountMongoDb {
  _id: string
  name: string
  email: string
  password: string
}

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne<AccountMongoDb>({ _id: result.insertedId }) as AccountMongoDb
    return AccountMapper.toModel(account)
  }
}
