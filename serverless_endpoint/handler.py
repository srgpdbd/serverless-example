import json
import datetime


def endpoint(event, context):
    return_this = get_param_from_context(event=event, param="return_this")
    current_time = datetime.datetime.now().time()
    body = {
        "message": f"url parameter is {return_this}"
    }
    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }
    print("Hello")
    return response

def get_param_from_context(event, param):
    """
    GET query param from event
    :param event: event
    :param param: param
    """
    print(event)
    return event["path"][param]
