"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, ImageIcon, Download, CheckCircle2, Loader2, X, RefreshCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PDFDocument, degrees } from "pdf-lib";
import { toast } from "sonner";

export function PaidSection() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        
        // Clean up previous preview URL
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (processedFileUrl) URL.revokeObjectURL(processedFileUrl);
        
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setIsDone(false);
        setProcessedFileUrl(null);
      } else {
        toast.error("Please upload a PDF or an Image.");
      }
    }
  };

  const applySeal = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      if (file.type === "application/pdf") {
        await processPdf();
      } else {
        await processImage();
      }
      setIsDone(true);
      toast.success("Seal applied successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply seal. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const processPdf = async () => {
    const fileArrayBuffer = await file!.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileArrayBuffer);
    
    // Load the seal image
    const sealImageBytes = await fetch("/paid-seal.png").then((res) => {
      if (!res.ok) throw new Error("Seal image not found");
      return res.arrayBuffer();
    });
    
    // We assume it's PNG since I generated it as such
    const sealImage = await pdfDoc.embedPng(sealImageBytes);

    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      
      const sealWidth = 250;
      const sealHeight = (sealImage.height / sealImage.width) * sealWidth;
      
      page.drawImage(sealImage, {
        x: (width - sealWidth) / 2,
        y: (height - sealHeight) / 2,
        width: sealWidth,
        height: sealHeight,
        opacity: 0.85,
        rotate: degrees(-15),
      });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setProcessedFileUrl(url);
  };

  const processImage = async () => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not get canvas context"));

        ctx.drawImage(img, 0, 0);

        const seal = new Image();
        seal.onload = () => {
          const sealWidth = img.width * 0.4;
          const sealHeight = (seal.height / seal.width) * sealWidth;
          
          ctx.save();
          ctx.translate(img.width / 2, img.height / 2);
          ctx.rotate((-15 * Math.PI) / 180);
          ctx.globalAlpha = 0.85;
          ctx.drawImage(seal, -sealWidth / 2, -sealHeight / 2, sealWidth, sealHeight);
          ctx.restore();

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setProcessedFileUrl(url);
              resolve();
            } else {
              reject(new Error("Canvas to blob failed"));
            }
          }, file!.type);
        };
        seal.onerror = () => reject(new Error("Failed to load seal image"));
        seal.src = "/paid-seal.png";
      };
      img.onerror = () => reject(new Error("Failed to load source image"));
      img.src = previewUrl!;
    });
  };

  const downloadFile = () => {
    if (!processedFileUrl) return;
    const link = document.createElement("a");
    link.href = processedFileUrl;
    link.download = `PAID_${file?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (processedFileUrl) URL.revokeObjectURL(processedFileUrl);
    setFile(null);
    setPreviewUrl(null);
    setProcessedFileUrl(null);
    setIsDone(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary tracking-wide uppercase">
            Payment Verification Tool
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
          PAID <span className="text-primary">Seal Portal</span>
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Upload any document or image to apply our official red seal. 
          Perfect for receipts, invoices, and confirmation documents.
        </p>
      </motion.div>

      <Card className="bg-card border-border/50 shadow-2xl overflow-hidden mb-8">
        <div className="h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        <CardContent className="p-6 sm:p-10">
          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("bg-primary/5", "border-primary/50"); }}
              onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove("bg-primary/5", "border-primary/50"); }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("bg-primary/5", "border-primary/50");
                const droppedFile = e.dataTransfer.files?.[0];
                if (droppedFile) {
                  const fakeEvent = { target: { files: [droppedFile] } } as any;
                  handleFileChange(fakeEvent);
                }
              }}
              className="border-2 border-dashed border-border/30 rounded-2xl p-10 sm:p-20 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group relative"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf,image/*"
                className="hidden"
              />
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Click or Drag to Upload</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Select a PDF or image file you wish to mark as <span className="text-primary font-semibold">PAID</span>
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between p-5 bg-muted/30 rounded-2xl border border-border/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    {file.type === "application/pdf" ? (
                      <FileText className="w-6 h-6 text-primary" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground truncate max-w-[150px] sm:max-w-[300px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.split("/")[1]}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={reset} disabled={isProcessing} className="hover:bg-destructive/10 hover:text-destructive rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="aspect-[4/3] sm:aspect-video bg-muted/20 rounded-2xl border border-border/20 overflow-hidden relative flex items-center justify-center group shadow-inner">
                {file.type === "application/pdf" ? (
                  <div className="flex flex-col items-center gap-4 text-center p-10">
                    <div className="relative">
                      <FileText className="w-20 h-20 text-muted-foreground/20" />
                      {isDone && <CheckCircle2 className="w-8 h-8 text-primary absolute -bottom-1 -right-1 bg-background rounded-full" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">PDF Preview</p>
                      <p className="text-xs text-muted-foreground">Detailed preview is available after downloading</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={processedFileUrl || previewUrl!}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
                
                {isProcessing && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10">
                    <div className="relative">
                      <Loader2 className="w-12 h-12 text-primary animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                    </div>
                    <p className="text-sm font-bold text-primary animate-pulse tracking-widest uppercase">Applying Official Seal</p>
                  </div>
                )}

                {isDone && file.type === "application/pdf" && (
                  <div className="absolute inset-0 bg-primary/5 flex items-center justify-center flex-col gap-3 backdrop-blur-[1px]">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-primary" />
                    </motion.div>
                    <p className="font-black text-primary text-xl tracking-tighter">PDF SEALED & READY</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {!isDone ? (
                  <Button
                    onClick={applySeal}
                    disabled={isProcessing}
                    className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-xl"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Generating Sealed Copy...
                      </>
                    ) : (
                      "Apply PAID Seal"
                    )}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={downloadFile}
                      className="flex-[2] h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-500/20 rounded-xl transition-all active:scale-[0.98]"
                    >
                      <Download className="w-5 h-5 mr-3" />
                      Download Sealed File
                    </Button>
                    <Button
                      variant="outline"
                      onClick={reset}
                      className="flex-1 h-14 border-primary/30 text-primary hover:bg-primary/5 font-bold rounded-xl"
                    >
                      <RefreshCcw className="w-5 h-5 mr-2" />
                      Start Over
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
        {[
          { title: "Browser Based", desc: "Files are processed locally for maximum privacy", icon: Shield },
          { title: "High Quality", desc: "Maintains original document resolution and clarity", icon: CheckCircle2 },
          { title: "Universal", desc: "Works with all standard PDF and image formats", icon: ImageIcon },
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-card/50 rounded-2xl border border-border/20 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <feat.icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base mb-2 text-foreground">{feat.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
