import telegram

from bot import create_app


class TestBotApp:
    def test_config(self):
        assert not create_app().testing
        assert create_app({'TESTING': True}).testing

    def test_root(self, client):
        response = client.get('/')
        assert response.status_code == 200

    def test_send_message(self, client, monkeypatch):
        class FakeBot(object):
            def send_message(self, chat_id, text):
                return True

        def get_patched(env, request):
            return FakeBot()

        monkeypatch.setattr(telegram, 'Bot', get_patched)
        monkeypatch.setenv('CHAT_ID', '12345')
        response = client.post(
            '/message', json={'name': 'Test',
                              'description': 'Long'}
        )
        assert response.status_code == 200
