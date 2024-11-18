from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Account
from .serializers import AccountSerializer
from .schemas import user_list_docs


# Create your views here.
class AccountViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @user_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")

        queryset = Account.objects.get(id=user_id)
        serializer = AccountSerializer(queryset)
        return Response(serializer.data)
