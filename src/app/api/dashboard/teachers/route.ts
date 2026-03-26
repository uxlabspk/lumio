import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveDashboardRole } from "@/lib/roles";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dashboardRole = resolveDashboardRole(session.user.role);
        const canManage = dashboardRole === "ADMIN";

        // Get all teachers with their details
        const teachers = await prisma.teacher.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        phone: true,
                    },
                },
                classTeacher: {
                    select: {
                        id: true,
                        name: true,
                        section: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Get all classes for assignment dropdown
        const classes = await prisma.class.findMany({
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
            orderBy: [
                { grade: { level: "asc" } },
                { name: "asc" },
            ],
        });

        return NextResponse.json({
            teachers,
            classes,
            canManage,
        });
    } catch (error) {
        console.error("Failed to fetch teachers:", error);
        return NextResponse.json(
            { error: "Failed to fetch teachers" },
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
        const {
            email,
            password,
            name,
            employeeId,
            department,
            qualification,
            specialization,
            joinDate,
            phone,
        } = body;

        // Validation
        if (!email || !password || !name || !employeeId) {
            return NextResponse.json(
                { error: "Email, password, name, and employee ID are required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 }
            );
        }

        // Check if employee ID already exists
        const existingTeacher = await prisma.teacher.findUnique({
            where: { employeeId },
        });

        if (existingTeacher) {
            return NextResponse.json(
                { error: "Employee ID already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user and teacher in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create user account
            const user = await tx.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    role: "TEACHER",
                    isActive: true,
                    phone: phone || null,
                },
            });

            // Create teacher profile
            const teacher = await tx.teacher.create({
                data: {
                    userId: user.id,
                    employeeId,
                    department: department || null,
                    qualification: qualification || null,
                    specialization: specialization || null,
                    joinDate: joinDate ? new Date(joinDate) : new Date(),
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            });

            return teacher;
        });

        return NextResponse.json({
            message: "Teacher created successfully",
            teacher: result,
        });
    } catch (error) {
        console.error("Failed to create teacher:", error);
        return NextResponse.json(
            { error: "Failed to create teacher" },
            { status: 500 }
        );
    }
}
