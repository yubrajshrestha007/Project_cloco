from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(generics.CreateAPIView):
    Serializer_class=LoginSerializer
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            User_Serializer=UserSerializer(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user":User_Serializer.data
            })
        else:
            return Response({
                "error": "Invalid username or password",
            }, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user



class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=200)
        except Exception:
            return Response({"error": "Invalid token"}, status=400)
