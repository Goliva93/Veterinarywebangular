# El Mascotario - Sistema de Gestión Veterinaria

Aplicación web completa para la gestión integral de una clínica veterinaria, con diseño basado en Material Design 3.

## 🎨 Características

### Panel Interno (Staff)
- **Dashboard**: KPIs, próximas citas, estadísticas semanales y análisis por servicio
- **Agenda/Citas**: Gestión completa de citas con filtros, vista lista y calendario
- **Nueva Cita**: Wizard con 5 pasos (Cliente → Mascota → Servicio → Fecha/Hora → Confirmación)
- **Detalle de Cita**: Información completa, registro de pagos, timeline de eventos
- **Clientes**: Listado y búsqueda de clientes
- **Mascotas**: Gestión de mascotas
- **Pagos**: Control de transacciones
- **Inventario**: Control de productos e insumos
- **Servicios**: Configuración de servicios y tarifas
- **Reportes**: Análisis y estadísticas
- **Usuarios**: Administración de usuarios y roles
- **Sedes**: Configuración de ubicaciones y horarios

### Portal Cliente
- **Home**: Vista general con próxima cita y accesos rápidos
- **Mis Mascotas**: Gestión de mascotas personales
- **Mis Citas**: Historial y citas programadas
- **Solicitar Cita**: Formulario para agendar nuevas citas
- **Pagos**: Consulta de pagos y subir evidencias
- **Perfil**: Información personal y configuración

## 🎨 Diseño

### Paleta de Colores
- **Primary (Verde)**: `#7cb342` - Acciones principales, botones confirmados
- **Secondary (Amarillo)**: `#fdd835` - Acentos, estados pendientes
- **Accent (Verde Claro)**: `#aed581` - Elementos complementarios
- **Estados**:
  - Pendiente: `#fdd835` (Amarillo)
  - Confirmada: `#7cb342` (Verde)
  - Cancelada: `#ef5350` (Rojo)
  - Finalizada: `#78909c` (Gris)

### Componentes Material Design 3
- Material Button (filled, outlined, text, elevated)
- Material Card (con variantes elevated y hoverable)
- Material Chip (estados con colores)
- Material TextField (con iconos start/end)
- Material Select
- Material Dialog
- Material Stepper (wizard multi-paso)

## 🚀 Acceso Rápido

### Credenciales de Demo

**Panel Interno (Staff)**
- Email: `admin@elmascotario.com`
- Password: `demo123`
- Ruta: `/staff/dashboard`

**Portal Cliente**
- Email: `cliente@ejemplo.com`
- Password: `demo123`
- Ruta: `/client/home`

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: 1440×900 (sidenav fijo + top toolbar)
- **Tablet**: 834×1112 (sidenav colapsable)
- **Mobile**: 390×844 (drawer + bottom navigation en portal cliente)

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **React Router 7** (Data mode)
- **Tailwind CSS v4**
- **Motion** (Framer Motion) para animaciones
- **Recharts** para gráficos
- **Lucide React** para iconos
- **Sonner** para notificaciones
- **Radix UI** para componentes accesibles

## 📂 Estructura del Proyecto

```
/src/app
├── layouts/
│   ├── auth-layout.tsx      # Layout para login/registro
│   ├── staff-layout.tsx     # Layout panel interno (sidenav)
│   └── client-layout.tsx    # Layout portal cliente (bottom nav)
├── pages/
│   ├── auth/                # Páginas de autenticación
│   ├── staff/               # Páginas del panel interno
│   └── client/              # Páginas del portal cliente
├── components/
│   ├── material-button.tsx
│   ├── material-card.tsx
│   ├── material-chip.tsx
│   ├── material-dialog.tsx
│   ├── material-select.tsx
│   ├── material-stepper.tsx
│   └── material-text-field.tsx
└── routes.tsx               # Configuración de rutas
```

## 🎯 Funcionalidades Principales

### Wizard de Nueva Cita (5 pasos)
1. **Seleccionar Cliente**: Búsqueda y selección con opción de crear nuevo
2. **Elegir Mascota**: Selección de mascota del cliente o registro rápido
3. **Servicio**: Tipo de servicio, profesional y sede
4. **Fecha y Hora**: Calendario y slots disponibles
5. **Confirmación**: Resumen completo antes de crear

### Sistema de Estados (Chips)
- **Pendiente**: Amarillo - Cita creada, esperando confirmación
- **Confirmada**: Verde - Cita confirmada por staff
- **Cancelada**: Rojo - Cita cancelada
- **Finalizada**: Gris - Servicio completado

### Dashboard con KPIs
- Citas del día
- Citas pendientes
- Ingresos del día
- Alertas de stock bajo
- Gráfico de citas semanales (BarChart)
- Distribución por servicio (PieChart)

## 🔄 Próximas Mejoras

Para implementación real con persistencia de datos, se recomienda integrar:
- **Supabase** para autenticación y base de datos
- **Almacenamiento** para fotos de mascotas y evidencias de pago
- **Notificaciones** push para recordatorios de citas
- **Reportes avanzados** con exportación a PDF/Excel
- **WhatsApp API** para confirmaciones automáticas

## 📝 Notas

- Todos los datos son mock/demo para fines de presentación
- El sistema está diseñado para ser responsive-first
- Los componentes siguen las guías de Material Design 3
- La paleta de colores está basada en el logo de El Mascotario
