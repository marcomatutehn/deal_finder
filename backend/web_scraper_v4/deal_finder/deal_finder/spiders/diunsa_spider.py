# -*- coding: utf-8 -*-
import scrapy
from ..items import DealFinderItem

class DiunsaSpiderSpider(scrapy.Spider):
    name = 'diunsa'
    start_urls = ['http://diunsa.hn/']

    def parse(self, response):
        items = DealFinderItem()

        product_title = response.css('a::text').extract()
        product_price = response.css('.bestPrice::text').extract()
        # product_image_link = response.css('.s-item__image-img::attr(src)').extract()

        items['product_title'] = product_title
        items['product_price'] = product_price
        # items['product_image_link'] = product_image_link

        yield items
