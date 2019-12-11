# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import psycopg2
import configparser

config = configparser.ConfigParser()
config.read('db.cfg')

HOSTNAME = config['POSTGRESS_DB']['HOSTNAME']
DB_USERNAME = config['POSTGRESS_DB']['DB_USERNAME']
DB_PASSWORD = config['POSTGRESS_DB']['DB_PASSWORD']
DATABASE = config['POSTGRESS_DB']['DATABASE']

class DealFinderPipeline(object):

    def open_spider(self, spider):

        hostname = HOSTNAME
        username = DB_USERNAME
        password = DB_PASSWORD
        database = DATABASE

        self.connection = psycopg2.connect(
            host=hostname,
            user=username,
            password=password,
            dbname=database
        )
        self.cur = self.connection.cursor()

    def close_spider(self, spider):
        self.cur.close()
        self.connection.close()

    def process_item(self, item, spider):
        self.cur.execute(
            "insert into deal_content(article,price) values(%s,%s)",
                          (item['product_title'], item['product_price'])
        )
        self.connection.commit()
        return item
