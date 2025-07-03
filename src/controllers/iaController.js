// src/controllers/iaController.js

const generarRecomendacion = (req, res) => {
  const { temperatura, pulso, tension, notas } = req.body;

  let recomendaciones = [];

  // =====================
  // ANÁLISIS DE CONSTANTES
  // =====================

  // Temperatura
  if (temperatura >= 38.5) {
    recomendaciones.push("Fiebre alta. Administrar antipiréticos y monitorizar evolución cada 4-6h.");
  } else if (temperatura >= 37.5) {
    recomendaciones.push("Febrícula. Vigilar progresión y valorar signos asociados.");
  } else if (temperatura < 36) {
    recomendaciones.push("Hipotermia leve. Evaluar causas (ambientales, infecciosas, metabólicas).");
  }

  // Pulso
  if (pulso > 100) {
    recomendaciones.push("Taquicardia. Evaluar causas como fiebre, ansiedad o deshidratación.");
  } else if (pulso < 50) {
    recomendaciones.push("Bradicardia. Confirmar con ECG si hay antecedentes cardiovasculares.");
  }

  // Tensión arterial
  if (typeof tension === "string") {
    const [sistolica, diastolica] = tension.split("/").map(Number);

    if (sistolica >= 140 || diastolica >= 90) {
      recomendaciones.push("Hipertensión. Registrar 3 tomas y revisar tratamiento si se mantiene.");
    } else if (sistolica < 90 || diastolica < 60) {
      recomendaciones.push("Hipotensión. Monitorizar constantes y valorar hidratación.");
    }
  }

  // ==================================
  // ANÁLISIS SEMÁNTICO DE LAS NOTAS
  // ==================================

  const notaTexto = notas?.toLowerCase() || "";
  const diccionarioNotas = {
    "dolor": "Dolor referido. Administrar analgesia según pauta y reevaluar en 30 minutos.",
    "mareo": "Mareo detectado. Valorar TA y glucemia capilar.",
    "náuseas": "Presencia de náuseas. Evaluar dieta y tolerancia oral.",
    "vómito": "Vómitos registrados. Iniciar control hídrico y dieta astringente.",
    "úlceras": "Úlceras detectadas. Aplicar protocolo local y cambiar apósitos según indicación.",
    "diarrea": "Episodios de diarrea. Monitorizar hidratación y signos de deshidratación.",
    "infección": "Signos de infección. Valorar necesidad de cultivo y tratamiento antibiótico."
  };

  for (const [clave, mensaje] of Object.entries(diccionarioNotas)) {
    if (notaTexto.includes(clave)) {
      recomendaciones.push(mensaje);
    }
  }

  // =============================
  // ESCENARIOS CLÍNICOS COMBINADOS
  // =============================
  if (temperatura > 38 && pulso > 100) {
    recomendaciones.push("Fiebre + taquicardia. Indicios de infección activa. Realizar valoración médica urgente.");
  }

  if (tension?.includes("/") && tension.startsWith("8")) {
    recomendaciones.push("Tensión limítrofe. Mantener en observación y repetir en 1h.");
  }

  // =============================
  // RESPUESTA POR DEFECTO
  // =============================
  if (recomendaciones.length === 0) {
    recomendaciones.push("Sin hallazgos clínicamente relevantes. Mantener seguimiento rutinario.");
  }

  res.json({
    mensaje: "Recomendaciones generadas correctamente",
    recomendaciones
  });
};

module.exports = { generarRecomendacion };
