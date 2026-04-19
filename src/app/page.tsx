"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Send,
  CheckCircle2,
  Loader2,
  Globe,
  Briefcase,
  DollarSign,
  Clock,
  ListChecks,
  ExternalLink,
  MessageSquare,
  Shield,
  User,
  Mail,
  Building2,
  Sparkles,
  ArrowUpRight,
  FileText,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DocumentsGallery } from "@/components/documents-gallery";

const PROJECT_TYPES = [
  { value: "portfolio", label: "Portfolio", icon: "🎯" },
  { value: "business-website", label: "Business Website", icon: "🏢" },
  { value: "e-commerce", label: "E-commerce", icon: "🛒" },
  { value: "custom-web-app", label: "Custom Web App", icon: "⚡" },
];

const BUDGET_RANGES = [
  "$500 - $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
];

const TIMELINES = [
  "Less than 1 month",
  "1 - 2 months",
  "2 - 3 months",
  "3 - 6 months",
  "6+ months",
  "Flexible",
];

interface FormData {
  fullName: string;
  email: string;
  businessName: string;
  projectType: string;
  budgetRange: string;
  projectTimeline: string;
  featuresRequired: string;
  referenceWebsites: string;
  additionalNotes: string;
  agreedToTerms: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  businessName: "",
  projectType: "",
  budgetRange: "",
  projectTimeline: "",
  featuresRequired: "",
  referenceWebsites: "",
  additionalNotes: "",
  agreedToTerms: false,
};

const STEP_COUNT = 3;

type ActiveView = "intake" | "documents";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("intake");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const formRef = useRef<HTMLDivElement>(null);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (step === 1) {
      if (!formData.projectType) newErrors.projectType = "Please select a project type";
    }
    if (step === 2) {
      if (!formData.agreedToTerms)
        newErrors.agreedToTerms = "You must agree to the Terms and Privacy Policy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEP_COUNT - 1));
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ email: data.error || "Submission failed. Please try again." });
        return;
      }
      setSubmissionId(data.submissionId);
      setIsSubmitted(true);
    } catch {
      setErrors({ email: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Your Info", "Project Details", "Review & Submit"];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  const renderHeader = () => (
    <header className="border-b border-border/30 sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-[#1A1A1A]">
            <img
              src="/framemaxx-logo.png"
              alt="FrameMaxx"
              className="w-7 h-7 object-contain"
            />
          </div>
          <span className="text-lg font-bold tracking-wide text-foreground">
            Frame<span className="text-primary">Maxx</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
          <button
            onClick={() => setActiveView("intake")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeView === "intake"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Intake Form</span>
          </button>
          <button
            onClick={() => setActiveView("documents")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeView === "documents"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Documents</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Premium Web Development</span>
        </div>
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="border-t border-border/30 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center bg-[#1A1A1A]">
              <img
                src="/framemaxx-logo.png"
                alt="FrameMaxx"
                className="w-4 h-4 object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-foreground">
              Frame<span className="text-primary">Maxx</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FrameMaxx Web Development Agency. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  // Success Screen
  if (isSubmitted && activeView === "intake") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="border-b border-border/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-[#1A1A1A]">
              <img
                src="/framemaxx-logo.png"
                alt="FrameMaxx"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="text-lg font-bold tracking-wide text-foreground">
              Frame<span className="text-primary">Maxx</span>
            </span>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-lg w-full"
          >
            <Card className="bg-card border-border/50 overflow-hidden">
              <CardContent className="p-8 sm:p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Submission Received!
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Your project request has been submitted successfully.
                    <br />
                    <span className="text-primary font-semibold">FrameMaxx</span> will
                    contact you soon.
                  </p>
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                  <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border/30">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Submission ID
                    </p>
                    <p className="text-primary font-bold font-mono tracking-wider">
                      {submissionId}
                    </p>
                  </div>
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                  <Separator className="mb-6 bg-border/30" />
                  <div className="text-left space-y-3 text-sm">
                    <h3 className="font-semibold text-foreground mb-3">
                      What happens next?
                    </h3>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">1</span>
                      </div>
                      <p className="text-muted-foreground">
                        Our team reviews your project details within 24-48 hours
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">2</span>
                      </div>
                      <p className="text-muted-foreground">
                        We&apos;ll reach out to schedule a discovery call
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">3</span>
                      </div>
                      <p className="text-muted-foreground">
                        You&apos;ll receive a custom proposal and project roadmap
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData(initialFormData);
                      setCurrentStep(0);
                      setErrors({});
                    }}
                    className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        {renderFooter()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {renderHeader()}

      <main className="flex-1 py-8 sm:py-12" ref={formRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {activeView === "intake" ? (
              <motion.div
                key="intake"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-2xl mx-auto">
                  {/* Hero */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary tracking-wide">
                        CLIENT INTAKE PORTAL
                      </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
                      Let&apos;s Build Something{" "}
                      <span className="text-primary">Extraordinary</span>
                    </h1>
                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Tell us about your vision. We&apos;ll craft a tailored solution that
                      elevates your digital presence.
                    </p>
                  </motion.div>

                  {/* Step Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <div className="flex items-center justify-between max-w-sm mx-auto">
                      {stepLabels.map((label, i) => (
                        <div key={label} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                i < currentStep
                                  ? "bg-primary text-primary-foreground"
                                  : i === currentStep
                                  ? "bg-primary text-primary-foreground gold-glow"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {i < currentStep ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                i + 1
                              )}
                            </div>
                            <span
                              className={`text-[10px] mt-1.5 font-medium transition-colors ${
                                i <= currentStep
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {label}
                            </span>
                          </div>
                          {i < stepLabels.length - 1 && (
                            <div
                              className={`w-12 sm:w-20 h-0.5 mx-2 rounded-full transition-colors duration-300 ${
                                i < currentStep ? "bg-primary" : "bg-muted"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Form Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="bg-card border-border/50 overflow-hidden">
                      <CardContent className="p-6 sm:p-8">
                        <AnimatePresence mode="wait">
                          {currentStep === 0 && (
                            <motion.div key="step0" {...fadeInUp} className="space-y-6">
                              <div>
                                <h2 className="text-xl font-bold text-foreground mb-1">Client Information</h2>
                                <p className="text-sm text-muted-foreground">Tell us who you are so we can reach out.</p>
                              </div>
                              <Separator className="bg-border/30" />
                              <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <User className="w-3.5 h-3.5 text-primary" />Full Name <span className="text-primary">*</span>
                                </Label>
                                <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)}
                                  className={`bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 placeholder:text-muted-foreground/50 ${errors.fullName ? "border-destructive" : ""}`}
                                />
                                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-primary" />Email Address <span className="text-primary">*</span>
                                </Label>
                                <Input id="email" type="email" placeholder="john@company.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)}
                                  className={`bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 placeholder:text-muted-foreground/50 ${errors.email ? "border-destructive" : ""}`}
                                />
                                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="businessName" className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <Building2 className="w-3.5 h-3.5 text-primary" />Business Name <span className="text-muted-foreground text-xs">(optional)</span>
                                </Label>
                                <Input id="businessName" placeholder="Acme Inc." value={formData.businessName} onChange={(e) => updateField("businessName", e.target.value)}
                                  className="bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                                />
                              </div>
                            </motion.div>
                          )}

                          {currentStep === 1 && (
                            <motion.div key="step1" {...fadeInUp} className="space-y-6">
                              <div>
                                <h2 className="text-xl font-bold text-foreground mb-1">Project Details</h2>
                                <p className="text-sm text-muted-foreground">Help us understand what you&apos;re looking for.</p>
                              </div>
                              <Separator className="bg-border/30" />
                              <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <Briefcase className="w-3.5 h-3.5 text-primary" />Project Type <span className="text-primary">*</span>
                                </Label>
                                <div className="grid grid-cols-2 gap-3">
                                  {PROJECT_TYPES.map((type) => (
                                    <button key={type.value} type="button" onClick={() => updateField("projectType", type.value)}
                                      className={`p-3 sm:p-4 rounded-lg border text-left transition-all duration-200 group ${
                                        formData.projectType === type.value
                                          ? "border-primary bg-primary/10 text-foreground"
                                          : "border-border/30 bg-input/30 text-muted-foreground hover:border-primary/30 hover:bg-input/50"
                                      } ${errors.projectType ? "border-destructive" : ""}`}
                                    >
                                      <span className="text-lg block mb-1">{type.icon}</span>
                                      <span className="text-sm font-medium block">{type.label}</span>
                                    </button>
                                  ))}
                                </div>
                                {errors.projectType && <p className="text-xs text-destructive">{errors.projectType}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <DollarSign className="w-3.5 h-3.5 text-primary" />Budget Range <span className="text-muted-foreground text-xs">(optional)</span>
                                </Label>
                                <Select value={formData.budgetRange} onValueChange={(value) => updateField("budgetRange", value)}>
                                  <SelectTrigger className="bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20">
                                    <SelectValue placeholder="Select budget range" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-card border-border/50">
                                    {BUDGET_RANGES.map((range) => (
                                      <SelectItem key={range} value={range} className="focus:bg-primary/10 focus:text-primary">{range}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 text-primary" />Project Timeline <span className="text-muted-foreground text-xs">(optional)</span>
                                </Label>
                                <Select value={formData.projectTimeline} onValueChange={(value) => updateField("projectTimeline", value)}>
                                  <SelectTrigger className="bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20">
                                    <SelectValue placeholder="Select timeline" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-card border-border/50">
                                    {TIMELINES.map((timeline) => (
                                      <SelectItem key={timeline} value={timeline} className="focus:bg-primary/10 focus:text-primary">{timeline}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="featuresRequired" className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <ListChecks className="w-3.5 h-3.5 text-primary" />Features Required <span className="text-muted-foreground text-xs">(optional)</span>
                                </Label>
                                <Textarea id="featuresRequired" placeholder="e.g., User authentication, payment integration, admin dashboard, SEO optimization..."
                                  value={formData.featuresRequired} onChange={(e) => updateField("featuresRequired", e.target.value)} rows={4}
                                  className="bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 resize-none placeholder:text-muted-foreground/50"
                                />
                              </div>
                            </motion.div>
                          )}

                          {currentStep === 2 && (
                            <motion.div key="step2" {...fadeInUp} className="space-y-6">
                              <div>
                                <h2 className="text-xl font-bold text-foreground mb-1">Final Details</h2>
                                <p className="text-sm text-muted-foreground">Almost there! Add any references or notes.</p>
                              </div>
                              <Separator className="bg-border/30" />
                              <div className="space-y-2">
                                <Label htmlFor="referenceWebsites" className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <ExternalLink className="w-3.5 h-3.5 text-primary" />Reference Websites <span className="text-muted-foreground text-xs">(optional)</span>
                                </Label>
                                <Textarea id="referenceWebsites" placeholder="e.g., https://stripe.com, https://linear.app..."
                                  value={formData.referenceWebsites} onChange={(e) => updateField("referenceWebsites", e.target.value)} rows={3}
                                  className="bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 resize-none placeholder:text-muted-foreground/50"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="additionalNotes" className="text-sm font-medium text-foreground flex items-center gap-2">
                                  <MessageSquare className="w-3.5 h-3.5 text-primary" />Additional Notes <span className="text-muted-foreground text-xs">(optional)</span>
                                </Label>
                                <Textarea id="additionalNotes" placeholder="Anything else you'd like us to know?"
                                  value={formData.additionalNotes} onChange={(e) => updateField("additionalNotes", e.target.value)} rows={4}
                                  className="bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 resize-none placeholder:text-muted-foreground/50"
                                />
                              </div>
                              <Separator className="bg-border/30" />
                              <div className="bg-muted/30 rounded-lg p-4 border border-border/20">
                                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <Globe className="w-3.5 h-3.5 text-primary" />Submission Summary
                                </h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Name</span>
                                    <span className="text-foreground font-medium">{formData.fullName || "—"}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Email</span>
                                    <span className="text-foreground font-medium truncate ml-4">{formData.email || "—"}</span>
                                  </div>
                                  {formData.businessName && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Business</span>
                                      <span className="text-foreground font-medium">{formData.businessName}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Project Type</span>
                                    <span className="text-foreground font-medium">{PROJECT_TYPES.find((t) => t.value === formData.projectType)?.label || "—"}</span>
                                  </div>
                                  {formData.budgetRange && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Budget</span>
                                      <span className="text-foreground font-medium">{formData.budgetRange}</span>
                                    </div>
                                  )}
                                  {formData.projectTimeline && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Timeline</span>
                                      <span className="text-foreground font-medium">{formData.projectTimeline}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={`space-y-2 p-4 rounded-lg border transition-colors ${
                                errors.agreedToTerms ? "border-destructive bg-destructive/5" : "border-border/30 bg-input/20"
                              }`}>
                                <div className="flex items-start gap-3">
                                  <Checkbox id="terms" checked={formData.agreedToTerms}
                                    onCheckedChange={(checked) => updateField("agreedToTerms", checked === true)}
                                    className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                  />
                                  <div className="space-y-1">
                                    <Label htmlFor="terms" className="text-sm text-foreground leading-relaxed cursor-pointer">
                                      I agree to the{" "}
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <button type="button" className="text-primary hover:underline font-medium inline-flex items-center gap-0.5">
                                            Terms of Service<Shield className="w-3 h-3" />
                                          </button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-card border-border/50 max-h-[80vh] overflow-y-auto">
                                          <DialogHeader><DialogTitle className="text-primary">Terms of Service</DialogTitle></DialogHeader>
                                          <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
                                            <p><strong className="text-foreground">1. Acceptance of Terms</strong><br/>By submitting a project request through the FrameMaxx client intake portal, you agree to be bound by these Terms of Service.</p>
                                            <p><strong className="text-foreground">2. Project Scope</strong><br/>All project submissions are subject to review. FrameMaxx reserves the right to decline any project that does not align with our capabilities or values.</p>
                                            <p><strong className="text-foreground">3. Confidentiality</strong><br/>FrameMaxx treats all client information as confidential. We will not share your project details with third parties without explicit consent.</p>
                                            <p><strong className="text-foreground">4. Quotations</strong><br/>All quotes provided are estimates based on the information submitted. Final pricing may vary based on detailed project requirements.</p>
                                            <p><strong className="text-foreground">5. Intellectual Property</strong><br/>Upon full payment, all custom code and design assets created for your project will be transferred to you, unless otherwise agreed.</p>
                                          </div>
                                        </DialogContent>
                                      </Dialog>{" "}and{" "}
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <button type="button" className="text-primary hover:underline font-medium inline-flex items-center gap-0.5">
                                            Privacy Policy<Shield className="w-3 h-3" />
                                          </button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-card border-border/50 max-h-[80vh] overflow-y-auto">
                                          <DialogHeader><DialogTitle className="text-primary">Privacy Policy</DialogTitle></DialogHeader>
                                          <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
                                            <p><strong className="text-foreground">1. Information We Collect</strong><br/>We collect the information you provide through our intake form: name, email, business name, project details, and any additional notes.</p>
                                            <p><strong className="text-foreground">2. How We Use Your Information</strong><br/>Your information is used solely to evaluate your project request, communicate with you about potential engagement, and provide our services.</p>
                                            <p><strong className="text-foreground">3. Data Protection</strong><br/>We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
                                            <p><strong className="text-foreground">4. Data Retention</strong><br/>We retain your submission data for up to 12 months. You may request deletion at any time by contacting us.</p>
                                            <p><strong className="text-foreground">5. Your Rights</strong><br/>You have the right to access, correct, or delete your personal data. Contact us at any time to exercise these rights.</p>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </Label>
                                    {errors.agreedToTerms && <p className="text-xs text-destructive">{errors.agreedToTerms}</p>}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/20">
                          {currentStep > 0 ? (
                            <Button type="button" variant="ghost" onClick={prevStep} className="text-muted-foreground hover:text-foreground">
                              <ChevronLeft className="w-4 h-4 mr-1" />Back
                            </Button>
                          ) : (
                            <div />
                          )}
                          {currentStep < STEP_COUNT - 1 ? (
                            <Button type="button" onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                              Continue<ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          ) : (
                            <Button type="button" onClick={handleSubmit} disabled={isSubmitting}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold min-w-[140px]"
                            >
                              {isSubmitting ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
                              ) : (
                                <><Send className="w-4 h-4 mr-2" />Submit</>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Trust badges */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground"
                  >
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-primary/60" /><span>Secure Submission</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary/60" /><span>24-48h Response</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" /><span>No Spam</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="documents"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DocumentsGallery />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {renderFooter()}
    </div>
  );
}
