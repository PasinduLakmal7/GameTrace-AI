import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sessions, events, snapshots } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    console.log("Received session payload:", {
      sessionId: body.sessionId,
      eventsCount: Array.isArray(body.events) ? body.events.length : typeof body.events,
      snapshotsCount: Array.isArray(body.snapshots) ? body.snapshots.length : typeof body.snapshots
    });

    await db.insert(sessions).values({
      sessionId: body.sessionId,
      projectId: body.projectId,
      playerName: body.playerName,
      status: body.status,
      gameVersion: body.gameVersion,
      platform: body.platform,
      deviceModel: body.deviceModel,
      deviceName: body.deviceName,
      operatingSystem: body.operatingSystem,
      processorType: body.processorType,
      processorCount: body.processorCount,
      systemMemorySize: body.systemMemorySize,
      graphicsDeviceName: body.graphicsDeviceName,
      graphicsMemorySize: body.graphicsMemorySize,
      screenResolution: body.screenResolution,
      finalScore: body.finalScore,
      duration: body.duration,
    })

    if (Array.isArray(body.events) && body.events.length > 0) {
      await db.insert(events).values(
        body.events.map((event: any) => ({
          sessionId: body.sessionId,
          eventTime: event.time,
          eventType: event.type,
          x: event.x,
          y: event.y,
          z: event.z,
          score: event.score,
          value: event.value ?? "",
          metadata: event.metadata ?? null,
          screenshotUrl: event.screenshotUrl || null,
        }))
      )
    }

    if (Array.isArray(body.snapshots) && body.snapshots.length > 0) {
      await db.insert(snapshots).values(
        body.snapshots.map((snapshot: any) => ({
          sessionId: body.sessionId,
          frameTime: snapshot.time,
          frameIndex: snapshot.frameIndex,
          screenshotUrl: snapshot.screenshotUrl,
          x: snapshot.x,
          y: snapshot.y,
          z: snapshot.z,
          score: snapshot.score,
        }))
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Session upload error:", error)
    return NextResponse.json({ error: "Failed to upload session" }, { status: 500 })
  }
}
