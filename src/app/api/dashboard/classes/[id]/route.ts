import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveDashboardRole } from "@/lib/roles";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dashboardRole = resolveDashboardRole(session.user.role);
        const canManage = dashboardRole === "ADMIN";

        const classData = await prisma.class.findUnique({
            where: { id: params.id },
            include: {
                grade: {
                    select: {
                        name: true,
                        level: true,
                    }
                },
                teacher: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                                phone: true,
                            }
                        }
                    }
                },
                students: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            }
                        }
                    }
                },
                schedules: {
                    include: {
                        subject: {
                            select: {
                                name: true,
                                code: true,
                            }
                        }
                    }
                },
                exams: {
                    include: {
                        subject: {
                            select: {
                                name: true,
                            }
                        }
                    },
                    orderBy: {
                        examDate: "desc",
                    },
                    take: 5,
                }
            },
        });

        if (!classData) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        return NextResponse.json({
            class: classData,
            canManage,
        });
    } catch (error) {
        console.error("Failed to fetch class:", error);
        return NextResponse.json(
            { error: "Failed to fetch class" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
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
        const { name, section, gradeId, teacherId, roomNumber, capacity } = body;

        // Verify class exists
        const existingClass = await prisma.class.findUnique({
            where: { id: params.id },
        });

        if (!existingClass) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        // Verify grade exists if provided
        if (gradeId) {
            const grade = await prisma.grade.findUnique({
                where: { id: gradeId },
            });

            if (!grade) {
                return NextResponse.json({ error: "Grade not found" }, { status: 404 });
            }
        }

        // Update class
        const updatedClass = await prisma.class.update({
            where: { id: params.id },
            data: {
                name: name || undefined,
                section: section?.trim() || null,
                gradeId: gradeId || undefined,
                teacherId: teacherId || null,
                roomNumber: roomNumber?.trim() || null,
                capacity: capacity !== undefined ? parseInt(capacity, 10) : undefined,
            },
            include: {
                grade: {
                    select: {
                        name: true,
                        level: true,
                    }
                },
                teacher: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            }
                        }
                    }
                },
            }
        });

        return NextResponse.json({
            message: "Class updated successfully",
            class: updatedClass,
        });
    } catch (error) {
        console.error("Failed to update class:", error);
        return NextResponse.json(
            { error: "Failed to update class" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
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

        // Verify class exists
        const existingClass = await prisma.class.findUnique({
            where: { id: params.id },
            include: {
                students: true,
            }
        });

        if (!existingClass) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        // Check if class has students
        if (existingClass.students.length > 0) {
            return NextResponse.json(
                { error: `Cannot delete class with ${existingClass.students.length} enrolled student(s). Please unenroll all students first.` },
                { status: 400 }
            );
        }

        // Delete class
        await prisma.class.delete({
            where: { id: params.id },
        });

        return NextResponse.json({
            message: "Class deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete class:", error);
        return NextResponse.json(
            { error: "Failed to delete class" },
            { status: 500 }
        );
    }
}
