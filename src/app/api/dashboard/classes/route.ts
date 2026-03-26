import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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
        const canManage = dashboardRole === "ADMIN";

        // Get all classes with details
        const classes = await prisma.class.findMany({
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
                students: {
                    select: {
                        id: true,
                    }
                },
            },
            orderBy: [
                { grade: { level: "asc" } },
                { name: "asc" },
            ],
        });

        // Get all grades for dropdown
        const grades = await prisma.grade.findMany({
            select: {
                id: true,
                name: true,
                level: true,
            },
            orderBy: {
                level: "asc",
            }
        });

        // Get all teachers for dropdown
        const teachers = await prisma.teacher.findMany({
            select: {
                id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                user: {
                    name: "asc",
                }
            }
        });

        return NextResponse.json({
            classes,
            grades,
            teachers,
            canManage,
        });
    } catch (error) {
        console.error("Failed to fetch classes:", error);
        return NextResponse.json(
            { error: "Failed to fetch classes" },
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
        const canManage = dashboardRole === "ADMIN";

        if (!canManage) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const { name, section, gradeId, teacherId, roomNumber, capacity, academicYearId } = body;

        // Validation
        if (!name || !gradeId) {
            return NextResponse.json(
                { error: "Class name and grade are required" },
                { status: 400 }
            );
        }

        // Verify grade exists
        const grade = await prisma.grade.findUnique({
            where: { id: gradeId },
        });

        if (!grade) {
            return NextResponse.json(
                { error: "Grade not found" },
                { status: 404 }
            );
        }

        // Get current academic year if not provided
        let finalAcademicYearId = academicYearId;
        if (!finalAcademicYearId) {
            const currentYear = await prisma.academicYear.findFirst({
                where: { isCurrent: true },
            });
            finalAcademicYearId = currentYear?.id;
        }

        // Create class
        const newClass = await prisma.class.create({
            data: {
                name,
                section: section?.trim() || null,
                gradeId,
                academicYearId: finalAcademicYearId!,
                teacherId: teacherId || null,
                roomNumber: roomNumber?.trim() || null,
                capacity: capacity !== undefined && capacity !== null ? parseInt(capacity, 10) : null,
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
            message: "Class created successfully",
            class: newClass,
        });
    } catch (error) {
        console.error("Failed to create class:", error);
        return NextResponse.json(
            { error: "Failed to create class" },
            { status: 500 }
        );
    }
}
