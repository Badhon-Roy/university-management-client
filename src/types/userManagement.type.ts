import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "./academicManagement.type";



export type TStudent = {
    _id: string;
    id: string;
    user: TUserData;
    name: TName;
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg: string;
    admissionSemester: TAcademicSemester;
    isDeleted: boolean;
    academicDepartment: TAcademicDepartment;
    academicFaculty: TAcademicFaculty;
    fullName: string;
}

export type TUserData = {
    _id: string;
    id: string;
    email: string;
    needsPasswordChange: boolean;
    role: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type TName = {
    firstName: string;
    middleName: string;
    lastName: string;
    _id: string;
};

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    _id: string;
};

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
    _id: string;
};

export type TFaculty = {
    _id: string
    id: string
    user: string
    designation: string
    name: TName
    gender: string
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloogGroup: string
    presentAddress: string
    permanentAddress: string
    profileImg: string
    academicDepartment: TAcademicDepartment
    academicFaculty: TAcademicFaculty
    isDeleted: boolean
    fullName: string
  }