export async function exportToPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  // Dynamic import to avoid SSR issues - html2pdf.js requires browser APIs
  const html2pdf = (await import("html2pdf.js")).default;

  // Clone the element into a temporary off-screen container at full size
  // This avoids issues with CSS transforms (zoom) and overflow:hidden on the original
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-9999px";
  wrapper.style.top = "0";
  wrapper.style.zIndex = "-1";

  const clone = element.cloneNode(true) as HTMLElement;
  // Reset transform and set to exact A4 pixel size
  clone.style.transform = "none";
  clone.style.width = "794px";
  clone.style.height = "1123px";
  clone.style.overflow = "hidden";
  clone.style.padding = "50px";
  clone.style.boxSizing = "border-box";
  clone.style.background = "white";
  clone.style.margin = "0";

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // A4 at 96 DPI: 210mm × 297mm = 794px × 1123px
  // 50px padding ≈ 13.23mm
  const marginMM = 13;

  const opt = {
    margin: [marginMM, marginMM, marginMM, marginMM],
    filename: `${filename}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
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
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  try {
    await html2pdf().set(opt).from(clone).save();
  } finally {
    // Clean up the temporary element
    document.body.removeChild(wrapper);
  }
}
