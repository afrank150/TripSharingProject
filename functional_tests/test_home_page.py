## Home Page Functional Test

import sys
from .base import FunctionalTest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait


class TripCreationTest(FunctionalTest):

    def test_new_trip_creation(self):

        # User goes to website
        self.browser.get(self.server_url)

        # User notices the page title and header mention Trip
        self.assertIn('Trip', self.browser.title)
        header_text = self.browser.find_element_by_tag_name('h1').text
        self.assertIn('Trip', header_text)

        # User is invited to enter a new trip name on home page
        inputbox = self.browser.find_element_by_name('trip_name_text')
        
        # User enters a new trip name titled Colorado Visit
        inputbox.send_keys('Colorado Visit')

        # User notices a create trip button and hits this button
        create_trip_button = self.browser.find_element_by_name('Create Trip')
        create_trip_button.submit()
        
        # User is taken to a new page titled Colorado Visit
        header_text = self.browser.find_element_by_tag_name('h1').text
        self.assertIn('Test', header_text)