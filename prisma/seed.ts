import { PrismaClient, Role, Gender, StudentStatus, ExamStatus, ExamType, AttendanceStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create school
  const school = await prisma.school.upsert({
    where: { id: "school-1" },
    update: {},
    create: {
      id: "school-1",
      name: "Lumio Academy",
      address: "123 Education Street, Learning City, LC 10001",
      phone: "+1 (555) 000-1234",
      email: "admin@lumio.edu",
      website: "https://lumio.edu",
      timezone: "America/New_York",
      currency: "USD",
    },
  });
  console.log("✅ School created:", school.name);

  // Create academic year
  const academicYear = await prisma.academicYear.upsert({
    where: { id: "ay-2024-25" },
    update: { isCurrent: true },
    create: {
      id: "ay-2024-25",
      name: "2024-2025",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-06-30"),
      isCurrent: true,
    },
  });
  console.log("✅ Academic year created:", academicYear.name);

  // Create terms
  const term1 = await prisma.term.upsert({
    where: { id: "term-1" },
    update: {},
    create: {
      id: "term-1",
      name: "Term 1",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-12-20"),
      academicYearId: academicYear.id,
    },
  });

  const term2 = await prisma.term.upsert({
    where: { id: "term-2" },
    update: {},
    create: {
      id: "term-2",
      name: "Term 2",
      startDate: new Date("2025-01-10"),
      endDate: new Date("2025-06-30"),
      academicYearId: academicYear.id,
    },
  });
  console.log("✅ Terms created");

  // Create grades
  const grades = await Promise.all([
    prisma.grade.upsert({
      where: { id: "grade-10" },
      update: {},
      create: { id: "grade-10", name: "Grade 10", level: 10 },
    }),
    prisma.grade.upsert({
      where: { id: "grade-11" },
      update: {},
      create: { id: "grade-11", name: "Grade 11", level: 11 },
    }),
    prisma.grade.upsert({
      where: { id: "grade-12" },
      update: {},
      create: { id: "grade-12", name: "Grade 12", level: 12 },
    }),
  ]);
  console.log("✅ Grades created:", grades.length);

  // Create subjects
  const subjects = await Promise.all([
    prisma.subject.upsert({ where: { code: "MATH" }, update: {}, create: { code: "MATH", name: "Mathematics", color: "#3b82f6", gradeId: "grade-10" } }),
    prisma.subject.upsert({ where: { code: "ENG" }, update: {}, create: { code: "ENG", name: "English", color: "#f59e0b", gradeId: "grade-10" } }),
    prisma.subject.upsert({ where: { code: "PHY" }, update: {}, create: { code: "PHY", name: "Physics", color: "#8b5cf6", gradeId: "grade-11" } }),
    prisma.subject.upsert({ where: { code: "ART" }, update: {}, create: { code: "ART", name: "Art", color: "#ec4899", gradeId: "grade-10" } }),
    prisma.subject.upsert({ where: { code: "SPT" }, update: {}, create: { code: "SPT", name: "Sport", color: "#10b981", gradeId: "grade-10" } }),
    prisma.subject.upsert({ where: { code: "SCI" }, update: {}, create: { code: "SCI", name: "Science", color: "#14b8a6", gradeId: "grade-11" } }),
    prisma.subject.upsert({ where: { code: "CS" }, update: {}, create: { code: "CS", name: "Computer Science", color: "#06b6d4", gradeId: "grade-12" } }),
    prisma.subject.upsert({ where: { code: "HIST" }, update: {}, create: { code: "HIST", name: "History", color: "#f97316", gradeId: "grade-12" } }),
  ]);
  console.log("✅ Subjects created:", subjects.length);

  // Hash password helper
  const hashPw = (pw: string) => bcrypt.hash(pw, 12);

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@lumio.edu" },
    update: {},
    create: {
      email: "admin@lumio.edu",
      name: "System Admin",
      password: await hashPw("Admin1234!"),
      role: Role.SCHOOL_ADMIN,
      isActive: true,
    },
  });
  console.log("✅ Admin user created:", adminUser.email);

  // Create principal
  const principalUser = await prisma.user.upsert({
    where: { email: "principal@lumio.edu" },
    update: {},
    create: {
      email: "principal@lumio.edu",
      name: "Dr. Johnson",
      password: await hashPw("Principal123!"),
      role: Role.PRINCIPAL,
      isActive: true,
    },
  });

  // Create teacher users
  const teacherData = [
    { email: "teacher@lumio.edu", name: "Amir Bagjian", pw: "Teacher123!" },
    { email: "teacher2@lumio.edu", name: "Dr. Richards", pw: "Teacher123!" },
    { email: "teacher3@lumio.edu", name: "Ms. Davidson", pw: "Teacher123!" },
    { email: "teacher4@lumio.edu", name: "Mr. Anderson", pw: "Teacher123!" },
  ];

  const teacherUsers = await Promise.all(
    teacherData.map(async (t) =>
      prisma.user.upsert({
        where: { email: t.email },
        update: {},
        create: {
          email: t.email,
          name: t.name,
          password: await hashPw(t.pw),
          role: Role.TEACHER,
          isActive: true,
        },
      })
    )
  );
  console.log("✅ Teacher users created:", teacherUsers.length);

  // Create Teacher profiles
  const teacher1 = await prisma.teacher.upsert({
    where: { userId: teacherUsers[0].id },
    update: {},
    create: {
      userId: teacherUsers[0].id,
      employeeId: "TCH001",
      department: "Mathematics",
      qualification: "M.Sc Mathematics",
      specialization: "Algebra & Calculus",
      joinDate: new Date("2020-09-01"),
    },
  });

  const teacher2 = await prisma.teacher.upsert({
    where: { userId: teacherUsers[1].id },
    update: {},
    create: {
      userId: teacherUsers[1].id,
      employeeId: "TCH002",
      department: "Science",
      qualification: "Ph.D Physics",
      specialization: "Quantum Mechanics",
      joinDate: new Date("2019-09-01"),
    },
  });

  const teacher3 = await prisma.teacher.upsert({
    where: { userId: teacherUsers[2].id },
    update: {},
    create: {
      userId: teacherUsers[2].id,
      employeeId: "TCH003",
      department: "Arts",
      qualification: "M.F.A Fine Arts",
      specialization: "Visual Arts",
      joinDate: new Date("2021-09-01"),
    },
  });
  console.log("✅ Teacher profiles created");

  // Create classes
  const class302 = await prisma.class.upsert({
    where: { id: "class-302" },
    update: {},
    create: {
      id: "class-302",
      name: "Class 302",
      section: "A",
      gradeId: "grade-10",
      academicYearId: academicYear.id,
      teacherId: teacher1.id,
      roomNumber: "302",
      capacity: 35,
    },
  });

  const class303 = await prisma.class.upsert({
    where: { id: "class-303" },
    update: {},
    create: {
      id: "class-303",
      name: "Class 303",
      section: "B",
      gradeId: "grade-11",
      academicYearId: academicYear.id,
      teacherId: teacher2.id,
      roomNumber: "303",
      capacity: 30,
    },
  });

  const class304 = await prisma.class.upsert({
    where: { id: "class-304" },
    update: {},
    create: {
      id: "class-304",
      name: "Class 304",
      section: "A",
      gradeId: "grade-12",
      academicYearId: academicYear.id,
      teacherId: teacher3.id,
      roomNumber: "304",
      capacity: 32,
    },
  });
  console.log("✅ Classes created");

  // Create student users
  const studentData = [
    { email: "student@lumio.edu", name: "Amir Bagjian", pw: "Student123!", classId: class302.id },
    { email: "james.wilson@student.lumio.edu", name: "James Wilson", pw: "Student123!", classId: class302.id },
    { email: "hannah.turner@student.lumio.edu", name: "Hannah Turner", pw: "Student123!", classId: class302.id },
    { email: "emily.carter@student.lumio.edu", name: "Emily Carter", pw: "Student123!", classId: class303.id },
    { email: "nicholas.white@student.lumio.edu", name: "Nicholas White", pw: "Student123!", classId: class303.id },
    { email: "sarah.anderson@student.lumio.edu", name: "Sarah Anderson", pw: "Student123!", classId: class303.id },
    { email: "daniel.roberts@student.lumio.edu", name: "Daniel Roberts", pw: "Student123!", classId: class304.id },
    { email: "olivia.brown@student.lumio.edu", name: "Olivia Brown", pw: "Student123!", classId: class304.id },
  ];

  for (const [i, s] of studentData.entries()) {
    const sUser = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        name: s.name,
        password: await hashPw(s.pw),
        role: Role.STUDENT,
        isActive: true,
      },
    });

    await prisma.student.upsert({
      where: { userId: sUser.id },
      update: {},
      create: {
        userId: sUser.id,
        studentId: `STU${String(i + 1).padStart(4, "0")}`,
        classId: s.classId,
        gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE,
        enrollmentDate: new Date("2024-09-01"),
        status: StudentStatus.ACTIVE,
      },
    });
  }
  console.log("✅ Student users and profiles created:", studentData.length);

  // Create announcements
  await prisma.announcement.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Mid-term Examination Schedule Released",
        content: "The mid-term examination schedule for all classes has been finalized and released.",
        authorId: adminUser.id,
        isPinned: true,
        publishedAt: new Date(),
      },
      {
        title: "Parent-Teacher Conference - February 20",
        content: "We will be hosting our annual parent-teacher conference on February 20, 2025.",
        authorId: principalUser.id,
        targetRole: Role.TEACHER,
        isPinned: true,
        publishedAt: new Date(Date.now() - 86400000),
      },
      {
        title: "Sports Day Rescheduled to February 28",
        content: "Due to the weather forecast, the annual sports day has been rescheduled.",
        authorId: adminUser.id,
        isPinned: false,
        publishedAt: new Date(Date.now() - 86400000 * 2),
      },
    ],
  });
  console.log("✅ Announcements created");

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 Demo accounts:");
  console.log("  Admin:   admin@lumio.edu    / Admin1234!");
  console.log("  Teacher: teacher@lumio.edu  / Teacher123!");
  console.log("  Student: student@lumio.edu  / Student123!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
