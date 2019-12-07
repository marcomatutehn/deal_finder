# -*- coding: utf-8 -*-
import scrapy
from ..items import DealPriceItem

class EbaySpiderSpider(scrapy.Spider):
    name = 'ebay'
    # allowed_domains = ['ebay.com']
    start_urls = [
        'https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=iphone+8&_sacat=0'
    ]

    def parse(self, response):
        items = DealPriceItem()

        product_title = response.css('.s-item__title::text').extract()
        product_price = response.css('.s-item__title::text').extract()
        product_image_link = response.css('.s-item__image-img::attr(src)').extract()

        items['product_title'] = product_title
        items['product_price'] = product_price
        items['product_image_link'] = product_image_link

        yield items
