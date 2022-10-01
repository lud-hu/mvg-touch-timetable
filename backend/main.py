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
        "arrival": connection_part_list.get("arrival", 0),
        "departure": connection_part_list.get("departure", 0),
        "arrDelay": connection_part_list.get("arrDelay", 0),
        "delay": connection_part_list.get("delay", 0),
        "destination": connection_part_list.get("destination", ""),
        "label": connection_part_list.get("label", ""),
        # Special case: connectionPartType == "FOOTWAY" means walking, so put it as a special product:
        "product": connection_part_list.get("product", connection_part_list.get("connectionPartType") if connection_part_list.get("connectionPartType") == "FOOTWAY" else ""),
        "from": get_slim_station_details(connection_part_list.get("from")),
        "to": get_slim_station_details(connection_part_list.get("to")),
    }


def get_slim_station_details(station_detail):
    return {
        "id": station_detail.get("id", ""),
        "name": station_detail.get("name", ""),
        "place": station_detail.get("place", ""),
        "products": station_detail.get("products", "")
    }


def get_slim_connection(route_entry):
    return {
        "arrival": route_entry.get("arrival", ""),
        "connectionPartList": list(map(lambda x: get_slim_connection_part_list(x), route_entry.get("connectionPartList"))),
        "departure": route_entry.get("departure", ""),
        "from": get_slim_station_details(route_entry.get("from")),
        "to": get_slim_station_details(route_entry.get("to"))
    }


def get_slim_connections(route_response):
    return list(map(lambda x: get_slim_connection(x), route_response))
