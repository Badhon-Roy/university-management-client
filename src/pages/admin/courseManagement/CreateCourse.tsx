import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Col, Flex } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import { toast } from 'sonner';
import PHInput from '../../../components/form/PHInput';
import { useAddCourseMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import PHButton from '../../../components/form/Button';
import { TResponse } from '../../../types';

const CreateCourse = () => {

    const [addCourse] = useAddCourseMutation();
    const { data: courseData } = useGetAllCoursesQuery(undefined)


    const preRequisiteCoursesOptions = courseData?.data?.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const toastId = toast.loading('Creating...');

        const courseData = {
            ...data,
            isDeleted: false,
            code: Number(data?.code),
            credits: Number(data.credits),
            preRequisiteCourses: data?.preRequisiteCourses ? data?.preRequisiteCourses?.map(item => ({
                course: item,
                isDeleted: false
            })) : []
        };

        try {
            const res = (await addCourse(courseData)) as TResponse<any>;
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success(res.data?.message || "Course Created", { id: toastId });
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong', { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span={12}>
                <PHForm onSubmit={onSubmit}>
                    <PHInput type="text" name="title" label="Title" />
                    <PHInput type="text" name="prefix" label="Prefix" />
                    <PHInput type="text" name="code" label="Code" />
                    <PHInput type="text" name="credits" label="Credits" />
                    <PHSelect mode='multiple'
                        options={preRequisiteCoursesOptions}
                        name='preRequisiteCourses'
                        label='Pre Requisite Courses'
                    />

                    <PHButton text='submit'></PHButton>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateCourse;