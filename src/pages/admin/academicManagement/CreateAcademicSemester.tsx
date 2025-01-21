/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Card, Col, Flex, Row, Typography } from 'antd';
import PHSelect from "../../../components/form/PHSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/month";
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicSemester } from "../../../types/academicSemester.type";
import PHButton from "../../../components/form/Button";
const { Title } = Typography;

const currentYear = new Date().getFullYear();


const yearOptions = [0, 1, 2, 3, 4].map(number => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
    year: String(currentYear + number),
}))

const CreateAcademicSemester = () => {
    const [addAcademicSemester] = useAddAcademicSemesterMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...')
        const name = nameOptions[Number(data.name) - 1].label;
        const semesterData = {
            name,
            year: data?.year,
            code: data?.name,
            startMonth: data?.startMonth,
            endMonth: data?.endMonth
        }
        try {
            const res = (await addAcademicSemester(semesterData)) as TResponse<TAcademicSemester>;
            if (res.error) {
                toast.error(res.error?.data?.message, { id: toastId })
            } else if (res.data?.success) {
                toast.success(res.data?.message, { id: toastId })
            }
        } catch (err) {
            toast.error("Something went wrong", { id: toastId })
        }
    }
    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "20px" }}>
            <Col xs={24} sm={20} md={14} lg={10}>
                <Card
                    style={{
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <Title level={3} style={{ textAlign: "center", marginBottom: "20px", color: "#1677ff" }}>
                        Create Academic Semester
                    </Title>
                    <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                        <PHSelect label="Name:" name="name" options={nameOptions} />
                        <PHSelect label="Year:" name="year" options={yearOptions} />
                        <PHSelect label="Start Month:" name="startMonth" options={monthOptions} />
                        <PHSelect label="End Month:" name="endMonth" options={monthOptions} />
                        <PHButton text="Submit" />
                    </PHForm>
                </Card>
            </Col>
        </Row>
    );
};

export default CreateAcademicSemester;