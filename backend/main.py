import sys

import functions_framework
import mvg_api
from flask import escape, jsonify


@functions_framework.http
def autocomplete(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_args = request.args

    if request_args and 'name' in request_args:
        name = request_args['name']

        station_list = mvg_api.get_stations(name)
        return jsonify(station_list)
    return 'request params missing'


@functions_framework.http
def get_route(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    # request_json = request.get_json(silent=True)
    request_args = request.args

    # if request_json and 'name' in request_json:
    #     name = request_json['name']
    if request_args and 'start' in request_args and 'stop' in request_args:
        start = request_args['start']
        stop = request_args['stop']

        route = mvg_api.get_route(start, stop)
        return jsonify(route)
    return 'request params missing'
