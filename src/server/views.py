from django.shortcuts import render
from django.db.models import Count
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from .models import Server
from .serializer import ServerSerializer
from .schema import server_list_docs



# Create your views here.
class ServerListViewSet(viewsets.ViewSet):
    # ViewSet for listing servers based on certain query parameters.
    queryset = Server.objects.all()  # Retrieves all Server objects initially.
    # permission_classes = [IsAuthenticated] # User has to be authenticated in order to access this view

    @server_list_docs
    def list(self, request):
        # Extract query parameters from the URL.
        category = request.query_params.get("category")  # Filter by category (if provided).
        qty = request.query_params.get("qty")  # Limit the number of results (if provided).
        by_user = request.query_params.get("by_user") == "true"  # Flag to filter by user (boolean).
        by_serverid = request.query_params.get("by_serverid")  # Filter by a specific server ID.
        with_num_members = (request.query_params.get("with_num_members") == "true")  # Flag to include member count.

        # If the 'category' query param is provided, filter servers by category name.
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # If the 'by_user' flag is true, filter servers where the current user is a member.
        if by_user:
            if request.user.is_authenticated:
                user_id = request.user.id  # Get the current user's ID.
                self.queryset = self.queryset.filter(member=user_id)  # Filter servers by member.
            else:
                raise AuthenticationFailed()

        # If 'with_num_members' is true, annotate the queryset with the number of members in each server.
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count('member'))  # Add a count of members to each server.

        # If 'by_serverid' is provided, filter by the specific server ID.
        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            
            try:
                self.queryset = self.queryset.filter(id=by_serverid)

                # If the server ID does not exist, raise a validation error.
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with ID {by_serverid} not found"
                    )

            # If the server ID is invalid (e.g., not an integer), raise a validation error.
            except ValueError:
                raise ValidationError(detail=f"Server with ID {by_serverid} not found")
        
        # If 'qty' is provided, limit the number of results to the specified quantity.
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Serialize the queryset, including the 'num_members' field if requested.
        serializer = ServerSerializer(
            self.queryset, many=True, context={'num_members': with_num_members}
        )

        # Return the serialized data as a response.
        return Response(serializer.data)

