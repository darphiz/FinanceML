
from urllib import response
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime


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
    payload = {
        'id': user.id, 
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60), 
        'iat': datetime.datetime.utcnow()
        }
     
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    data = {'token': token, 'email': user.email}
    response = Response()
    response.data = data
    response.set_cookie(key='jwt', value=token, httponly=True)
    return response

@api_view(['GET'])
def userView(request):
    token = request.COOKIES.get('jwt')
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