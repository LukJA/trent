from django.apps import AppConfig

class AccountsConfig(AppConfig):
    name = 'accounts'

    def ready(self):
        # load signal as submodule in accounts package
        import accounts.signals