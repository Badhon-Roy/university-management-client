import { TFaculty, TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // student related
        getAllStudent: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    })
                }
                return {
                    url: '/students',
                    method: "GET",
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        getSingleStudent: builder.query({
            query: (id) => ({
                url: `/students/${id}`,
                method: "GET"
            })
        })
        ,
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: "POST",
                body: data
            })
        }),
        updateStudentStatus : builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/change-status/${id}`,
                method: 'POST',
                body: data,
            }),
        }),

        // faculty related
        getAllFaculties: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    })
                }
                return {
                    url: '/faculties',
                    method: "GET",
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TFaculty[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),

    })
})

export const {
    useGetAllStudentQuery,
    useGetSingleStudentQuery
    , useAddStudentMutation,
useUpdateStudentStatusMutation,
useGetAllFacultiesQuery }
    = userManagementApi;