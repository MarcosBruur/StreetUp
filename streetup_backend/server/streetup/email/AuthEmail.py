from django.core.mail import EmailMultiAlternatives
from django.conf import settings  # Importante para acceder al DEFAULT_FROM_EMAIL
from django.utils.html import strip_tags


class AuthEmail:
    @staticmethod
    def send_confirmation_email(data):
        subject = "Activación de cuenta - StreetUp"

        # Usamos el remitente definido en settings.py para evitar errores de autenticación
        from_email = settings.DEFAULT_FROM_EMAIL
        to = [data['email']]

        # HTML (versión completa)
        html_content = f"""
        <html>
            <body>
                <p>Hola <b>{data['userName']}</b>, has creado tu cuenta en <b>StreetUp</b>, casi está todo listo.</p>
                <p>Solo debes confirmar tu cuenta.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="http://localhost:8000/auth/confirm/" 
                   style="background-color:#16a34a;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;display:inline-block;">
                   Confirmar Cuenta
                </a>
                <p>e ingresa el siguiente código: <b>{data['token']}</b></p>
                <p>Este código expira en 30 minutos.</p>
            </body>
        </html>
        """

        # Generamos el texto plano automáticamente quitando las etiquetas HTML
        # Esto es más limpio que escribir el texto dos veces.
        text_content = strip_tags(html_content)

        try:
            msg = EmailMultiAlternatives(subject, text_content, from_email, to)
            msg.attach_alternative(html_content, "text/html")
            # fail_silently=False ayuda a ver errores en desarrollo
            msg.send(fail_silently=False)
            return True
        except Exception as e:
            # Aquí podrías loguear el error si el envío falla
            print(f"Error enviando email: {e}")
            return False
