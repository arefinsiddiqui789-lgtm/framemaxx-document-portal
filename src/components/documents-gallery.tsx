"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { templates, TemplateDef, FieldGroup } from "@/lib/templates";
import { exportToPdf } from "@/lib/pdf-export";

export function DocumentsGallery() {
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
          Professional <span className="text-primary">Templates</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Fill in the form and watch the document update in real-time. Export as PDF when ready.
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
                <PenLine className="w-3 h-3" />
                <span>Fill & Export</span>
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

// ─── Document Viewer with Split View ──────────────────────────────────

function DocumentViewer({
  template,
  onClose,
}: {
  template: TemplateDef;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [zoom, setZoom] = useState(70);
  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    () => ({ ...template.defaultValues })
  );

  const updateField = useCallback((key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

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
      className="fixed inset-0 z-[100] bg-background flex flex-col"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/30 bg-card/80 backdrop-blur-sm flex-shrink-0">
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
          <div className="w-px h-6 bg-border/30" />
          <span className="text-lg">{template.icon}</span>
          <span className="font-bold text-foreground text-sm sm:text-base">
            {template.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-muted/50 rounded-lg px-2 py-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom((z) => Math.max(40, z - 10))}
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
              onClick={() => setZoom((z) => Math.min(120, z + 10))}
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

      {/* Split View: Form + A4 Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Form Panel */}
        <div className="w-[380px] lg:w-[420px] flex-shrink-0 border-r border-border/30 overflow-y-auto bg-card/30">
          <div className="p-4 sm:p-5 space-y-5">
            {/* Form hint */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/15">
              <PenLine className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fill in the fields below. The A4 document preview updates in real-time as you type.
              </p>
            </div>

            {template.fieldGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 pb-2 border-b border-border/20">
                  {group.title}
                </h3>
                <div className="space-y-3">
                  {group.fields.map((field) => (
                    <div key={field.key} className="space-y-1">
                      <Label
                        htmlFor={field.key}
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {field.label}
                      </Label>
                      {field.type === "text" && (
                        <Input
                          id={field.key}
                          placeholder={field.placeholder}
                          value={(formData[field.key] as string) || ""}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          className="h-8 text-sm bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 placeholder:text-muted-foreground/40"
                        />
                      )}
                      {field.type === "date" && (
                        <Input
                          id={field.key}
                          type="date"
                          value={(formData[field.key] as string) || ""}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          className="h-8 text-sm bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20"
                        />
                      )}
                      {field.type === "textarea" && (
                        <Textarea
                          id={field.key}
                          placeholder={field.placeholder}
                          value={(formData[field.key] as string) || ""}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          rows={field.rows || 3}
                          className="text-sm bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 resize-none placeholder:text-muted-foreground/40"
                        />
                      )}
                      {field.type === "select" && field.options && (
                        <Select
                          value={(formData[field.key] as string) || ""}
                          onValueChange={(value) => updateField(field.key, value)}
                        >
                          <SelectTrigger className="h-8 text-sm bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20">
                            <SelectValue placeholder={field.placeholder || "Select..."} />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border/50">
                            {field.options.map((opt) => (
                              <SelectItem
                                key={opt}
                                value={opt}
                                className="focus:bg-primary/10 focus:text-primary"
                              >
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {field.type === "checkbox" && (
                        <div className="flex items-center gap-2">
                          <input
                            id={field.key}
                            type="checkbox"
                            checked={!!formData[field.key]}
                            onChange={(e) => updateField(field.key, e.target.checked)}
                            className="accent-primary"
                          />
                          <Label htmlFor={field.key} className="text-xs text-muted-foreground">
                            {field.placeholder || "Yes"}
                          </Label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Export button at bottom of form */}
            <div className="pt-4 border-t border-border/20">
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export as PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: A4 Preview */}
        <div className="flex-1 overflow-auto bg-muted/20 p-6">
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
                width: "794px",
                minHeight: "1123px",
                maxHeight: "1123px",
                overflow: "hidden",
                padding: "36px 40px",
                fontFamily: "Arial, Helvetica, sans-serif",
                color: "#1A1A1A",
              }}
            >
              {template.render(formData)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
