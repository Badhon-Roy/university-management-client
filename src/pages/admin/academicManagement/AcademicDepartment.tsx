import { Alert, Card, Col, Row, Spin } from "antd";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicDepartment = () => {
    const { data, isLoading, isError, error } = useGetAllDepartmentQuery(undefined);
    console.log(data?.data);

  
    if (isLoading) {
        return (
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spin size="large" tip="Loading..." spinning={isLoading} />
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
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Academic Department</h2>
            <Row gutter={[16, 16]}>
                {data?.data?.map((item) => (
                    <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                        <Card title={item?.name} bordered hoverable>
                            <p>Faculty Name: {item.academicFaculty.name}</p>
                            <p>Faculty ID: {item.academicFaculty._id}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AcademicDepartment;