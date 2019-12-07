# -*- coding: utf-8 -*-
import scrapy


class AmazonSpiderSpider(scrapy.Spider):
    name = 'amazon_spider'
    allowed_domains = ['amazon.com']
    start_urls = [
        'https://www.amazon.com/s?k=iPhonex&__mk_es_US=ÅMÅŽÕÑ&ref=nb_sb_noss_2'
    ]

    def parse(self, response):
        pass
