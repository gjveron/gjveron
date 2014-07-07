import webapp2
import wsgiref.handlers
import logging
import time
from google.appengine.api import users

class IpHandler(webapp2.RequestHandler):
    def get(self):
		ip = self.request.remote_addr
		t = time.strftime("%H:%M:%S")
		self.response.headers['Content-Type'] = 'text/plain'
		self.response.out.write(ip)
		self.response.out.write("-")
		self.response.out.write(t)

app = webapp2.WSGIApplication([
    (r'/ip', IpHandler),
], debug=True)

#  Run the application
def main():
    app.run()