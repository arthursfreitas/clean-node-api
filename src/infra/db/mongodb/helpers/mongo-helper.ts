import { Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,
  db: { connected: false },

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = new MongoClient(uri)
    this.db.connected = true
    await this.client.connect()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
    this.db.connected = false
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client || !this.db.connected) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  }
}
