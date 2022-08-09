import { post, get } from './';

export const getPosts = async (payload) => {
    try {
        const response = await get('api/posts', payload);
        return response;
    } catch (error) {
        throw error;
    }
};

export const storePost = async (params) => {
    try {
        const payload = {
            ...params,
        };

        const response = await post(`api/posts`, payload);
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