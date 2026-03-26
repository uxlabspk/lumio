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

        // Get all students with their details
        const students = await prisma.student.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                },
                class: {
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

        // Get all classes for enrollment dropdown
        const classes = await prisma.class.findMany({
            select: {
                id: true,
                name: true,
                section: true,
            },
            orderBy: [
                { grade: { level: "asc" } },
                { name: "asc" },
            ],
        });

        return NextResponse.json({
            students,
            classes,
            canManage,
        });
    } catch (error) {
        console.error("Failed to fetch students:", error);
        return NextResponse.json(
            { error: "Failed to fetch students" },
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
            studentId,
            dateOfBirth,
            gender,
            address,
            bloodType,
            medicalNotes,
            parentId,
            enrollmentDate,
        } = body;

        // Validation
        if (!email || !password || !name || !studentId) {
            return NextResponse.json(
                { error: "Email, password, name, and student ID are required" },
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

        // Check if student ID already exists
        const existingStudent = await prisma.student.findUnique({
            where: { studentId },
        });

        if (existingStudent) {
            return NextResponse.json(
                { error: "Student ID already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user and student in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create user account
            const user = await tx.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    role: "STUDENT",
                    isActive: true,
                },
            });

            // Create student profile
            const student = await tx.student.create({
                data: {
                    userId: user.id,
                    studentId,
                    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                    gender: gender || null,
                    address: address || null,
                    bloodType: bloodType || null,
                    medicalNotes: medicalNotes || null,
                    enrollmentDate: enrollmentDate ? new Date(enrollmentDate) : new Date(),
                    parentId: parentId || null,
                    status: "ACTIVE",
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

            return student;
        });

        return NextResponse.json({
            message: "Student created successfully",
            student: result,
        });
    } catch (error) {
        console.error("Failed to create student:", error);
        return NextResponse.json(
            { error: "Failed to create student" },
            { status: 500 }
        );
    }
}
