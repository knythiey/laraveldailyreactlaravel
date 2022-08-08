import { post, get } from './ApiService';

export const getPosts = async (page = 1) => {
    try {
        let payload = {
            page: page,
        };
        const response = await get('api/posts', payload);
        return response;
    } catch (error) {
        throw error;
    }
};

// export const searchCompanies = async (filters: any, page: number = 1) => {
//   try {
//     let payload = {
//       ...filters,
//       page: page,
//     };
//     const response = await post('api/companies/search', payload);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const saveCompany = async (params: Object) => {
//   try {
//     const payload = {
//       ...params,
//     };
//     const response = await post(`api/companies/store`, payload);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };