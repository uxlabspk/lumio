import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AssignmentStatus, SubmissionStatus } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveDashboardRole } from "@/lib/roles";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dashboardRole = resolveDashboardRole(session.user.role);
    const searchParams = new URL(request.url).searchParams;
    const query = searchParams.get("q")?.trim().toLowerCase();

    const subjects = await prisma.subject.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    let classes: Array<{ id: string; name: string; section: string | null }> = [];

    if (dashboardRole === "TEACHER") {
      const teacher = await prisma.teacher.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });

      if (!teacher) {
        return NextResponse.json({
          role: dashboardRole,
          canCreate: false,
          assignments: [],
          subjects,
          classes: [],
        });
      }

      classes = await prisma.class.findMany({
        where: { teacherId: teacher.id },
        select: { id: true, name: true, section: true },
        orderBy: [{ name: "asc" }, { section: "asc" }],
      });

      const assignments = await prisma.assignment.findMany({
        where: {
          teacherId: teacher.id,
          ...(query
            ? {
                OR: [
                  { title: { contains: query, mode: "insensitive" } },
                  { subject: { name: { contains: query, mode: "insensitive" } } },
                ],
              }
            : {}),
        },
        include: {
          subject: { select: { name: true } },
          teacher: { include: { user: { select: { name: true } } } },
          submissions: {
            select: {
              id: true,
              status: true,
              studentId: true,
              fileUrl: true,
              feedback: true,
              submittedAt: true,
              student: { select: { class: { select: { id: true, name: true, section: true } } } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        role: dashboardRole,
        canCreate: true,
        assignments: assignments.map((assignment) => {
          const classNames = Array.from(
            new Set(
              assignment.submissions
                .map((submission) => {
                  const classData = submission.student.class;
                  if (!classData) return null;
                  return `${classData.name}${classData.section ? ` ${classData.section}` : ""}`;
                })
                .filter((value): value is string => Boolean(value))
            )
          );

          return {
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            subjectName: assignment.subject.name,
            dueDate: assignment.dueDate,
            status: assignment.status,
            teacherName: assignment.teacher.user.name,
            classNames,
            totalStudents: assignment.submissions.length,
            submittedCount: assignment.submissions.filter((submission) => submission.status !== SubmissionStatus.NOT_SUBMITTED).length,
          };
        }),
        subjects,
        classes,
      });
    }

    if (dashboardRole === "STUDENT") {
      const student = await prisma.student.findUnique({
        where: { userId: session.user.id },
        select: { id: true, classId: true },
      });

      if (!student?.classId) {
        return NextResponse.json({
          role: dashboardRole,
          canCreate: false,
          assignments: [],
          subjects,
          classes: [],
        });
      }

      const assignments = await prisma.assignment.findMany({
        where: {
          submissions: {
            some: {
              student: { classId: student.classId },
            },
          },
          ...(query
            ? {
                OR: [
                  { title: { contains: query, mode: "insensitive" } },
                  { subject: { name: { contains: query, mode: "insensitive" } } },
                ],
              }
            : {}),
        },
        include: {
          subject: { select: { name: true } },
          teacher: { include: { user: { select: { name: true } } } },
          submissions: {
            select: {
              id: true,
              status: true,
              studentId: true,
              fileUrl: true,
              feedback: true,
              submittedAt: true,
              student: { select: { class: { select: { id: true, name: true, section: true } } } },
            },
          },
        },
        orderBy: { dueDate: "asc" },
      });

      return NextResponse.json({
        role: dashboardRole,
        canCreate: false,
        assignments: assignments.map((assignment) => {
          const classNames = Array.from(
            new Set(
              assignment.submissions
                .map((submission) => {
                  const classData = submission.student.class;
                  if (!classData) return null;
                  return `${classData.name}${classData.section ? ` ${classData.section}` : ""}`;
                })
                .filter((value): value is string => Boolean(value))
            )
          );

          const mySubmission = assignment.submissions.find((submission) => submission.studentId === student.id);

          return {
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            subjectName: assignment.subject.name,
            dueDate: assignment.dueDate,
            status: assignment.status,
            teacherName: assignment.teacher.user.name,
            classNames,
            totalStudents: assignment.submissions.length,
            submittedCount: assignment.submissions.filter((submission) => submission.status !== SubmissionStatus.NOT_SUBMITTED).length,
            mySubmission: mySubmission
              ? {
                  id: mySubmission.id,
                  status: mySubmission.status,
                  submittedAt: mySubmission.submittedAt,
                  fileUrl: mySubmission.fileUrl,
                  note: mySubmission.feedback,
                }
              : null,
          };
        }),
        subjects,
        classes: [],
      });
    }

    classes = await prisma.class.findMany({
      select: { id: true, name: true, section: true },
      orderBy: [{ name: "asc" }, { section: "asc" }],
    });

    const assignments = await prisma.assignment.findMany({
      where: query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { subject: { name: { contains: query, mode: "insensitive" } } },
            ],
          }
        : undefined,
      include: {
        subject: { select: { name: true } },
        teacher: { include: { user: { select: { name: true } } } },
        submissions: {
          select: {
            status: true,
            student: { select: { class: { select: { id: true, name: true, section: true } } } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      role: dashboardRole,
      canCreate: true,
      assignments: assignments.map((assignment) => {
        const classNames = Array.from(
          new Set(
            assignment.submissions
              .map((submission) => {
                const classData = submission.student.class;
                if (!classData) return null;
                return `${classData.name}${classData.section ? ` ${classData.section}` : ""}`;
              })
              .filter((value): value is string => Boolean(value))
          )
        );

        return {
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          subjectName: assignment.subject.name,
          dueDate: assignment.dueDate,
          status: assignment.status,
          teacherName: assignment.teacher.user.name,
          classNames,
          totalStudents: assignment.submissions.length,
          submittedCount: assignment.submissions.filter((submission) => submission.status !== SubmissionStatus.NOT_SUBMITTED).length,
        };
      }),
      subjects,
      classes,
    });
  } catch (error) {
    console.error("Failed to fetch assignments", error);
    return NextResponse.json(
      { error: "Unable to fetch assignments right now." },
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

    if (dashboardRole === "STUDENT") {
      return NextResponse.json(
        { error: "Students cannot create assignments." },
        { status: 403 }
      );
    }

    const body = (await request.json()) as {
      title?: string;
      description?: string;
      subjectId?: string;
      classId?: string;
      dueDate?: string;
      teacherId?: string;
      status?: AssignmentStatus;
    };

    const title = body.title?.trim();
    const subjectId = body.subjectId?.trim();
    const classId = body.classId?.trim();
    const dueDateString = body.dueDate?.trim();

    if (!title || !subjectId || !classId || !dueDateString) {
      return NextResponse.json(
        { error: "Title, subject, class, and due date are required." },
        { status: 400 }
      );
    }

    const dueDate = new Date(dueDateString);

    if (Number.isNaN(dueDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid due date." },
        { status: 400 }
      );
    }

    const classroom = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        students: { select: { id: true } },
      },
    });

    if (!classroom) {
      return NextResponse.json({ error: "Class not found." }, { status: 404 });
    }

    let teacherId = body.teacherId?.trim();

    if (dashboardRole === "TEACHER") {
      const teacher = await prisma.teacher.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });

      if (!teacher) {
        return NextResponse.json(
          { error: "Teacher profile not found." },
          { status: 404 }
        );
      }

      teacherId = teacher.id;
    }

    if (!teacherId && classroom.teacherId) {
      teacherId = classroom.teacherId;
    }

    if (!teacherId) {
      return NextResponse.json(
        { error: "Teacher is required for this assignment." },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description: body.description?.trim() || null,
        subjectId,
        teacherId,
        dueDate,
        status: body.status ?? AssignmentStatus.ACTIVE,
        submissions: {
          createMany: {
            data: classroom.students.map((student) => ({
              studentId: student.id,
              status: SubmissionStatus.NOT_SUBMITTED,
            })),
            skipDuplicates: true,
          },
        },
      },
      include: {
        subject: { select: { name: true } },
      },
    });

    return NextResponse.json({
      message: "Assignment created successfully.",
      assignment,
    });
  } catch (error) {
    console.error("Failed to create assignment", error);
    return NextResponse.json(
      { error: "Unable to create assignment right now." },
      { status: 500 }
    );
  }
}
