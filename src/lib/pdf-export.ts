export async function exportToPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  // Dynamic import to avoid SSR issues - html2pdf.js requires browser APIs
  const html2pdf = (await import("html2pdf.js")).default;

  // Save original styles on the element and its parent
  const parent = element.parentElement;
  const origParentTransform = parent?.style.transform || "";
  const origParentTransformOrigin = parent?.style.transformOrigin || "";
  const origOverflow = element.style.overflow;

  try {
    // Temporarily reset parent zoom to 100% so html2canvas captures full size
    if (parent) {
      parent.style.transform = "none";
      parent.style.transformOrigin = "top left";
    }

    // A4 at 96 DPI: 210mm × 297mm = 794px × 1123px
    // 50px padding ≈ 13.23mm
    const marginMM = 13;

    const opt = {
      margin: [marginMM, marginMM, marginMM, marginMM],
      filename: `${filename}.pdf`,
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: {
        scale: 3, // Higher scale for better clarity
        useCORS: true,
        letterRendering: false, // Disabling this often fixes character overlap in modern browsers
        logging: false,
        imageTimeout: 0,
        width: 794,
        height: 1123,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait" as const,
        compress: true,
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf().set(opt).from(element).save();
  } finally {
    // Restore original styles
    if (parent) {
      parent.style.transform = origParentTransform;
      parent.style.transformOrigin = origParentTransformOrigin;
    }
    element.style.overflow = origOverflow;
  }
}
