
import { TQueryParam, TResponseRedux } from "../../../types";
import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // academic semester related
        getAllSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    })
                }

                return {
                    url: '/academic-semesters',
                    method: "GET",
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: '/academic-semesters/create-academic-semester',
                method: "POST",
                body: data
            })
        }),

        // academic faculty related
        getAllFaculty: builder.query({
            query: () => ({
                url: '/academic-faculties',
                method: "GET"
            }),
            transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        addAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: '/academic-faculties/create-academic-faculty',
                method: "POST",
                body: data
            })
        }),


        // academic department related
        getAllDepartment : builder.query({
            query: () => ({
                url: '/academic-departments',
                method: "GET"
            }),
            transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        addAcademicDepartment: builder.mutation({
            query: (data) => ({
                url: '/academic-departments/create-academic-department',
                method: "POST",
                body: data
            })
        })
    })
})

export const { useGetAllSemesterQuery,
    useAddAcademicSemesterMutation,
    useGetAllFacultyQuery,
    useAddAcademicFacultyMutation,
    useGetAllDepartmentQuery,
    useAddAcademicDepartmentMutation
} = academicManagementApi;