import webapp2
class MainPage(webapp2.RequestHandler):

    def get(self):
		self.redirect("http://cdn.spotflux.com/50x.html");


errorapplication = webapp2.WSGIApplication([
    ('/50x', MainPage),
], debug=True)
