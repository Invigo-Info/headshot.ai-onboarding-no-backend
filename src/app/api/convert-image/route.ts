import { NextRequest } from "next/server";
import CloudConvert from "cloudconvert";
import { createClient } from "@/lib/supabase/server";
import { FORMAT_MAP } from "@/data/image-formats";

export const maxDuration = 60;

const cloudConvert = new CloudConvert(
  process.env.CLOUD_CONVERT_API_TOKEN!
);

/**
 * POST — Create a CloudConvert job with import/upload → convert → export/url.
 * Returns the presigned upload URL so the client uploads directly to CloudConvert.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    if (!data?.claims?.sub) {
      return Response.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { inputFormat, outputFormat } = await req.json();

    if (
      !inputFormat ||
      !outputFormat ||
      !FORMAT_MAP[inputFormat] ||
      !FORMAT_MAP[outputFormat]
    ) {
      return Response.json(
        { error: "Invalid input or output format" },
        { status: 400 }
      );
    }

    if (inputFormat === outputFormat) {
      return Response.json(
        { error: "Input and output formats must be different" },
        { status: 400 }
      );
    }

    const job = await cloudConvert.jobs.create({
      tasks: {
        "import-file": {
          operation: "import/upload",
        },
        "convert-file": {
          operation: "convert",
          input: ["import-file"],
          input_format: inputFormat,
          output_format: outputFormat,
        },
        "export-file": {
          operation: "export/url",
          input: ["convert-file"],
        },
      },
    });

    const uploadTask = job.tasks.find((t) => t.name === "import-file");

    if (!uploadTask?.result?.form) {
      return Response.json(
        { error: "Failed to create upload task" },
        { status: 500 }
      );
    }

    return Response.json({
      jobId: job.id,
      uploadUrl: uploadTask.result.form.url,
      uploadParameters: uploadTask.result.form.parameters,
    });
  } catch (error) {
    console.error("Convert image POST error:", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create conversion job",
      },
      { status: 500 }
    );
  }
}

/**
 * GET — Poll a CloudConvert job for status and download URL.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    if (!data?.claims?.sub) {
      return Response.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const jobId = req.nextUrl.searchParams.get("jobId");
    if (!jobId) {
      return Response.json(
        { error: "jobId is required" },
        { status: 400 }
      );
    }

    const job = await cloudConvert.jobs.get(jobId);

    if (job.status === "error") {
      const failedTask = job.tasks.find((t) => t.status === "error");
      return Response.json({
        status: "error",
        message: failedTask?.message || "Conversion failed",
      });
    }

    if (job.status === "finished") {
      const exportUrls = cloudConvert.jobs.getExportUrls(job);
      if (exportUrls.length > 0) {
        return Response.json({
          status: "finished",
          downloadUrl: exportUrls[0].url,
          fileName: exportUrls[0].filename,
        });
      }
    }

    return Response.json({ status: "processing" });
  } catch (error) {
    console.error("Convert image GET error:", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to check job status",
      },
      { status: 500 }
    );
  }
}
