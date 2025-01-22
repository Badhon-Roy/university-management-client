import { Button, Modal, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from 'antd';
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentQuery, useUpdateStudentStatusMutation } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type TTableData = Pick<TStudent, 'fullName' | 'id' | 'email' | 'contactNo'>

const StudentData = () => {
    const [params, setParams] = useState<TQueryParam[]>([])
    const [page, setPage] = useState(1)
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const { data: studentData, isFetching } = useGetAllStudentQuery(
        [{ name: 'page', value: page },
        { name: 'sort', value: 'id' },
        ...params
        ]);
    const [updateStudentStatus] = useUpdateStudentStatusMutation();


    const metaData = studentData?.meta;
    const tableData = studentData?.data?.map(
        ({ _id, fullName, id, email, contactNo }) => ({
            key: _id,
            fullName,
            id,
            email,
            contactNo
        })
    );


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (id: any) => {
        setSelectedStudentId(id);
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        const toastId = toast.loading('Updating...')
        if (selectedStudentId) {
            try {
                const res = await updateStudentStatus({
                    id: selectedStudentId,
                    data: { status: 'blocked' }
                })
                if(res.data.success){
                    toast.success(res?.data?.message, {id : toastId})
                }else if(res.error){
                    toast.error(res.error.message)
                }
                console.log(res);
            } catch (error) {
                console.log(error);
                toast.error("something went wrong")
            }
        }

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            key: 'fullName',
            dataIndex: 'fullName',
        },
        {
            title: 'Roll No',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Contact No',
            key: 'contactNo',
            dataIndex: 'contactNo'
        },
        {
            title: "Action",
            key: 'x',
            render: (item) => {
                return <Space>
                    <Link to={`/admin/students-data/${item.key}`}>
                        <Button>Details</Button>
                    </Link>
                    <Button>Update</Button>
                    <Button type="primary" onClick={() => showModal(item.key)}>
                        Block
                    </Button>
                    <Modal title="Are You sure Block" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    </Modal>
                </Space>

            },
            width: '1%'
        }
    ];

    const onChange: TableProps<TTableData>['onChange'] = (pagination, filters, sorter, extra) => {
        if (extra.action === 'filter') {
            const queryParams: TQueryParam[] = [];
            filters.name?.forEach((item) => {
                queryParams.push({ name: 'name', value: item })
            })
            filters.year?.forEach((item) => {
                queryParams.push({ name: 'year', value: item })
            })
            setParams(queryParams)
        }
    };

    return (
        <div>
            <Table<TTableData> loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} pagination={false} />
            <Pagination align="center"
                style={{ margin: '20px' }}
                onChange={(value) => setPage(value)}
                defaultCurrent={1}
                pageSize={metaData?.limit}
                total={metaData?.total} />
        </div>
    );
};

export default StudentData;