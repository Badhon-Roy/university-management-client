import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import { Button, Card, Col, Row, Typography } from "antd";
import { useAddAcademicDepartmentMutation, useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import PHButton from "../../../components/form/Button";
const { Title } = Typography;

const CreateAcademicDepartment = () => {
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

    const { data: facultyData, isLoading: facultyIsLoading } = useGetAllFacultyQuery(undefined);


    const facultyOptions = facultyData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...')
        const departmentData = {
            name: data?.name,
            academicFaculty: data?.academicFaculty
        }
        console.log(departmentData);
        try {
            const res = await addAcademicDepartment(departmentData)
            if (res.error) {
                toast.error(res.error?.data?.message, { id: toastId })
            } else if (res.data?.success) {
                toast.success(res.data?.message, { id: toastId })
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", { id: toastId })
        }
    }
    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "20px" }}>
        <Col xs={24} sm={16} md={12} lg={8} xl={6}>
            <Card
                style={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                }}
            >
                <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
                    Create Academic Department
                </Title>
                <PHForm onSubmit={onSubmit}>
                    <PHInput type="text" label="Department Name:" name="name" />
                    <PHSelect
                        options={facultyOptions}
                        disabled={facultyIsLoading}
                        label="Academic Faculty"
                        name="academicFaculty"
                    />
                    <PHButton text="submit"/>
                </PHForm>
            </Card>
        </Col>
    </Row>
    );
};

export default CreateAcademicDepartment;