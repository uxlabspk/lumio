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
        const { teacherId, classId } = body;

        if (!teacherId || !classId) {
            return NextResponse.json(
                { error: "Teacher ID and class ID are required" },
                { status: 400 }
            );
        }

        // Verify teacher exists
        const teacher = await prisma.teacher.findUnique({
            where: { id: teacherId },
            select: { id: true, userId: true },
        });

        if (!teacher) {
            return NextResponse.json(
                { error: "Teacher not found" },
                { status: 404 }
            );
        }

        // Verify class exists
        const classData = await prisma.class.findUnique({
            where: { id: classId },
            select: { id: true, name: true, section: true },
        });

        if (!classData) {
            return NextResponse.json(
                { error: "Class not found" },
                { status: 404 }
            );
        }

        // Assign teacher as class teacher
        const updatedClass = await prisma.class.update({
            where: { id: classId },
            data: {
                teacherId: teacherId,
            },
            include: {
                teacher: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            message: "Teacher assigned to class successfully",
            class: updatedClass,
        });
    } catch (error) {
        console.error("Failed to assign teacher to class:", error);
        return NextResponse.json(
            { error: "Failed to assign teacher to class" },
            { status: 500 }
        );
    }
}
