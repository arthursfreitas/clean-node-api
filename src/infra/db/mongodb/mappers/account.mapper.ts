import { AccountModel } from '../../../../domain/models/account'
import { AccountMongoDb } from '../account-repository/account'

export class AccountMapper {
  static toModel (accountMongoDb: AccountMongoDb): AccountModel {
    return {
      id: accountMongoDb._id,
      name: accountMongoDb.name,
      email: accountMongoDb.email,
      password: accountMongoDb.password
    }
  }
}
