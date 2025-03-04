export type TAcademicDepartment = {
    name: string
    academicFaculty: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
}

export type TAcademicFaculty = {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
  }

  export type TAcademicSemester = {
    _id: string;
    name: string;
    year: string;
    code: string;
    startMonth:
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';
    endMonth:
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';
    createdAt: string
    updatedAt: string
    __v: number
};