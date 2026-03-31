import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StartProjectDialogProps = {
  trigger: React.ReactNode;
};

const projectTypes = [
  "Business Website",
  "Landing Page",
  "E-commerce Store",
  "AI Automation",
  "Marketing Campaign",
  "Custom Project",
];

const StartProjectDialog = ({ trigger }: StartProjectDialogProps) => {
  const abortRef = useRef<AbortController | null>(null);
  const [open, setOpen] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    website: "",
  });

  const isValid = useMemo(() => {
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.projectType.trim() &&
      form.description.trim()
    );
  }, [form]);

  const updateField = (key: keyof typeof form, value: string) => {
    setErrorMessage("");
    setSuccessMessage("");
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!isValid || isLaunching) return;

    setIsLaunching(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 450));

      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch("/api/start-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          projectType: form.projectType,
          description: form.description,
          website: form.website,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Unable to send request");
      }

      setSuccessMessage("Project request sent successfully.");
      setForm({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        description: "",
        website: "",
      });

      window.setTimeout(() => {
        setOpen(false);
      }, 900);
    } catch (error) {
      const message =
        error instanceof Error && error.name === "AbortError"
          ? "Request cancelled."
          : error instanceof Error
            ? error.message
            : "Unable to send request";
      setErrorMessage(message);
    } finally {
      abortRef.current = null;
      setIsLaunching(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      abortRef.current?.abort();
      setIsLaunching(false);
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    if (!open) {
      setIsLaunching(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl border-white/10 bg-slate-950/95 text-white backdrop-blur-2xl">
        <DialogHeader className="space-y-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100/80">
            <Rocket className="h-3.5 w-3.5" />
            Start Project
          </div>
          <DialogTitle className="heading-display text-3xl text-white">
            Launch your project request
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-slate-300">
            Share the basics and send your request directly from the site.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 pt-2 md:grid-cols-2">
          <label className="hidden">
            Website
            <Input
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Name
            <Input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your full name"
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-400"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Email
            <Input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-400"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Number
            <Input
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="Enter your phone number"
              autoComplete="tel"
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-400"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Type of project
            <Select value={form.projectType} onValueChange={(value) => updateField("projectType", value)}>
              <SelectTrigger className="h-12 border-white/10 bg-white/5 text-white">
                <SelectValue placeholder="Choose a project type" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-950 text-white">
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type} className="focus:bg-white/10 focus:text-white">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-200 md:col-span-2">
            Description
            <Textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Tell us about your business, goals, pages, features, timeline, or anything important."
              className="min-h-[140px] border-white/10 bg-white/5 text-white placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Your details are sent directly through the project form.
          </p>

          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isLaunching}
            animate={isLaunching ? { y: -46, scale: 1.08 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-[0_0_32px_-10px_hsl(var(--primary)/0.75)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <motion.span
              animate={isLaunching ? { y: -16, rotate: 14 } : { y: [3, -7, 3], rotate: [-8, 0, 8, 0] }}
              transition={
                isLaunching
                  ? { duration: 0.45, ease: "easeOut" }
                  : { duration: 1.7, repeat: Infinity, ease: "easeInOut" }
              }
              className="inline-flex"
            >
              <Rocket className="h-5 w-5" />
            </motion.span>
            {isLaunching ? "Launching request..." : "Start Project"}
          </motion.button>
        </div>

        {errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
        {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}
        {!successMessage ? (
          <p className="text-sm text-slate-500">
            Your request is sent through the site backend.
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default StartProjectDialog;
