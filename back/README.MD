# Proyecto Backend con Node Express

Este proyecto es una aplicación de gestión de leads que proporciona endpoints para la creación y administración de servicios de desarrollo de MVPs y Coaching de voz. Está desarrollado utilizando Node y Express framework.

## Requisitos

- Python 3.10 o superior
- Django 3.0 o superior
- Django REST framework
- PostgreSQL

## Instalación

1. Clonar el repositorio:
   
   git clone https://github.com/No-Country-simulation/h4-02-vocaltech.git
   cd tu-repo

2. Crear y activar un entorno virtual:

    python3 -m venv .venv
    source .venv/bin/activate

3. Instalar las dependencias:

    pip install -r requirements.txt
    
4. Configurar la base de datos en settings.py:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'nombre_base_datos',
            'USER': 'usuario',
            'PASSWORD': 'contraseña',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }

5. Aplicar las migraciones:

    python manage.py makemigrations
    python manage.py migrate

6. Crear un superusuario para acceder al admin de Django:

    python manage.py createsuperuser

7. Ejecutar el servidor de desarrollo:

    python manage.py runserver


## Documentación actualizada del proyecto

https://h4-02-vocaltech.onrender.com/api/






# Documentación: Diseño e Implementación de Microservicios

## Introducción

Esta documentación describe el diseño, la implementación y el despliegue de un conjunto de microservicios independientes para gestionar flujos de WhatsApp, leads, y correos electrónicos automatizados.

- **Endpoints:**
  - `POST /message`: Procesar mensajes entrantes.
  - `GET /status/{id}`: Obtener el estado de un flujo.
  - `POST /start`: Iniciar un flujo para un número de teléfono.
- **Integraciones:**
  - WhatsApp Business API (Twilio o Meta).
- **Estructura del Proyecto:**
  ```bash
  src/
  ├── controllers/
  ├── services/
  ├── routes/
  ├── models/
  └── utils/
  ```
- **Tecnologías:**
  - Node.js, Express, Redis (para almacenamiento temporal).

### 2. Gestión de Leads

- **Responsabilidad:**
  - CRUD para leads.
  - Asignación de leads a bases de datos específicas en Airtable.
- **Endpoints:**
  - `POST /leads`: Crear un lead.
  - `GET /leads/{id}`: Obtener detalles de un lead.
  - `PUT /leads/{id}`: Actualizar datos de un lead.
  - `DELETE /leads/{id}`: Eliminar un lead.
- **Integraciones:**
  - Airtable SDK para sincronización de datos.
  - Webhooks para notificaciones.
- **Optimización:**
  - Uso de Redis para búsquedas frecuentes.

### 3. Generación y Envío de Correos Electrónicos

- **Responsabilidad:**
  - Gestión de plantillas y envío de correos.
- **Endpoints:**
  - `POST /email`: Enviar un correo.
  - `GET /templates`: Listar plantillas disponibles.
- **Integraciones:**
  - SendGrid o AWS SES para el envío de correos.
- **Flujo de Trabajo:**
  - Validación del correo.
  - Selección de plantillas.
  - Reintentos en caso de fallos.

---
## Infraestructura

#### Docker Compose (Entorno Local)

