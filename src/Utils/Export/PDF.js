import jsPDF from 'jspdf'
import adjustPage from "./Utils.js";

function exportPDF(tableID, html2canvas){

  const table = document.getElementById(tableID)

  adjustPage();

  const w = table.offsetWidth
  const h = table.offsetHeight
  html2canvas(table, {
    dpi: 300,
    scale: 3,
  }).then(canvas => {
    var img = canvas.toDataURL("image/jpeg", 1);
    var doc = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [w, h]
      });
    doc.addImage(img, 'JPEG', 0, 0, w, h);
    doc.save('horario.pdf');
  })
}

async function exportCombinationsPDF(combinations, html2canvas, setPage) {
  // Si no hay combinaciones, exportar el horario normal
  if (combinations.length === 0) {
    exportPDF("exportScheduleClassTable", html2canvas);
    return;
  }

  // crear un html de tablas
  const pdf = new jsPDF({
    orientation: "l",
    unit: "px",
  });

  // remover la primera página
  pdf.deletePage(1);

  for (let numDeCombinacion = 0; numDeCombinacion < combinations.length; numDeCombinacion++) {
    console.log(`Generando PDF de la combinación ${numDeCombinacion}`)

    await setPage(numDeCombinacion);

    const table = await document.getElementById("exportScheduleClassTable")

    await adjustPage();

    const w = table.offsetWidth;
    const h = table.offsetHeight;

    await html2canvas(table, {
      dpi: 300,
      scale: 3,
    }).then(canvas => {
      const img = canvas.toDataURL("image/jpeg", 0.6); // 0.6 es la calidad de la imagen

      pdf.addPage(
        [w,h],
        "l"
        );

      pdf.addImage(img, 'JPEG', 0, 0, w, h);
    });
  }

  console.log("Guardando PDF");
  pdf.save('horarios.pdf');
}

export {exportPDF, exportCombinationsPDF}
