export const BASE_URL = "http://localhost:4000";

//Rout3s
export const API_PATHS = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    get_profile: "/api/auth/profile",
  },
  resume: {
    create: "/api/resumes",
    get_all: "/api/resumes",
    get_by_id: (id) => `/api/resumes/${id}`,
    update: (id) => `/api/resumes/${id}`,
    delete: (id) => `/api/resumes/${id}`,
    upload_image: (resumeId) => `/api/resumes/${resumeId}/upload-image`,
  },
  image: {
    upload_image: `/api/images/upload`,
  },
};
