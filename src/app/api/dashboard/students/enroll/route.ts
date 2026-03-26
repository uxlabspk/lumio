import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveDashboardRole } from "@/lib/roles";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dashboardRole = resolveDashboardRole(session.user.role);
        const canManage = dashboardRole === "ADMIN";

        if (!canManage) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const { studentId, classId } = body;

        if (!studentId || !classId) {
            return NextResponse.json(
                { error: "Student ID and Class ID are required" },
                { status: 400 }
            );
        }

        // Verify student exists
        const student = await prisma.student.findUnique({
            where: { id: studentId },
        });

        if (!student) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        // Verify class exists
        const classroom = await prisma.class.findUnique({
            where: { id: classId },
        });

        if (!classroom) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        // Update student's class assignment
        await prisma.student.update({
            where: { id: studentId },
            data: { classId },
        });

        return NextResponse.json({
            message: "Student enrolled successfully",
            studentId,
            classId,
        });
    } catch (error) {
        console.error("Failed to enroll student:", error);
        return NextResponse.json(
            { error: "Failed to enroll student" },
            { status: 500 }
        );
    }
}
