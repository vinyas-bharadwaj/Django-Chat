import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.settings")

django_application = get_asgi_application()

from . import urls 
from webchat.middleware import JWTAuthMiddleWare 

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMiddleWare(URLRouter(urls.websocket_urlpatterns)),
    }
)

