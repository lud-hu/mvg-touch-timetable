import sys
import functions_framework
import mvg_api
from flask import escape, jsonify

cors_origin = "https://mvg-touch-timetable.web.app"


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

        # Limit results to first 20
        response = jsonify(station_list[:20])
        response.headers.set('Access-Control-Allow-Origin', cors_origin)
        response.headers.set('Access-Control-Allow-Methods', 'GET')
        return response
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

        # route = get_slim_route(mvg_api.get_route(start, stop))
        route = mvg_api.get_route(start, stop)
        response = jsonify(route)
        response.headers.set('Access-Control-Allow-Origin', cors_origin)
        response.headers.set('Access-Control-Allow-Methods', 'GET')
        return response
    return 'request params missing'


def get_slim_route_entry(route_entry):
    d = {
        "arrival": route_entry["arrival"]
    }
    return d


def get_slim_route(route_response):
    return list(map(lambda x: get_slim_route_entry(x), route_response))
