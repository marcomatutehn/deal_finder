# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import psycopg2


class DealFinderPipeline(object):

    def open_spider(self, spider):

        hostname = 'ec2-174-129-254-249.compute-1.amazonaws.com'
        username = 'chqwaffuxlymwy'
        password = '10e2e9e33509b52bb51dbbfaee48217ab6a4e3e4dd4de08952636a4ab9d7fb58'
        database = 'df3bo7fod72kks'

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
