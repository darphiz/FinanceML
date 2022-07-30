
import datetime
import os
import sys
from urllib import response

import jwt
from dotenv import load_dotenv
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer

load_dotenv()

import json

import plaid
from plaid.api import plaid_api
from plaid.model.country_code import CountryCode
from plaid.model.item_public_token_exchange_request import \
    ItemPublicTokenExchangeRequest
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import \
    LinkTokenCreateRequestUser
from plaid.model.products import Products

configuration = plaid.Configuration(
  host=plaid.Environment.Sandbox,
  api_key={
    'clientId': os.getenv("PLAID_CLIENT_ID"),
    'secret': os.getenv("PLAID_SECRET"),
  }
)

access_token = None
item_id = None

api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)



@api_view(['POST'])
def create_link_token(request):
    try:
        token = request.headers["Authorization"].split(" ")[1]
    except:
        token = None
    
    print(request.headers["Authorization"])

    if token is None:
        raise AuthenticationFailed('Please log in')
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError as e:
        raise AuthenticationFailed('Token expired') from e
    except Exception as e:
        raise AuthenticationFailed('Invalid token') from e
    user = User.objects.get(id=payload['id'])
    data = UserSerializer(user).data

    client_user_id = str(data["id"])

    res= LinkTokenCreateRequest(
        products=[Products("transactions")],
        client_name="Comepair",
        country_codes=[CountryCode('US')],
        # redirect_uri='https://0af2-105-112-37-70.eu.ngrok.io/',     #https://0af2-105-112-37-70.eu.ngrok.io
        language='en',
        webhook='https://webhook.example.com',
        user=LinkTokenCreateRequestUser(
            client_user_id=client_user_id
        )
    )

    response = client.link_token_create(res)

    response = response.to_dict()

    return Response(response, status=status.HTTP_200_OK)


@api_view(['POST'])
def exchange_public_token(request):
    try:
        token = request.headers["Authorization"].split(" ")[1]
    except:
        token = None
    
    if token is None:
        raise AuthenticationFailed('Please log in')
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError as e:
        raise AuthenticationFailed('Token expired') from e
    except Exception as e:
        raise AuthenticationFailed('Invalid token') from e
    user = User.objects.get(id=payload['id'])
    data = UserSerializer(user).data

    global access_token
    public_token = request.data['public_token']
    res = ItemPublicTokenExchangeRequest(
      public_token=public_token
    )
    response = client.item_public_token_exchange(res)
    access_token = response['access_token']
    item_id = response['item_id']

    print(f"2nd res {response}")
    return Response(response.to_dict(), status=status.HTTP_200_OK)



@api_view(['POST'])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    data ={
        "message": "User created successfully",
        "data" : serializer.data
    }
    return Response(data, status=status.HTTP_201_CREATED)
    
    
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = User.objects.filter(email=email).first()
    if user is None:
        raise AuthenticationFailed('Invalid credentials')
    if not user.check_password(password):
        raise AuthenticationFailed('Invalid Password')

    exp = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60)
    payload = {
        'id': user.id, 
        'exp': exp, 
        'iat': datetime.datetime.utcnow()
        }
     
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    data = {'token': token, 'email': user.email, 'exp': exp.timestamp()}
    response = Response()
    response.data = data
    response.set_cookie(key='jwt', value=token, httponly=True)
    return response

@api_view(['GET'])
def userView(request):
    try:
        token = request.headers["Authorization"].split(" ")[1]
    except:
        token = None
    
    if token is None:
        raise AuthenticationFailed('Please log in')
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError as e:
        raise AuthenticationFailed('Token expired') from e
    except Exception as e:
        raise AuthenticationFailed('Invalid token') from e
    user = User.objects.get(id=payload['id'])
    data = UserSerializer(user).data
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout_view(request):
    response = Response()
    response.delete_cookie(key='jwt')
    response.data = {'message': 'Logged out successfully'}
    return response
