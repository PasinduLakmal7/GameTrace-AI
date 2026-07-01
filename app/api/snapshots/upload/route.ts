import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const sessionId = String(formData.get("sessionId") || "unknown-session")
    const snapshotType = String(formData.get("snapshotType") || "snapshot")
    const eventTime = String(formData.get("eventTime") || "0")

    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Snapshot image file is required" },
        { status: 400 }
      )
    }

    const safeSessionId = sessionId.replace(/[^a-zA-Z0-9_-]/g, "_")
    const safeSnapshotType = snapshotType.replace(/[^a-zA-Z0-9_-]/g, "_")
    const safeEventTime = eventTime.replace(/[^0-9.]/g, "_").replace(".", "_")

    const fileName = `traceforge/${safeSessionId}/${safeSnapshotType}_event_${safeEventTime}.jpg`

    const blob = await put(fileName, file, { 
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return NextResponse.json({
      screenshotUrl: blob.url,
    })
  } catch (error) {
    console.error("Snapshot upload failed:", error)

    return NextResponse.json(
      { error: "Snapshot upload failed" },
      { status: 500 }
    )
  }
}