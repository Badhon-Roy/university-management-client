import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { Spin, Alert, Card, Row, Col } from "antd";

const AcademicFaculty = () => {
    const { data, isLoading, isError, error } = useGetAllFacultyQuery(undefined);

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Alert message="Error" description={error?.message || "Something went wrong"} type="error" showIcon />
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }} >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Academic Faculty</h2>
            <Row gutter={[16, 16]}>
                {data?.data?.map((item) => (
                    <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                        <Card title={item?.name} bordered hoverable>
                            <p>Faculty ID: {item._id}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AcademicFaculty;
