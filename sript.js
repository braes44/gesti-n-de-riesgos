document.addEventListener("DOMContentLoaded", () => {
    const riesgosBody = document.getElementById("riesgos-body");
    const btnAgregarRiesgo = document.getElementById("btn-agregar-riesgo");
    const btnGuardar = document.getElementById("btn-guardar");
    const btnImprimir = document.getElementById("btn-imprimir");

    const tituloGestion = document.getElementById("titulo-gestion");
    const nombreAnalista = document.getElementById("nombre-analista");
    const fechaGestion = document.getElementById("fecha-gestion");
    const aplicaA = document.getElementById("aplica-a");

    // Datos iniciales para dos riesgos
    const riesgosIniciales = [
        {
            id: 1,
            descripcion: "Evento: Componentes en mal estado...",
            controles: "Realizar mantenimientos preventivos...",
            detectabilidad: 2,
            ocurrencia: 2,
            severidad: 8,
            nivel: "BAJO",
            clasificacion: "BAJO",
            controlesRecomendados: "N.A",
            codigoControl: "N.A",
            responsables: "N.A",
            fecha: "",
            evidencia: "N.A",
            detectabilidadPost: "N.A",
            ocurrenciaPost: "N.A",
            severidadPost: "N.A",
            nivelPost: "N.A",
            prioridad: "N.A",
        },
        {
            id: 2,
            descripcion: "Evento: Instrumentos sin calibración...",
            controles: "Revisar cronograma de metrología...",
            detectabilidad: 3,
            ocurrencia: 2,
            severidad: 6,
            nivel: "BAJO",
            clasificacion: "BAJO",
            controlesRecomendados: "N.A",
            codigoControl: "N.A",
            responsables: "N.A",
            fecha: "",
            evidencia: "N.A",
            detectabilidadPost: "N.A",
            ocurrenciaPost: "N.A",
            severidadPost: "N.A",
            nivelPost: "N.A",
            prioridad: "N.A",
        },
    ];

    cargarRiesgos(riesgosIniciales);
    cargarDatosGenerales();

    btnAgregarRiesgo.addEventListener("click", () => agregarRiesgo());
    btnGuardar.addEventListener("click", guardarDatos);
    btnImprimir.addEventListener("click", () => window.print());

    function cargarRiesgos(riesgos) {
        riesgos.forEach((riesgo) => agregarRiesgo(riesgo));
    }

    function agregarRiesgo(riesgo = {}) {
        const id = riesgo.id || riesgosBody.children.length + 1;
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td><input type="text" name="id" value="${id}" readonly></td>
            <td><textarea name="descripcion">${riesgo.descripcion || ""}</textarea></td>
            <td><textarea name="controles">${riesgo.controles || ""}</textarea></td>
            <td><input type="number" name="detectabilidad" value="${riesgo.detectabilidad || ""}"></td>
            <td><input type="number" name="ocurrencia" value="${riesgo.ocurrencia || ""}"></td>
            <td><input type="number" name="severidad" value="${riesgo.severidad || ""}"></td>
            <td><input type="text" name="nivel" value="${riesgo.nivel || ""}" readonly></td>
            <td><input type="text" name="clasificacion" value="${riesgo.clasificacion || ""}" readonly></td>
            <td><textarea name="controlesRecomendados">${riesgo.controlesRecomendados || ""}</textarea></td>
            <td><input type="text" name="codigoControl" value="${riesgo.codigoControl || ""}"></td>
            <td><input type="text" name="responsables" value="${riesgo.responsables || ""}"></td>
            <td><input type="date" name="fecha" value="${riesgo.fecha || ""}"></td>
            <td><textarea name="evidencia">${riesgo.evidencia || ""}</textarea></td>
            <td><input type="number" name="detectabilidadPost" value="${riesgo.detectabilidadPost || ""}"></td>
            <td><input type="number" name="ocurrenciaPost" value="${riesgo.ocurrenciaPost || ""}"></td>
            <td><input type="number" name="severidadPost" value="${riesgo.severidadPost || ""}"></td>
            <td><input type="text" name="nivelPost" value="${riesgo.nivelPost || ""}" readonly></td>
            <td><input type="text" name="prioridad" value="${riesgo.prioridad || ""}" readonly></td>
        `;

        riesgosBody.appendChild(fila);
    }

    function guardarDatos() {
        const riesgos = [];
        const filas = riesgosBody.querySelectorAll("tr");

        filas.forEach((fila) => {
            const inputs = fila.querySelectorAll("input, textarea");
            const riesgo = {};

            inputs.forEach((input) => {
                riesgo[input.name] = input.value;
            });

            riesgos.push(riesgo);
        });

        const datosGenerales = {
            titulo: tituloGestion.textContent,
            analista: nombreAnalista.textContent,
            fecha: fechaGestion.textContent,
            aplicaA: aplicaA.textContent,
        };

        localStorage.setItem("datosRiesgos", JSON.stringify(riesgos));
        localStorage.setItem("datosGenerales", JSON.stringify(datosGenerales));

        alert("Datos guardados correctamente.");
    }

    function cargarDatosGenerales() {
        const datosGenerales = JSON.parse(localStorage.getItem("datosGenerales"));

        if (datosGenerales) {
            tituloGestion.textContent = datosGenerales.titulo;
            nombreAnalista.textContent = datosGenerales.analista;
            fechaGestion.textContent = datosGenerales.fecha;
            aplicaA.textContent = datosGenerales.aplicaA;
        }
    }
});
