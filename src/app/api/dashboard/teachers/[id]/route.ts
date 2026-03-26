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

        const teacher = await prisma.teacher.findUnique({
            where: { id: params.id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        phone: true,
                        isActive: true,
                    },
                },
                classTeacher: {
                    select: {
                        id: true,
                        name: true,
                        section: true,
                        grade: {
                            select: {
                                name: true,
                                level: true,
                            }
                        },
                    },
                },
                schedules: {
                    include: {
                        subject: {
                            select: {
                                name: true,
                                code: true,
                            }
                        },
                        class: {
                            select: {
                                name: true,
                                section: true,
                            }
                        },
                    },
                },
                assignments: {
                    include: {
                        subject: {
                            select: {
                                name: true,
                            }
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 5,
                },
                exams: {
                    include: {
                        subject: {
                            select: {
                                name: true,
                            }
                        },
                        class: {
                            select: {
                                name: true,
                                section: true,
                            }
                        },
                    },
                    orderBy: {
                        examDate: "desc",
                    },
                    take: 5,
                },
            },
        });

        if (!teacher) {
            return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
        }

        return NextResponse.json({
            teacher,
            canManage,
        });
    } catch (error) {
        console.error("Failed to fetch teacher:", error);
        return NextResponse.json(
            { error: "Failed to fetch teacher" },
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
        const {
            department,
            qualification,
            specialization,
            phone,
        } = body;

        const teacher = await prisma.$transaction(async (tx) => {
            // Update teacher profile
            const updatedTeacher = await tx.teacher.update({
                where: { id: params.id },
                data: {
                    department: department || null,
                    qualification: qualification || null,
                    specialization: specialization || null,
                },
            });

            // Update user phone if provided
            if (phone !== undefined) {
                await tx.user.update({
                    where: { id: updatedTeacher.userId },
                    data: {
                        phone: phone || null,
                    },
                });
            }

            return updatedTeacher;
        });

        return NextResponse.json({
            message: "Teacher updated successfully",
            teacher,
        });
    } catch (error) {
        console.error("Failed to update teacher:", error);
        return NextResponse.json(
            { error: "Failed to update teacher" },
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

        await prisma.$transaction(async (tx) => {
            // First delete the teacher record (this will cascade to related records)
            await tx.teacher.delete({
                where: { id: params.id },
            });

            // Then delete the user account
            const teacher = await tx.teacher.findUnique({
                where: { id: params.id },
                select: { userId: true },
            });

            if (teacher) {
                await tx.user.delete({
                    where: { id: teacher.userId },
                });
            }
        });

        return NextResponse.json({
            message: "Teacher deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete teacher:", error);
        return NextResponse.json(
            { error: "Failed to delete teacher" },
            { status: 500 }
        );
    }
}
