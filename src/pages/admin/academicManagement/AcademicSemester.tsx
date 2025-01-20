import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
     const {data} = useGetAllSemesterQuery(undefined);
     console.log(data);
    return (
        <div>
            <h2>This is academicSemester page</h2>
        </div>
    );
};

export default AcademicSemester;