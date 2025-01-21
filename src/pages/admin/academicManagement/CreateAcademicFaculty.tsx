import { Button, Card, Col, Flex, Row, Typography } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import PHButton from "../../../components/form/Button";
const { Title } = Typography;
const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...')
        const facultyData = {
            name: data?.name
        }
        console.log(facultyData);
        try {
            const res = await addAcademicFaculty(facultyData)
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
        <Col xs={24} sm={20} md={14} lg={10}>
          <Card
            style={{
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Title level={4} style={{ textAlign: "center", marginBottom: "20px", color: "#1677ff" }}>
              Create Academic Faculty
            </Title>
            <PHForm onSubmit={onSubmit}>
              <PHInput type="text" label="Name:" name="name" />
              <PHButton text="submit"/>
            </PHForm>
          </Card>
        </Col>
      </Row>
    );
};

export default CreateAcademicFaculty;