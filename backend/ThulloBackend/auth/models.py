from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from auth import USERNAME_MAX_LENGTH, EMAIL_MAX_LENGTH

class UserManager(BaseUserManager):
  """
  Creates and saves a User with the given email, password and email
  """
  def create_user(self, email, username, password=None):

    if not email:
      raise ValueError('User must have an email address')

    user = self.model(email=self.normalize_email(email), username=username)

    # Password will be hashed
    user.set_password(password)
    user.save(using=self._db)

    return user

class User(AbstractBaseUser):
  """
  Custom User model

  Password field is built-in
  """

  email = models.EmailField(max_length=EMAIL_MAX_LENGTH, unique=True, verbose_name='email address')

  username = models.CharField(max_length=USERNAME_MAX_LENGTH, blank=False, null=False, verbose_name='username')

  # Unique identifier of the user model
  USERNAME_FIELD = 'email'

  # Name of email field on user model
  EMAIL_FIELD = 'email'

  # Only matters when creating a user via the createsuperuser management command
  REQUIRED_FIELDS = []

  objects = UserManager()

  def __str__(self):
    return self.email