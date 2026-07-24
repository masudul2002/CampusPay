"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, XCircle, FileText, Image as ImageIcon, RefreshCcw } from "lucide-react";
import { Button } from "./button";

interface FileUploaderProps {
  onFileSelect?: (file: File) => void;
  acceptTypes?: string;
  maxSizeMB?: number;
}

export function FileUploader({
  onFileSelect,
  acceptTypes = "image/png, image/jpeg, image/webp, application/pdf",
  maxSizeMB = 5,
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds maximum limit of ${maxSizeMB}MB`);
      return;
    }

    setSelectedFile(file);
    onFileSelect?.(file);

    // Create preview if image
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    // Progress bar animation simulation
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 100);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
          <XCircle className="w-4 h-4 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center space-y-3 ${
            dragActive
              ? "border-brand-accent bg-brand-primary/20 shadow-glow"
              : "border-white/10 bg-zinc-950/60 hover:border-brand-secondary/40 hover:bg-white/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptTypes}
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 border border-brand-accent/30 text-brand-accent flex items-center justify-center">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div>
            <p className="text-sm font-bold font-heading text-white">
              Drag & Drop Proof of Payment Image
            </p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Supports PNG, JPG, WEBP or PDF (Max {maxSizeMB}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Proof Preview"
                  className="w-12 h-12 rounded-xl object-cover border border-white/10"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-zinc-300">
                  <FileText className="w-6 h-6" />
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-white font-mono truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] text-zinc-400 font-mono">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={clearFile}
              type="button"
              className="p-1.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-300"
              />
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold block text-right">
              {progress === 100 ? "Ready for submission" : `Uploading ${progress}%`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
