from pymongo import MongoClient
from config import config

class Database:
    def __init__(self):
        self.client = MongoClient(config.MONGO_URI)
        self.db = self.client[config.DATABASE_NAME]
        self.collection = self.db[config.COLLECTION_NAME]

    def insert_data(self, data):
        if isinstance(data, list):
            self.collection.insert_many(data)
        else:
            self.collection.insert_one(data)

    def close(self):
        self.client.close()
