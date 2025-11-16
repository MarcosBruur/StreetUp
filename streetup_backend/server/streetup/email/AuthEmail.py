from django.core.mail import EmailMultiAlternatives

class AuthEmail:
    @staticmethod
    def send_confirmation_email(data):
        subject = "Activación de cuenta - StreetUp"
        from_email = "StreetUp <no-reply@streetup.com>"
        to = [data['email']]

        # Texto plano (fallback)
        text_content = f"""
            Hola {data['userName']}, has creado tu cuenta en StreetUp.
            Solo falta confirmar tu cuenta ingresando el siguiente código:
            {data['token']}
            Este token expira en 10 minutos.
            """

        # HTML (versión completa)
        html_content = f"""
        <p>Hola <b>{data['userName']}</b>, has creado tu cuenta en <b>StreetUp</b>, casi está todo listo.</p>
        <p>Solo debes confirmar tu cuenta.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="https://streetup.com/confirmar/" 
           style="background-color:#16a34a;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
           Confirmar Cuenta
        </a>
        <p>e ingresa el siguiente código: <b>{data['token']}</b></p>
        <p>Este codigo expira en 10 minutos.</p>
        """

        msg = EmailMultiAlternatives(subject, text_content, from_email, to)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
