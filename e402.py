import webapp2
import wsgiref.handlers
import logging
from google.appengine.api import users


class HomeHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            self.response.out.write("Hi :1", user.nickname)
        else:
            self.error(402)


app = webapp2.WSGIApplication([
    (r'/402', HomeHandler),
], debug=True)


def handle_402(request, response, exception):
    logging.exception(exception)
    response.write("402 Payment")
    response.set_status(402)

app.error_handlers[402] = handle_402


#  Run the application
def main():
    app.run()