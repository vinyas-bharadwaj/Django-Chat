from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField() # Returns sender name rather than the ID

    class Meta:
        model = Message
        fields = "__all__"