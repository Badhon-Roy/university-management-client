import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Card, Row, Col, Descriptions, Avatar, Typography, Spin, Tag } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";


const { Title, Text } = Typography;

const StudentDetails = () => {
    const { studentId } = useParams();
    const { data: studentData, isLoading } = useGetSingleStudentQuery(studentId);

    const student = studentData?.data || {};

    const {
        gender,
        dateOfBirth,
        email,
        contactNo,
        emergencyContactNo,
        bloogGroup,
        presentAddress,
        permanentAddress,
        guardian,
        localGuardian,
        profileImg,
        admissionSemester,
        academicDepartment,
        academicFaculty,
        fullName,
        user
    } = student;
    console.log(studentData?.data);

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!studentData || studentData.length === 0) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <Text type="danger">No student data found!</Text>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <Card
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                }}
                bodyStyle={{ padding: "20px" }}
            >
                <Row gutter={[24, 24]} justify="center">
                    {/* Profile Section */}
                    <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={8}
                        style={{
                            textAlign: "center",
                            padding: "20px",
                        }}
                    >
                        <Avatar
                            size={120}
                            src={profileImg || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg?semt=ais_hybrid"}
                            alt={fullName}
                            icon={<UserOutlined />}
                            style={{
                                marginBottom: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                        />
                        <Title level={4} style={{ marginBottom: "5px" }}>
                            {fullName}
                        </Title>
                        <Tag color="blue" style={{ marginBottom: "10px" }}>
                            {academicDepartment?.name || "No Department"}
                        </Tag>
                        <Tag color="blue" style={{ marginBottom: "10px" }}>
                            {user?.status || "No Department"}
                        </Tag>
                        <div>
                            <Text type="secondary" style={{ display: "block", marginBottom: "5px" }}>
                                <MailOutlined /> {email || "N/A"}
                            </Text>
                            <Text type="secondary" style={{ display: "block", marginBottom: "5px" }}>
                                <PhoneOutlined /> {contactNo || "N/A"}
                            </Text>
                        </div>
                    </Col>

                    {/* Details Section */}
                    <Col
                        xs={24}
                        sm={24}
                        md={16}
                        lg={16}
                    >
                        <Descriptions
                            title={
                                <Title level={4} style={{ marginBottom: "20px", color: "#029bc0" }}>
                                    Student Details
                                </Title>
                            }
                            bordered
                            column={1}
                            labelStyle={{
                                fontWeight: "bold",
                                backgroundColor: "#f5f5f5",
                                padding: "8px",
                            }}
                            contentStyle={{
                                padding: "8px",
                            }}
                        >
                            <Descriptions.Item label="Full Name">{fullName || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{gender || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">
                                {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Blood Group">{bloogGroup || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Email">{email || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Contact Number">{contactNo || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Emergency Contact">
                                {emergencyContactNo || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Present Address">
                                {presentAddress || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Permanent Address">
                                {permanentAddress || "N/A"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>


                <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
                    <Col span={24}>
                        <Descriptions
                            title={
                                <Title level={4} style={{ marginBottom: "20px", color: "#029bc0" }}>
                                    Academic Department Details
                                </Title>
                            }
                            bordered
                            column={1}
                            labelStyle={{
                                fontWeight: "bold",
                                backgroundColor: "#f5f5f5",
                                padding: "8px",
                            }}
                            contentStyle={{
                                padding: "8px",
                            }}
                        >
                            {/* Academic Department Details */}
                            <Descriptions.Item label="Department Name">
                                {academicDepartment?.name || "N/A"}
                            </Descriptions.Item>

                            {/* Academic Faculty Details */}
                            <Descriptions.Item label="Faculty Name">
                                {academicFaculty?.name || "N/A"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>



                <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
                    <Col span={24}>
                        <Descriptions
                            title={
                                <Title level={4} style={{ marginBottom: "20px", color: "#029bc0" }}>
                                    Admission Semester Details
                                </Title>
                            }
                            bordered
                            column={1}
                            labelStyle={{
                                fontWeight: "bold",
                                backgroundColor: "#f5f5f5",
                                padding: "8px",
                            }}
                            contentStyle={{
                                padding: "8px",
                            }}
                        >
                            <Descriptions.Item label="Semester Name">
                                {admissionSemester?.name || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Year">
                                {admissionSemester?.year || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Start Month">
                                {admissionSemester?.startMonth || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="End Month">
                                {admissionSemester?.endMonth || "N/A"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>





                {/* Guardian Details */}
                <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
                    <Col span={24}>
                        <Descriptions
                            title={
                                <Title level={4} style={{ marginBottom: "20px", color: "#029bc0" }}>
                                    Guardian Details
                                </Title>
                            }
                            bordered
                            column={1}
                        >
                            <Descriptions.Item label="Father's Name">
                                {guardian?.fatherName || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Father's Occupation">
                                {guardian?.fatherOccupation || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Father's Contact">
                                {guardian?.fatherContactNo || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mother's Name">
                                {guardian?.motherName || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mother's Occupation">
                                {guardian?.motherOccupation || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mother's Contact">
                                {guardian?.motherContactNo || "N/A"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                {/* Guardian Details */}
                <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
                    <Col span={24}>
                        <Descriptions
                            title={
                                <Title level={4} style={{ marginBottom: "20px", color: "#029bc0" }}>
                                    Local Guardian Details
                                </Title>
                            }
                            bordered
                            column={1}
                        >
                            <Descriptions.Item label="Name">
                                {localGuardian.name || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Occupation">
                                {localGuardian.occupation || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Contact No">
                                {localGuardian.contactNo || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Address">
                                {localGuardian.address || "N/A"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default StudentDetails;
