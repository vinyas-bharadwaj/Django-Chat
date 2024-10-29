from rest_framework import serializers
from .models import Server, Channel


class ChannelSerializer(serializers.ModelSerializer):
    # Serializer for the Channel model. It serializes all fields from the Channel model.

    class Meta:
        model = Channel
        fields = "__all__"  # Serializes all fields from the Channel model.


class ServerSerializer(serializers.ModelSerializer):
    # Serializer for the Server model.
    # `channel_server` is the related name for the Channel model, which has a ForeignKey pointing to the Server model.
    
    num_members = serializers.SerializerMethodField()  # Custom field to calculate the number of members.
    channel_server = ChannelSerializer(many=True)  # Nested serializer to include related channels within the server.
    category = serializers.StringRelatedField() # Returns the name of the category instead of the ID

    class Meta:
        model = Server
        exclude = ("member",)  # Excludes the "member" field from the serialization.

    def get_num_members(self, obj):
        # Method to get the number of members in the server.
        # Checks if the object has a `num_members` attribute and returns it; otherwise, returns None.
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None
    
    # Overrides the default `to_representation` method to modify the serialized data.
    # This method removes the "num_members" field from the serialized output if it wasn't specified in the filter context.
    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Retrieve the `num_members` flag from the context, which indicates if the field should be included.
        # If `num_members` is not passed (evaluates to False), the field is removed from the output.
        num_members = self.context.get("num_members")
        if not num_members:
            data.pop("num_members", None)  # Remove the "num_members" field if not requested.
            
        return data
