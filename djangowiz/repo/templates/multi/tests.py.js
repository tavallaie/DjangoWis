from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from {{ app_name }}.models import {{ model_name }}

class {{ model_name }}APITests(TestCase):
    fixtures = {{ fixtures | tojson | default('[]', true) }}
    
    def setUp(self):
        # Create some initial data for testing
        self.instances = {{ model_name }}.objects.all()
        self.first_instance = self.instances.first()

    def test_list_{{ model_name | lower }}s(self):
        url = reverse('{{ model_name | lower }}_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.instances))

    def test_create_{{ model_name | lower }}(self):
        url = reverse('{{ model_name | lower }}_list')
        data = {field.name: getattr(self.first_instance, field.name) for field in {{ model_name }}._meta.fields if field.name != "id"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual({{ model_name }}.objects.count(), len(self.instances) + 1)

    def test_retrieve_{{ model_name | lower }}(self):
        url = reverse('{{ model_name | lower }}_detail', args=[self.first_instance.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.first_instance.id)

    def test_update_{{ model_name | lower }}(self):
        url = reverse('{{ model_name | lower }}_detail', args=[self.first_instance.pk])
        data = {field.name: getattr(self.first_instance, field.name) for field in {{ model_name }}._meta.fields if field.name != "id"}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_{{ model_name | lower }}(self):
        url = reverse('{{ model_name | lower }}_detail', args=[self.first_instance.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual({{ model_name }}.objects.count(), len(self.instances) - 1)

    def test_invalid_create(self):
        url = reverse('{{ model_name | lower }}_list')
        data = {}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)