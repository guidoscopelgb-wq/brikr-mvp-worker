from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT = OUTPUT_DIR / "manual-de-uso-gb-construction-assistant.pdf"
ARTIFACTS = ROOT / "artifacts"

PAGE_WIDTH, PAGE_HEIGHT = A4
CONTENT_WIDTH = PAGE_WIDTH - 34 * mm

INK = colors.HexColor("#16201F")
MUTED = colors.HexColor("#5D6A67")
GREEN = colors.HexColor("#0F6B57")
GREEN_DARK = colors.HexColor("#0A4539")
GREEN_SOFT = colors.HexColor("#E9F7EF")
YELLOW = colors.HexColor("#F0B23E")
BLUE_SOFT = colors.HexColor("#E8F0F6")
RED_SOFT = colors.HexColor("#FFF0ED")
LINE = colors.HexColor("#D9E1DF")
PAPER = colors.HexColor("#F6F7F3")
WHITE = colors.white


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(17 * mm, 13 * mm, PAGE_WIDTH - 17 * mm, 13 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(17 * mm, 8 * mm, "GB Construction Assistant - Manual de uso")
    canvas.drawRightString(PAGE_WIDTH - 17 * mm, 8 * mm, f"Pagina {doc.page}")
    canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="CoverBrand",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=29,
        leading=33,
        textColor=WHITE,
        alignment=TA_LEFT,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverSubtitle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=14,
        leading=21,
        textColor=colors.HexColor("#D6E7DF"),
    )
)
styles.add(
    ParagraphStyle(
        name="SectionTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=27,
        textColor=GREEN_DARK,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="SubTitle",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=18,
        textColor=INK,
        spaceBefore=8,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyManual",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.2,
        leading=15,
        textColor=INK,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="SmallManual",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=12,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="StepNumber",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=GREEN_DARK,
        alignment=TA_CENTER,
    )
)
styles.add(
    ParagraphStyle(
        name="Callout",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.4,
        leading=14,
        textColor=INK,
    )
)


def p(text, style="BodyManual"):
    return Paragraph(text, styles[style])


def heading(number, title):
    return Paragraph(f"{number}. {title}", styles["SectionTitle"])


def bullet(text):
    return Paragraph(f"&#8226; {text}", styles["BodyManual"])


def numbered_steps(items):
    rows = []
    for index, text in enumerate(items, start=1):
        rows.append(
            [
                Paragraph(str(index), styles["StepNumber"]),
                Paragraph(text, styles["BodyManual"]),
            ]
        )
    table = Table(rows, colWidths=[11 * mm, CONTENT_WIDTH - 11 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (0, -1), GREEN_SOFT),
                ("BOX", (0, 0), (0, -1), 0.5, GREEN),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (1, 0), (1, -1), 10),
                ("RIGHTPADDING", (1, 0), (1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def callout(title, text, background=GREEN_SOFT, border=GREEN, width=CONTENT_WIDTH):
    content = Paragraph(f"<b>{title}</b><br/>{text}", styles["Callout"])
    table = Table([[content]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("BOX", (0, 0), (-1, -1), 0.8, border),
                ("LEFTPADDING", (0, 0), (-1, -1), 11),
                ("RIGHTPADDING", (0, 0), (-1, -1), 11),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return table


def screenshot(filename, max_height=115 * mm):
    path = ARTIFACTS / filename
    if not path.exists():
        return callout("Captura no disponible", f"No se encontro {filename}.", RED_SOFT, colors.HexColor("#A43D35"))
    image = Image(str(path))
    scale = min(CONTENT_WIDTH / image.imageWidth, max_height / image.imageHeight)
    image.drawWidth = image.imageWidth * scale
    image.drawHeight = image.imageHeight * scale
    image.hAlign = "CENTER"
    frame = Table([[image]], colWidths=[image.drawWidth + 6])
    frame.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 3),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return frame


def two_column(left, right, widths=(0.52, 0.48)):
    table = Table(
        [[left, right]],
        colWidths=[CONTENT_WIDTH * widths[0], CONTENT_WIDTH * widths[1]],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, -1), 8),
                ("RIGHTPADDING", (1, 0), (1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


story = []

# Cover
cover_block = Table(
    [
        [Paragraph("GB", ParagraphStyle("Logo", fontName="Helvetica-Bold", fontSize=20, textColor=WHITE, alignment=TA_CENTER))],
        [Paragraph("GB Construction<br/>Assistant", styles["CoverBrand"])],
        [Paragraph("Manual de instrucciones de uso", styles["CoverSubtitle"])],
        [Spacer(1, 18 * mm)],
        [
            Paragraph(
                "Gestion integral de obras, presupuestos, certificaciones, gastos, finanzas del estudio y equipo.",
                styles["CoverSubtitle"],
            )
        ],
    ],
    colWidths=[CONTENT_WIDTH],
    rowHeights=[18 * mm, None, None, 24 * mm, None],
)
cover_block.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), GREEN_DARK),
            ("BACKGROUND", (0, 0), (0, 0), GREEN),
            ("BOX", (0, 0), (0, 0), 0, GREEN),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 1), (-1, -1), 18 * mm),
            ("RIGHTPADDING", (0, 1), (-1, -1), 18 * mm),
            ("TOPPADDING", (0, 1), (-1, -1), 8 * mm),
            ("BOTTOMPADDING", (0, 1), (-1, -1), 8 * mm),
        ]
    )
)
story.extend(
    [
        Spacer(1, 22 * mm),
        cover_block,
        Spacer(1, 14 * mm),
        callout(
            "Acceso al sistema",
            '<link href="https://gb-construction-assistant.guidoscopel-gb.workers.dev" color="#0F6B57">'
            "gb-construction-assistant.guidoscopel-gb.workers.dev</link><br/>"
            "<b>Usuario:</b> test@test &nbsp;&nbsp; <b>Contrasena:</b> GB2026",
            BLUE_SOFT,
            colors.HexColor("#315F83"),
        ),
        Spacer(1, 10 * mm),
        p("Version del manual: junio de 2026", "SmallManual"),
        PageBreak(),
    ]
)

# 1. Access and navigation
story.extend(
    [
        heading(1, "Ingreso y navegacion"),
        p("Abra la direccion del sistema desde un navegador actualizado. Presione <b>Iniciar sesion</b> o <b>Comenzar gratis</b> para mostrar el formulario de acceso."),
        numbered_steps(
            [
                "Ingrese <b>test@test</b> en el campo Email.",
                "Ingrese <b>GB2026</b> en el campo Contrasena.",
                "Presione <b>Entrar al dashboard</b>.",
                "Use el menu lateral para cambiar entre los modulos disponibles para su rol.",
            ]
        ),
        Spacer(1, 5 * mm),
        callout(
            "Persistencia de datos",
            "La version MVP guarda la informacion en el almacenamiento local del navegador. Use siempre el mismo navegador y perfil. "
            "Borrar los datos del sitio, usar modo privado o cambiar de dispositivo puede dejar la informacion cargada fuera de alcance.",
            RED_SOFT,
            colors.HexColor("#A43D35"),
        ),
        Spacer(1, 7 * mm),
        p("<b>Lectura rapida del dashboard</b>", "SubTitle"),
        bullet("Las tarjetas superiores resumen el modulo activo."),
        bullet("Los filtros permiten reducir listas por estado, categoria, fecha o texto."),
        bullet("Los botones Seguimiento o Editar abren vistas de detalle."),
        bullet("Cerrar sesion vuelve a la pagina inicial sin eliminar los datos."),
        PageBreak(),
    ]
)

# 2. Budgets
story.extend(
    [
        heading(2, "Presupuestos"),
        p("Este modulo permite armar una planilla de costos y plazos antes de iniciar una obra. Cada certificacion puede contener tantos items o subitems como sean necesarios."),
        p("Crear un presupuesto", "SubTitle"),
        numbered_steps(
            [
                "Abra <b>Presupuestos</b> y complete Nombre, Cliente y Estado.",
                "Presione <b>Crear presupuesto</b>.",
                "En la fila creada, presione <b>Editar planilla</b>.",
                "Use <b>Agregar subitem</b> para incorporar cada material, trabajo o concepto por separado.",
                "Complete Certificado, Tipo, Item o subitem, Cantidad, Unidad, Precio unitario y Dias.",
                "Repita el numero de certificado para todos los subitems que formen parte de la misma certificacion.",
                "Los cambios de la planilla se guardan automaticamente al salir de cada campo.",
            ]
        ),
        Spacer(1, 5 * mm),
        screenshot("gb-budget-subitems.png", 60 * mm),
        Spacer(1, 3 * mm),
        two_column(
            [
                p("Acciones disponibles", "SubTitle"),
                bullet("<b>Duplicar:</b> crea una copia reutilizable."),
                bullet("<b>Imprimir:</b> abre la impresion del presupuesto."),
                bullet("<b>Cambiar estado:</b> Pendiente, Aprobado o Rechazado."),
                bullet("<b>Eliminar:</b> quita el presupuesto."),
            ],
            [
                callout(
                    "Ejemplo de subdivision",
                    "La Certificacion 1 puede tener tres subitems de tipo Material: Cemento, Arena y Cal. "
                    "Cada uno conserva su propia cantidad, unidad y precio; el total de la certificacion es la suma de sus subitems.",
                    GREEN_SOFT,
                    GREEN,
                    CONTENT_WIDTH * 0.48,
                )
            ],
        ),
        Spacer(1, 8 * mm),
        callout(
            "Antes de crear la obra",
            "Revise el total y el plazo del presupuesto. Si luego crea una obra desde este presupuesto, el monto cotizado y el cliente se completan automaticamente.",
            BLUE_SOFT,
            colors.HexColor("#315F83"),
        ),
        PageBreak(),
    ]
)

# 3. Projects
story.extend(
    [
        heading(3, "Obras"),
        p("La cartera muestra el estado de cada proyecto, el porcentaje certificado y el gasto acumulado. Los propietarios tambien visualizan los importes presupuestados y el control economico completo."),
        p("Crear una obra", "SubTitle"),
        numbered_steps(
            [
                "Abra <b>Obras</b>.",
                "En Nueva obra, elija <b>Crear desde cero</b> o <b>Crear desde presupuesto</b>.",
                "Si usa un presupuesto, seleccione uno disponible. El sistema toma su cliente y monto total.",
                "Complete Nombre, Cliente, Estado y Monto total cotizado.",
                "Si corresponde, deje activa la importacion de las certificaciones y sus subitems presupuestados.",
                "Presione <b>Crear obra</b>.",
            ]
        ),
        Spacer(1, 5 * mm),
        screenshot("gb-project-list.png", 103 * mm),
        Spacer(1, 4 * mm),
        p("<b>Interpretacion de la fila:</b> el porcentaje se calcula exclusivamente con los certificados cargados. No existe un campo separado de avance fisico.", "SmallManual"),
        PageBreak(),
    ]
)

# 4. Certificates and project expenses
story.extend(
    [
        heading(4, "Seguimiento de una obra"),
        p("Desde la fila de una obra, presione <b>Seguimiento</b>. El detalle concentra indicadores, certificaciones, gastos y analisis por categoria."),
        screenshot("gb-project-control.png", 91 * mm),
        Spacer(1, 5 * mm),
        two_column(
            [
                p("Cargar una certificacion", "SubTitle"),
                bullet("Indique el Periodo."),
                bullet("Como Propietario, vincule una certificacion presupuestada si existe."),
                bullet("Elija carga manual o importacion desde presupuesto."),
                bullet("Agregue todos los subitems necesarios."),
                bullet("Complete Tipo, Item, Cantidad, Unidad y Precio unitario."),
                bullet("El total se calcula sumando cantidad por precio de cada subitem."),
                bullet("El Propietario define el estado; el Supervisor siempre la envia Pendiente de aprobacion."),
            ],
            [
                p("Cargar un gasto", "SubTitle"),
                bullet("Indique Fecha, Categoria y Subcategoria."),
                bullet("Complete Descripcion, Monto y Estado."),
                bullet("Registre el Medio de pago y observaciones."),
                bullet("Marque Corresponde al presupuesto cuando aplique."),
                bullet("Vincule el item presupuestado."),
                bullet("Presione Agregar gasto."),
            ],
        ),
        Spacer(1, 5 * mm),
        callout(
            "Estados sensibles",
            "El Propietario revisa las certificaciones pendientes y puede aprobarlas o marcarlas como cobradas. "
            "Los gastos pueden registrarse como Pendiente o Pagado.",
            RED_SOFT,
            colors.HexColor("#A43D35"),
        ),
        PageBreak(),
    ]
)

# 5. Project analysis and categories
story.extend(
    [
        heading(5, "Control economico por obra"),
        p("El detalle de obra permite comparar el monto certificado y el gasto contra el monto cotizado. No existe un avance fisico separado: el indicador operativo del sistema es el certificado."),
        p("Indicadores principales", "SubTitle"),
        bullet("<b>Porcentaje certificado:</b> monto certificado dividido por monto cotizado."),
        bullet("<b>Monto certificado:</b> suma de los subitems de todos los certificados registrados."),
        bullet("<b>Monto cobrado:</b> certificados cuyo estado es Cobrada."),
        bullet("<b>Monto gastado:</b> suma de todos los gastos de la obra."),
        bullet("<b>Pendiente de pago:</b> gastos todavia no marcados como Pagado."),
        bullet("<b>Desvio total:</b> diferencia entre gasto acumulado y monto cotizado."),
        Spacer(1, 5 * mm),
        p("Categorias y subcategorias", "SubTitle"),
        p("Cada gasto se clasifica por Categoria y Subcategoria. No hay un segundo campo de tipo de gasto. La categoria principal ya define si se trata de Materiales, Mano de obra, Servicios y alquileres o Administracion de obra."),
        numbered_steps(
            [
                "En el detalle de una obra, vaya a Categorias de gastos de obra.",
                "Escriba una Categoria existente o nueva.",
                "Escriba la Nueva subcategoria.",
                "Presione Agregar al catalogo. La opcion aparecera en futuras cargas.",
            ]
        ),
        Spacer(1, 5 * mm),
        callout(
            "Recomendacion",
            "Antes de crear categorias nuevas, revise el catalogo actual. Mantener nombres consistentes mejora el analisis de desvio por categoria.",
            GREEN_SOFT,
            GREEN,
        ),
        PageBreak(),
    ]
)

# 6. Studio finances
story.extend(
    [
        heading(6, "Finanzas del estudio"),
        p("El modulo <b>Estudio</b> registra movimientos administrativos separados de las obras. No use este modulo para compras, contratistas u otros costos atribuibles a un proyecto."),
        p("Registrar un movimiento", "SubTitle"),
        numbered_steps(
            [
                "Abra <b>Estudio</b>.",
                "Seleccione Tipo: Ingreso, Egreso, Desembolso o Movimiento interno.",
                "Complete Fecha, Categoria, Subcategoria, Descripcion, Monto y Estado.",
                "Agregue observaciones cuando sea necesario.",
                "Presione <b>Guardar movimiento</b>.",
            ]
        ),
        Spacer(1, 5 * mm),
        p("Uso de los indicadores", "SubTitle"),
        bullet("Las tarjetas superiores muestran ingresos, egresos, resultado neto y pendientes."),
        bullet("El grafico mensual compara ingresos y egresos."),
        bullet("Los filtros permiten buscar por tipo, categoria y fecha inicial."),
        bullet("El catalogo del estudio puede ampliarse sin modificar las categorias de obra."),
        Spacer(1, 7 * mm),
        callout(
            "Separacion contable",
            "Ejemplo de Estudio: alquiler de oficina, software, impuestos o sueldos administrativos. "
            "Ejemplo de Obra: cemento, jornales, fletes, permisos o contratistas de un proyecto.",
            BLUE_SOFT,
            colors.HexColor("#315F83"),
        ),
        PageBreak(),
    ]
)

# 7. Team
story.extend(
    [
        heading(7, "Equipo y tareas"),
        p("Una persona puede participar en varias obras. Cada asignacion mantiene una tarea especifica independiente."),
        p("Agregar una persona", "SubTitle"),
        numbered_steps(
            [
                "Abra <b>Equipo</b>.",
                "Complete Nombre y Rol.",
                "Defina si la persona esta activa.",
                "Marque todas las obras en las que participa.",
                "Presione <b>Guardar integrante</b>.",
                "En la tabla, presione <b>Editar</b> para cargar o actualizar la tarea de cada obra.",
            ]
        ),
        Spacer(1, 6 * mm),
        screenshot("gb-team-tasks.png", 104 * mm),
        Spacer(1, 4 * mm),
        callout(
            "Tareas claras",
            "Use descripciones concretas y breves, por ejemplo: Control de certificacion, Revision de estructura o Coordinacion de contratistas.",
            GREEN_SOFT,
            GREEN,
        ),
        PageBreak(),
    ]
)

# 8. Users and roles
story.extend(
    [
        heading(8, "Usuarios y permisos"),
        p("El modulo <b>Usuarios</b> es independiente de <b>Equipo</b>. Un usuario sirve para ingresar al sistema; un integrante de Equipo representa personal asignado a una obra."),
        screenshot("gb-users-permissions.png", 92 * mm),
        Spacer(1, 5 * mm),
        p("Crear un usuario", "SubTitle"),
        numbered_steps(
            [
                "Ingrese como Propietario y abra <b>Usuarios</b>.",
                "Complete Nombre, Email y Contrasena.",
                "Seleccione la tipologia Propietario o Supervisor.",
                "Para un Supervisor, marque solamente las obras que puede consultar.",
                "Presione <b>Crear usuario</b>. Luego puede editar su estado, rol, clave y obras habilitadas.",
            ]
        ),
        PageBreak(),
        p("Permisos por tipologia", "SectionTitle"),
        two_column(
            [
                p("Propietario", "SubTitle"),
                bullet("Acceso total a obras y montos."),
                bullet("Crea y edita presupuestos."),
                bullet("Aprueba certificaciones."),
                bullet("Gestiona finanzas del estudio."),
                bullet("Gestiona Equipo y Usuarios."),
            ],
            [
                p("Supervisor", "SubTitle"),
                bullet("Ve solamente las obras habilitadas."),
                bullet("No ve Presupuestos, Estudio ni Usuarios."),
                bullet("No ve el monto total presupuestado de la obra."),
                bullet("Carga gastos pendientes o pagados."),
                bullet("Carga certificaciones Pendientes de aprobacion."),
                bullet("Consulta el personal de sus obras en modo lectura."),
            ],
        ),
        PageBreak(),
    ]
)

# 9. Supervisor view
story.extend(
    [
        heading(9, "Trabajo del Supervisor"),
        p("El Supervisor trabaja dentro de las obras que el Propietario le habilito. Puede registrar informacion operativa, pero no puede modificar presupuestos, aprobar certificaciones ni administrar usuarios."),
        screenshot("gb-supervisor-project.png", 100 * mm),
        Spacer(1, 5 * mm),
        numbered_steps(
            [
                "Ingrese con el email y la contrasena definidos en Usuarios.",
                "Abra una de las obras habilitadas y presione <b>Seguimiento</b>.",
                "Cargue una certificacion y agregue sus subitems. Se guardara como Pendiente de aprobacion.",
                "Registre gastos y elija Pendiente o Pagado segun corresponda.",
                "Abra Equipo para consultar el personal asignado a sus proyectos. La vista es de solo lectura.",
            ]
        ),
        Spacer(1, 5 * mm),
        callout(
            "Limite de acceso",
            "Los proyectos no habilitados no aparecen en la cuenta del Supervisor. La configuracion se modifica exclusivamente desde Usuarios con una cuenta Propietario.",
            BLUE_SOFT,
            colors.HexColor("#315F83"),
        ),
        PageBreak(),
    ]
)

# 10. Recommended workflow and support
story.extend(
    [
        heading(10, "Flujo recomendado"),
        numbered_steps(
            [
                "Cree el presupuesto y subdivida cada certificacion en sus items.",
                "Apruebe el presupuesto cuando este validado.",
                "Cree la obra desde ese presupuesto.",
                "Asigne integrantes y tareas desde Equipo.",
                "Cree usuarios Supervisor y habilite solamente sus obras.",
                "Cargue cada certificacion con sus subitems o importelos desde el presupuesto.",
                "Revise y apruebe las certificaciones pendientes.",
                "Registre los gastos dentro de la obra, con categoria y subcategoria.",
                "Revise desvio, pendientes y alertas economicas.",
                "Registre por separado los ingresos y egresos administrativos del estudio.",
            ]
        ),
        Spacer(1, 7 * mm),
        p("Controles periodicos sugeridos", "SubTitle"),
        bullet("<b>Semanal:</b> gastos pendientes, tareas por persona y nuevas certificaciones."),
        bullet("<b>Mensual:</b> certificados cobrados, desvio por obra y resultado del estudio."),
        bullet("<b>Al cerrar una etapa:</b> actualizar estados, revisar gastos no presupuestados y eliminar duplicados."),
        Spacer(1, 7 * mm),
        callout(
            "Respaldo y alcance del MVP",
            "La informacion, los usuarios y las contrasenas se guardan localmente en el navegador. "
            "Los roles controlan la interfaz del MVP, pero para uso productivo se requiere una base de datos, autenticacion del lado servidor, permisos en la API y copias de seguridad.",
            RED_SOFT,
            colors.HexColor("#A43D35"),
        ),
        Spacer(1, 8 * mm),
        p("Acceso directo", "SubTitle"),
        p(
            '<link href="https://gb-construction-assistant.guidoscopel-gb.workers.dev" color="#0F6B57">'
            "https://gb-construction-assistant.guidoscopel-gb.workers.dev</link><br/>"
            "<b>Usuario:</b> test@test<br/><b>Contrasena:</b> GB2026"
        ),
    ]
)


doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=17 * mm,
    leftMargin=17 * mm,
    topMargin=17 * mm,
    bottomMargin=18 * mm,
    title="Manual de uso - GB Construction Assistant",
    author="GB Construction Assistant",
    subject="Instrucciones de uso del sistema de gestion de obras",
)
doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
print(OUTPUT)
