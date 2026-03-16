Crea y/o COMPLETA el diseño de una aplicación web responsive basada en Angular Material (Material Design 3) para una veterinaria llamada “El Mascotario”, con dos experiencias en el MISMO proyecto: Panel Interno (Staff) y Portal Cliente.
IMPORTANTE: Si ya existe un archivo/proyecto previo, NO empieces desde cero: reutiliza el sistema de componentes y estilos existentes, y agrega todas las pantallas faltantes para que la web quede completa y consistente.

1) Design System (Angular Material / M3)

Estilo: minimalista, profesional, moderno, veterinaria.

Componentes tipo Angular Material: toolbar, sidenav, cards, tables, dialogs, steppers, tabs, chips, snackbars, datepicker, form fields outlined, icons material.

Tipografía: Roboto.

Espaciado 8pt, radios 12–16, sombras suaves.

Colores: Primary verde, Accent amarillo, neutros blanco/grises, texto gris oscuro.

Estados: hover/focus/disabled claros.

2) Responsive y breakpoints (OBLIGATORIO)

Crea frames y variantes para:

Desktop 1440×900

Tablet 834×1112

Mobile 390×844

Comportamiento:

Staff: Desktop/Tablet con sidenav fijo colapsable + topbar; Mobile con sidenav tipo drawer.

Cliente: Mobile-first con bottom navigation; en desktop se adapta a layout de cards/tabla.

Usa Auto Layout y constraints correctos. Todo debe ser reutilizable y consistente.

3) Sedes y alcance (multisede)

La solución es MULTISEDE. Crea soporte visual y funcional para 2 sedes por defecto:

Sede Chorrillos

Sede Surco / Barranco
Pero deja el módulo de sedes configurable (agregar/editar sedes, horarios, feriados, bloqueos).

Las citas siempre deben estar asociadas a una sede.

4) Roles y permisos (Staff + Cliente)

Roles:

Admin

Recepción

Veterinario

Groomer

Cliente

UI con control por rol:

Admin: todo.

Recepción: agenda/citas, clientes/mascotas, pagos, reportes básicos.

Veterinario: historia clínica, citas médicas, ver pagos/resumen.

Groomer: agenda grooming, finalizar atención grooming, ver pagos/resumen.

Cliente: portal cliente.

5) Reglas clave (muy importante)

El cliente NO puede ver el historial clínico completo.

El cliente SOLO ve: resumen de atención, pago realizado, medicamentos/añadidos, indicaciones, próxima cita sugerida (si existe).

El historial clínico completo solo es visible en Staff (vet/admin).

Pago con Yape + evidencia NO bloqueante:

Registrar monto + método (Yape) + campo para subir evidencia (imagen).

Si no hay evidencia, permitir guardar igual (estado “Pendiente evidencia”).

Mascotas desactivables (soft delete):

En Staff: opción “Desactivar mascota” (no eliminar), mostrar chip “Inactiva”.

En Portal Cliente: mascotas inactivas NO deben aparecer, pero sus citas pasadas siguen en historial del staff.

Duración referencial de servicios:

Consulta: 60 min

Grooming: 120 min
(editable por admin en “Servicios y Tarifas”)

6) Estructura de navegación (Staff)

Sidenav con íconos:

Dashboard

Agenda / Citas (Calendario + Lista)

Clientes

Mascotas

Historia Clínica

Pagos (Yape)

Servicios y Tarifas

Usuarios y Roles (Admin)

Sedes y Horarios

Reportes

Configuración

(Inventario: Fase 2 → dejar solo un placeholder “Próximamente”)

7) Pantallas OBLIGATORIAS (crear todas y conectar flujos)
7.1 Autenticación (común)

Selector de acceso: “Panel Interno” / “Portal Cliente”

Login (email/telefono + contraseña), recordar, olvidé contraseña

Recuperar / reset contraseña

(Opcional) onboarding cliente: crear cuenta + verificación simple

STAFF (Panel Interno)
A) Dashboard

KPIs: citas hoy, pendientes, confirmadas, ingresos referenciales, alertas (pendientes evidencia), próximas vacunas.

Lista “Próximas citas” + acciones rápidas: Nueva cita, Registrar pago, Crear cliente.

B) Agenda / Citas

Vista Calendario (mes/semana/día) con leyenda por estado.

Vista Lista con filtros: sede, fecha, estado, servicio, profesional.

Acciones: nueva cita, reprogramar, cancelar, confirmar, finalizar.

C) Crear/Editar Cita (Wizard con Stepper)

Paso 1: Sede
Paso 2: Cliente (buscar + crear rápido en modal)
Paso 3: Mascota (seleccionar + crear rápido)
Paso 4: Servicio (consulta/grooming/control) + profesional + duración
Paso 5: Fecha/Hora (slots) + notas
Paso 6: Confirmación

D) Detalle de Cita

Datos completos + estado (chips): Pendiente, Confirmada, Cancelada, Finalizada.

Timeline de cambios.

Sección “Atención”:

Para Vet/Groomer: formulario para cerrar atención (resumen + medicamentos/añadidos + indicaciones).

Sección “Pago”:

Registrar pago: monto, método Yape, evidencia (imagen opcional), estado pagado/pendiente evidencia.

Acciones: Confirmar / Reprogramar / Cancelar / Finalizar.

E) Clientes

Tabla con búsqueda, filtros, paginación.

Crear/editar cliente.

Detalle cliente: datos + mascotas + citas + pagos.

F) Mascotas

Lista por cliente y global.

Crear/editar mascota (foto, especie, raza, edad, peso, alergias).

Opción “Desactivar / Reactivar” (soft delete).

Detalle mascota (Staff): pestañas:

Resumen

Citas

Historia Clínica (solo staff autorizado)

Vacunas (registro + próximas)

Archivos

G) Historia Clínica (solo Staff autorizado)

Timeline completo de atenciones.

Crear registro clínico (motivo, anamnesis, examen, dx, tratamiento, indicaciones, adjuntos).

Vacunas y recordatorios internos.

H) Pagos (Yape)

Listado de pagos con filtros: fecha, sede, estado, cliente.

Detalle: evidencia, monto, referencia, vinculación a cita.

Estados: Pagado, Pendiente evidencia, Observado.

I) Servicios y Tarifas (Admin)

CRUD servicios con duración y precio.

Config por sede (si aplica).

J) Usuarios y Roles (Admin)

CRUD usuarios, asignación de rol.

Permisos básicos representados visualmente.

K) Sedes y Horarios (Admin)

CRUD sedes (Chorrillos, Surco/Barranco por defecto).

Horarios por sede, feriados, bloqueos de agenda.

L) Reportes

Citas por estado/servicio/sede.

Ingresos referenciales por sede.

Export UI (botón).

M) Configuración

Datos de clínica, logo, colores.

Plantillas de mensajes (solo UI).

Inventario (FASE 2)

Pantalla placeholder con “Próximamente”, no construir flujo real.

CLIENTE (Portal Cliente)
1) Home

Próxima cita (card) + accesos: Solicitar cita, Mis mascotas, Mis citas, Pagos, Perfil.

2) Mis Mascotas

Cards + agregar mascota.

Mascotas inactivas NO aparecen.

3) Solicitar Cita (Wizard)

Mascota → Servicio → Sede → Fecha/Hora → Confirmación
Mensaje: “Tu solicitud quedará Pendiente hasta confirmación”.

4) Mis Citas

Lista con filtros (por estado).

Detalle cita: sede, fecha, estado, y SOLO:

Resumen de atención

Medicamentos/añadidos

Pago/estado

Indicaciones
(No historial clínico completo)

5) Pagos

Ver pagos y estados.

Subir evidencia Yape (opcional/no bloqueante) asociada a cita.

6) Perfil

Datos, cambiar contraseña, cerrar sesión.

Centro de notificaciones (básico: confirmación/reprogramación).

8) Estados, componentes y prototipo (entregable dentro de Figma)

Chips por estado: Pendiente (amarillo), Confirmada (verde), Cancelada (rojo), Finalizada (gris).

Dialogs: cancelar, reprogramar, registrar pago, crear cliente rápido, crear mascota rápida, desactivar mascota.

Empty states y skeleton loaders.

Snackbars de éxito/error.

Entregables en páginas:

“00-Design System”

“01-Components”

“02-STAFF”

“03-CLIENT”

“04-Prototypes”

Conecta prototipo mínimo:
Login → Dashboard → Agenda → Nueva cita → Detalle cita → Registrar pago
Cliente: Home → Solicitar cita → Mis citas → Detalle → Subir evidencia

Usa datos realistas en español (Perú) y coherencia total de estilos.