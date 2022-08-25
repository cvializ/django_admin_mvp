from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
import re

prefix_regex = r'^/@perpay-admin'

suffix_regex = r'\.[^.]{,4}$'

class RewriteStaticMiddleware(MiddlewareMixin):
    def process_request(self, request):

        if not re.search(prefix_regex, request.path_info):
            return

        suffix = ''
        if not re.search(suffix_regex, request.path_info):
            suffix = '.js'

        request.path_info = (
            settings.STATIC_URL.rstrip('/') +
            request.path_info +
            suffix
        )
