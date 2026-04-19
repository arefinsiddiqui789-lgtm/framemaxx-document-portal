declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: any;
    jsPDF?: any;
    pagebreak?: { mode?: string | string[] };
  }

  interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: HTMLElement | string): Html2PdfInstance;
    save(): Promise<void>;
    output(type?: string, options?: any): any;
  }

  function html2pdf(): Html2PdfInstance;
  namespace html2pdf {
    const fn: any;
  }

  export default html2pdf;
}
