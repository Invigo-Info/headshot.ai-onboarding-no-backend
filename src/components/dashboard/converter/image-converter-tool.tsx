"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ImageUp,
  Download,
  RefreshCw,
  X,
  FileImage,
  ArrowLeft,
  CheckCircle2,
  ArrowRightLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FORMAT_MAP } from "@/data/image-formats";
import DashboardFormatSelector from "./dashboard-format-selector";

type ConversionState = "idle" | "uploading" | "converting" | "done";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageConverterTool() {
  const searchParams = useSearchParams();

  const [inputFormat, setInputFormat] = useState(
    searchParams.get("input") || "jpg"
  );
  const [outputFormat, setOutputFormat] = useState(
    searchParams.get("output") || "png"
  );
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<ConversionState>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [convertedFileName, setConvertedFileName] = useState<string | null>(
    null
  );

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (state !== "idle") return;
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    [state]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    disabled: state !== "idle",
    onDropRejected: (rejections) => {
      if (rejections[0]?.errors[0]?.message) {
        toast.error(rejections[0].errors[0].message);
      }
    },
  });

  const handleConvert = async () => {
    if (!file || inputFormat === outputFormat) return;

    setState("uploading");

    try {
      // Step 1: Create the CloudConvert job
      const createRes = await fetch("/api/convert-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputFormat,
          outputFormat,
          fileName: file.name,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.error || "Failed to create conversion job");
      }

      const { jobId, uploadUrl, uploadParameters } = await createRes.json();

      // Step 2: Upload file directly to CloudConvert
      const formData = new FormData();
      Object.entries(uploadParameters).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      formData.append("file", file);

      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok && uploadRes.status !== 201) {
        throw new Error("Failed to upload file");
      }

      // Step 3: Poll for completion
      setState("converting");
      pollStartRef.current = Date.now();

      pollIntervalRef.current = setInterval(async () => {
        try {
          // 2-minute timeout
          if (Date.now() - pollStartRef.current > 120_000) {
            cleanup();
            toast.error("Conversion timed out. Please try again.");
            resetState();
            return;
          }

          const statusRes = await fetch(
            `/api/convert-image?jobId=${jobId}`
          );
          if (!statusRes.ok) {
            throw new Error("Failed to check status");
          }

          const result = await statusRes.json();

          if (result.status === "finished") {
            cleanup();
            setDownloadUrl(result.downloadUrl);
            setConvertedFileName(result.fileName);
            setState("done");
          } else if (result.status === "error") {
            cleanup();
            toast.error(result.message || "Conversion failed");
            resetState();
          }
        } catch {
          cleanup();
          toast.error("Failed to check conversion status");
          resetState();
        }
      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
      resetState();
    }
  };

  const resetState = () => {
    cleanup();
    setFile(null);
    setState("idle");
    setDownloadUrl(null);
    setConvertedFileName(null);
  };

  const handleDownload = () => {
    if (!downloadUrl) return;

    // Open CloudConvert's download URL directly — it sets Content-Disposition: attachment
    window.open(downloadUrl, "_blank");
  };

  const inputLabel = FORMAT_MAP[inputFormat]?.label ?? inputFormat.toUpperCase();
  const outputLabel =
    FORMAT_MAP[outputFormat]?.label ?? outputFormat.toUpperCase();
  const isSameFormat = inputFormat === outputFormat;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 flex flex-col ">
        {/* Back link */}
        {/* <Link
          href="/editor"
          className="font-open mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Editor
        </Link> */}

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5">
            <ArrowRightLeft className="h-3.5 w-3.5 text-indigo-600" />
            <span className="font-mont text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Image Converter
            </span>
          </div>
          <h1 className="font-mont mb-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Convert {inputLabel} to {outputLabel}
          </h1>
          <p className="font-open mx-auto max-w-lg text-sm text-gray-500">
            Select your formats, drop your image, and download the converted
            file. Free and instant.
          </p>
        </div>

        {/* Format selector */}
        <div className="mb-8 flex justify-center">
          <DashboardFormatSelector
            inputFormat={inputFormat}
            outputFormat={outputFormat}
            onInputChange={setInputFormat}
            onOutputChange={setOutputFormat}
            disabled={state !== "idle"}
          />
        </div>

        {/* Same format warning */}
        {isSameFormat && (
          <p className="font-open mb-4 text-center text-sm text-amber-600">
            Input and output formats are the same. Please select a different
            output format.
          </p>
        )}

        {/* Main area */}
        <AnimatePresence mode="wait">
          {/* Idle state - Upload */}
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {!file ? (
                <div
                  {...getRootProps()}
                  className={cn(
                    "group flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white px-6 py-16 transition-all duration-200 sm:min-h-[320px]",
                    isDragActive
                      ? "border-indigo-400 bg-indigo-50/50"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="relative mb-4">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                        isDragActive
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500"
                      )}
                    >
                      <ImageUp className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -bottom-0.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M6 2.5V9.5M2.5 6H9.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-mont mb-1.5 text-lg font-semibold text-gray-900">
                    {isDragActive ? "Drop your image here" : "Add Image"}
                  </h3>
                  <p className="font-open text-sm text-gray-400">
                    Drag & Drop or{" "}
                    <span className="font-medium text-indigo-600 underline underline-offset-2">
                      Browse
                    </span>
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  {/* File preview */}
                  <div className="mb-6 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                      <FileImage className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mont truncate text-sm font-semibold text-gray-900">
                        {file.name}
                      </p>
                      <p className="font-open text-xs text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Convert button */}
                  <Button
                    onClick={handleConvert}
                    disabled={isSameFormat}
                    className="h-12 w-full rounded-xl bg-indigo-600 font-mont text-base font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
                  >
                    <ArrowRightLeft className="h-4.5 w-4.5" />
                    Convert to {outputLabel}
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* Uploading / Converting state */}
          {(state === "uploading" || state === "converting") && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-gray-200 bg-white p-8"
            >
              <div className="flex flex-col items-center py-8">
                {/* Animated spinner */}
                <div className="relative mb-6">
                  <div className="h-16 w-16 rounded-full border-[3px] border-gray-100" />
                  <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-[3px] border-transparent border-t-indigo-600" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileImage className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>

                <h3 className="font-mont mb-2 text-lg font-semibold text-gray-900">
                  {state === "uploading"
                    ? "Uploading your image..."
                    : "Converting your image..."}
                </h3>
                <p className="font-open text-sm text-gray-400">
                  {state === "uploading"
                    ? "Securely uploading your file"
                    : `Converting ${inputLabel} to ${outputLabel}`}
                </p>

                {/* Progress dots */}
                <div className="mt-6 flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="h-2 w-2 rounded-full bg-indigo-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Done state */}
          {state === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-gray-200 bg-white p-8"
            >
              <div className="flex flex-col items-center py-4">
                {/* Success icon */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>

                <h3 className="font-mont mb-1 text-lg font-semibold text-gray-900">
                  Conversion Complete
                </h3>
                <p className="font-open mb-6 text-sm text-gray-400">
                  Your file has been converted to {outputLabel}
                </p>

                {/* Converted file card */}
                {convertedFileName && (
                  <div className="mb-6 w-full max-w-sm rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                        <FileImage className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mont truncate text-sm font-semibold text-gray-900">
                          {convertedFileName}
                        </p>
                        <p className="font-open text-xs text-gray-400">
                          Ready to download
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex w-full max-w-sm flex-col gap-3">
                  <Button
                    onClick={handleDownload}
                    className="h-12 w-full rounded-xl bg-indigo-600 font-mont text-base font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
                  >
                    <Download className="h-4.5 w-4.5" />
                    Download {outputLabel}
                  </Button>
                  <Button
                    onClick={resetState}
                    variant="outline"
                    className="h-11 w-full rounded-xl font-mont text-sm font-semibold"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Convert Another Image
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button asChild className="mt-6 mx-auto" variant={"outline"}>
          <Link
          href="/editor"
          className="font-open inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Editor
        </Link>
        </Button>
      </div>
    </div>
  );
}
