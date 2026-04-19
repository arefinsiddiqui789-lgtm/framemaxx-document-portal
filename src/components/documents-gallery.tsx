"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { templates, TemplateDef } from "@/lib/templates";
import { exportToPdf } from "@/lib/pdf-export";

export function DocumentsGallery({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTemplate, setActiveTemplate] = useState<TemplateDef | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
          <Download className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary tracking-wide">
            DOCUMENT TEMPLATES
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
          Professional{" "}
          <span className="text-primary">Templates</span>
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Preview, fill, and export A4-formatted documents for every stage of your project.
        </p>
      </motion.div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => setActiveTemplate(template)}
              className="w-full text-left p-5 rounded-xl border border-border/30 bg-card hover:bg-card/80 hover:border-primary/30 transition-all duration-200 group"
            >
              <div className="text-3xl mb-3">{template.icon}</div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                {template.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {template.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View & Export</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {activeTemplate && (
          <DocumentViewer
            template={activeTemplate}
            onClose={() => setActiveTemplate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DocumentViewer({
  template,
  onClose,
}: {
  template: TemplateDef;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleExport = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);
    try {
      await exportToPdf(
        contentRef.current,
        `FrameMaxx_${template.title.replace(/\s+/g, "_")}`
      );
    } catch (err) {
      console.error("PDF export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/30 bg-card/50">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Separator />
          <span className="text-lg">{template.icon}</span>
          <span className="font-bold text-foreground text-sm sm:text-base">
            {template.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center gap-1 bg-muted/50 rounded-lg px-2 py-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="h-7 w-7 p-0 text-muted-foreground"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground font-mono w-10 text-center">
              {zoom}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
              className="h-7 w-7 p-0 text-muted-foreground"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button
            onClick={handleExport}
            disabled={isExporting}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* A4 Preview Area */}
      <div className="flex-1 overflow-auto py-6 px-4">
        <div
          className="mx-auto transition-transform duration-200"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <div
            ref={contentRef}
            className="bg-white shadow-2xl mx-auto"
            style={{
              width: "794px", // A4 at 96 DPI
              minHeight: "1123px",
              padding: "60px",
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "#1A1A1A",
            }}
          >
            {template.content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Separator() {
  return <div className="w-px h-6 bg-border/30 mx-1" />;
}
