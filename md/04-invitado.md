# 04-invitado.md

# Especificación de Rol: Invitado (Tráfico Masivo Gratuito)
> El volumen masivo de usuarios. La experiencia debe ser instantánea, emocional y sin fricciones.

## 🔐 Reglas de Logueo y Autenticación
* **Fricción Cero:** Sin registro, contraseñas ni instalación de apps.
* **Acceso:** URL única e irrepetible compartida por WhatsApp (`/e/[slug]/[token]`) que identifica cuántos pases tiene.

## 🎨 Diseño y UI (Capa Pública)
* **Estilo Visual:** Refleja al 100% el diseño de la plantilla elegida. Sin branding corporativo del SaaS (o solo un footer mínimo en VIP).
* **Calidad:** Carga ultra-rápida (Next.js Server Components), música de fondo, animaciones fluidas y cuenta regresiva activa.

## 📦 Módulos del Sistema y Funcionalidades (Fase 1 - Core)

### 1. Invitación Web y RSVP Inteligente
* **Contenido:** Nombre prominente, countdown y formulario a un solo clic para confirmar asistencia, alergias y requerimientos dietéticos.

### 2. Bóveda de Pase Personal y QR (VIP)
* **Contenido:** Tras confirmar, generación automática de QR infalsificable para Apple/Google Wallet o descarga.

### 3. Libro de Firmas Multimedia
* **Acción:** Acceso nativo desde el navegador web para capturar fotos, audios cortos o texto para los festejados.

## 🚀 Módulos Plus / Innovaciones (Fase 2)

### 4. Cámara en Vivo (Live Wall Client)
* **Acción:** El día del evento, la interfaz web activa un botón prominente para capturar fotos en caliente que se transmiten directo a las pantallas del salón.

### 5. Buscador Automatizado de Asiento
* **Acción:** Al ingresar al link o escanear el QR en la fiesta, el sistema le muestra un mensaje instantáneo: *"Bienvenido Carlos, tu asiento reservado está en la Mesa 12"*.

### 6. Pasarela de Pago Express (Checkout E-commerce)
* **Acción:** Botón nativo para hacer un regalo monetario con tarjeta o pagar el "Cover", recibiendo el QR tras la validación del pago.

### 7. Módulo de Recuperación de Fotos (Reconocimiento Facial)
* **Acción:** Días después de la fiesta, el invitado sube una *selfie* al link y el sistema filtra todo el carrete profesional para entregarle en segundos solo las fotos donde él aparece.