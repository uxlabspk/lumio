import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { SubmissionStatus } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveDashboardRole } from "@/lib/roles";

export async function POST(
  request: Request,
  context: { params: Promise<{ assignmentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dashboardRole = resolveDashboardRole(session.user.role);

    if (dashboardRole !== "STUDENT") {
      return NextResponse.json(
        { error: "Only students can submit tasks." },
        { status: 403 }
      );
    }

    const { assignmentId } = await context.params;

    if (!assignmentId) {
      return NextResponse.json(
        { error: "Assignment id is required." },
        { status: 400 }
      );
    }

    const body = (await request.json()) as { fileUrl?: string; note?: string };
    const fileUrl = body.fileUrl?.trim() || null;
    const note = body.note?.trim() || null;

    if (!fileUrl && !note) {
      return NextResponse.json(
        { error: "Please provide either a file URL or a note." },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student profile not found." },
        { status: 404 }
      );
    }

    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { id: true },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found." },
        { status: 404 }
      );
    }

    const submission = await prisma.submission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: student.id,
        },
      },
      update: {
        fileUrl,
        feedback: note,
        status: SubmissionStatus.SUBMITTED,
        submittedAt: new Date(),
      },
      create: {
        assignmentId,
        studentId: student.id,
        fileUrl,
        feedback: note,
        status: SubmissionStatus.SUBMITTED,
        submittedAt: new Date(),
      },
      select: {
        id: true,
        status: true,
        submittedAt: true,
        fileUrl: true,
        feedback: true,
      },
    });

    return NextResponse.json({
      message: "Task submitted successfully.",
      submission,
    });
  } catch (error) {
    console.error("Failed to submit task", error);
    return NextResponse.json(
      { error: "Unable to submit task right now." },
      { status: 500 }
    );
  }
}
