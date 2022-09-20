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
        slim_list = list(
            map(lambda x: get_slim_station_details(x), station_list[:20]))
        response = jsonify(slim_list)
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

        route = get_slim_connections(mvg_api.get_route(start, stop))
        # route = mvg_api.get_route(start, stop)
        response = jsonify(route)
        response.headers.set('Access-Control-Allow-Origin', cors_origin)
        response.headers.set('Access-Control-Allow-Methods', 'GET')
        return response
    return 'request params missing'


def get_slim_connection_part_list(connection_part_list):
    return {
        "arrDelay": connection_part_list["arrDelay"],
        "connectionPartType": connection_part_list["connectionPartType"],
        "delay": connection_part_list["delay"],
        "destination": connection_part_list["destination"],
        "label": connection_part_list["label"],
        "product": connection_part_list["product"]
    }


def get_slim_station_details(station_detail):
    return {
        "id": station_detail["id"],
        "name": station_detail["name"],
        "place": station_detail["place"],
        "products": station_detail["products"]
    }


def get_slim_connection(route_entry):
    return {
        "arrival": route_entry["arrival"],
        # "connectionPartList": (route_entry["connectionPartList"]),
        "connectionPartList": list(map(lambda x: get_slim_connection_part_list(x), route_entry["connectionPartList"])),
        "departure": route_entry["departure"],
        "from": get_slim_station_details(route_entry["from"]),
        "to": get_slim_station_details(route_entry["to"])
    }


def get_slim_connections(route_response):
    return list(map(lambda x: get_slim_connection(x), route_response))
