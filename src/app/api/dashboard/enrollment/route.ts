import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { SubmissionStatus } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveDashboardRole } from "@/lib/roles";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dashboardRole = resolveDashboardRole(session.user.role);

    if (dashboardRole === "STUDENT") {
      return NextResponse.json(
        { error: "Students cannot access enrollment management." },
        { status: 403 }
      );
    }

    if (dashboardRole === "TEACHER") {
      const teacher = await prisma.teacher.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });

      if (!teacher) {
        return NextResponse.json({
          role: dashboardRole,
          canManage: false,
          classes: [],
          students: [],
        });
      }

      const classes = await prisma.class.findMany({
        where: { teacherId: teacher.id },
        select: {
          id: true,
          name: true,
          section: true,
          _count: { select: { students: true } },
        },
        orderBy: [{ name: "asc" }, { section: "asc" }],
      });

      const classIds = classes.map((item) => item.id);

      const students = await prisma.student.findMany({
        where: { classId: { in: classIds } },
        select: {
          id: true,
          studentId: true,
          status: true,
          user: { select: { name: true, email: true } },
          class: { select: { id: true, name: true, section: true } },
        },
        orderBy: { user: { name: "asc" } },
      });

      return NextResponse.json({
        role: dashboardRole,
        canManage: false,
        classes,
        students,
      });
    }

    const classes = await prisma.class.findMany({
      select: {
        id: true,
        name: true,
        section: true,
        _count: { select: { students: true } },
      },
      orderBy: [{ name: "asc" }, { section: "asc" }],
    });

    const students = await prisma.student.findMany({
      select: {
        id: true,
        studentId: true,
        status: true,
        user: { select: { name: true, email: true } },
        class: { select: { id: true, name: true, section: true } },
      },
      orderBy: { user: { name: "asc" } },
    });

    return NextResponse.json({
      role: dashboardRole,
      canManage: true,
      classes,
      students,
    });
  } catch (error) {
    console.error("Failed to fetch enrollment data", error);
    return NextResponse.json(
      { error: "Unable to fetch enrollment data right now." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dashboardRole = resolveDashboardRole(session.user.role);

    if (dashboardRole !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can enroll students in classes." },
        { status: 403 }
      );
    }

    const body = (await request.json()) as {
      studentId?: string;
      classId?: string;
    };

    const studentId = body.studentId?.trim();
    const classId = body.classId?.trim();

    if (!studentId || !classId) {
      return NextResponse.json(
        { error: "Student and class are required." },
        { status: 400 }
      );
    }

    const [student, classroom] = await Promise.all([
      prisma.student.findUnique({
        where: { id: studentId },
        select: { id: true, classId: true },
      }),
      prisma.class.findUnique({
        where: { id: classId },
        select: { id: true },
      }),
    ]);

    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    if (!classroom) {
      return NextResponse.json({ error: "Class not found." }, { status: 404 });
    }

    const assignmentTargets = await prisma.assignment.findMany({
      where: {
        submissions: {
          some: {
            student: { classId },
          },
        },
      },
      select: { id: true },
    });

    await prisma.$transaction(async (tx) => {
      await tx.student.update({
        where: { id: studentId },
        data: { classId },
      });

      if (assignmentTargets.length > 0) {
        await tx.submission.createMany({
          data: assignmentTargets.map((assignment) => ({
            assignmentId: assignment.id,
            studentId,
            status: SubmissionStatus.NOT_SUBMITTED,
          })),
          skipDuplicates: true,
        });
      }
    });

    return NextResponse.json({
      message: "Student enrolled successfully.",
    });
  } catch (error) {
    console.error("Failed to enroll student", error);
    return NextResponse.json(
      { error: "Unable to enroll student right now." },
      { status: 500 }
    );
  }
}
