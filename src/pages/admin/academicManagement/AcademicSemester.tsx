import { Button, Table } from "antd";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TableColumnsType, TableProps } from 'antd';
import { TAcademicSemester } from "../../../types/academicSemester.type";
import { useState } from "react";
import { TQueryParam } from "../../../types";

export type TTableData = Pick<TAcademicSemester, 'name' | 'year' | 'startMonth' | 'endMonth'>

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
    const { data, isFetching } = useGetAllSemesterQuery(params);
    const tableData = data?.data?.map(
        ({ _id, name, year, startMonth, endMonth }) => ({
            key: _id,
            name,
            year,
            startMonth,
            endMonth,
        })
    );


    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Summer',
                    value: 'Summer',
                },
                {
                    text: 'Fall',
                    value: 'Fall',
                },
            ],
        },
        {   
            title: 'Year',
            key: 'year',
            dataIndex: 'year',
            filters: [
                {
                    text: '2025',
                    value: '2025',
                },
                {
                    text: '2026',
                    value: '2026',
                },
                {
                    text: '2027',
                    value: '2027',
                },
                {
                    text: '2028',
                    value: '2028'
                },
            ],
        },
        {
            title: 'Start Month',
            key: 'startMonth',
            dataIndex: 'startMonth'
        },
        {
            title: 'End Month',
            key: 'endMonth',
            dataIndex: 'endMonth'
        },
        {
            title : "Action",
            key: 'x',
            render : ()=>{
                return <div><Button>Update</Button></div>
            }
        }
    ];

    const onChange: TableProps<TTableData>['onChange'] = (pagination, filters, sorter, extra) => {
        if(extra.action === 'filter'){
            const queryParams : TQueryParam[] = [];
            filters.name?.forEach((item)=>{
                queryParams.push({name : 'name', value : item})
            })
            filters.year?.forEach((item)=>{
                queryParams.push({name : 'year', value : item})
            })
            setParams(queryParams)
        }
    };





    return (
        <div>
            <Table<TTableData> loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />
        </div>
    );
};

export default AcademicSemester;