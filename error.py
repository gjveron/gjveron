import webapp2
class MainPage(webapp2.RequestHandler):

    def get(self):
		self.redirect("http://cdn.spotflux.com/50x.html");
        #self.response.headers['Content-Type'] = 'text/plain'
        #self.response.write('Hello, World!')


errorapplication = webapp2.WSGIApplication([
    ('/error', MainPage),
], debug=True)
