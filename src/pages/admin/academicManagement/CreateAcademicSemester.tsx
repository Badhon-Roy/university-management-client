/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from 'antd';
import PHSelect from "../../../components/form/PHSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/month";
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicSemester } from "../../../types/academicSemester.type";


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
            } else if(res.data?.success){
                toast.success(res.data?.message, { id: toastId })
            }
        } catch (err) {
            toast.error("Something went wrong", { id: toastId })
        }
    }
    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                    <PHSelect label='Name:' name='name' options={nameOptions} />
                    <PHSelect label='Year:' name='year' options={yearOptions} />
                    <PHSelect label='Start Month:' name='startMonth' options={monthOptions} />
                    <PHSelect label='End Month:' name='endMonth' options={monthOptions} />
                    <Button htmlType="submit">Submit </Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;