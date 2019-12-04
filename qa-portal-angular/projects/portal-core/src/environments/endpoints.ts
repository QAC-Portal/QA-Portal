export interface Endpoints {
  GET_FORM_TYPE: string;
  SEND_EVAL_RESPONSE: string;
  GET_TRAINER_EVALUATION_SUMMARY: string;
  GET_COHORT_COURSES_FOR_TRAINER :string;
  GET_TRAINEE_EVALUATION_SUMMARY_URL: string;
  GET_EVALUATION_FORMS_FOR_TRAINEE_URL: string;
  GET_EVALUATION_FOR_TRAINEE_AND_COURSE_URL: string;
  GET_EVALUATION_FORM_FOR_ID_URL: string;
  GET_EVALUATION_FORMS_FOR_COHORT_COURSE_URL: string;
  CREATE_EVALUATION_FORM_URL: string;
  UPDATE_EVALUATION_FORM_URL: string;
  CREATE_FEEDBACK_FORM_URL: string;
  UPDATE_FEEDBACK_FORM_URL: string;
  GET_FEEDBACK_HISTORY_FOR_TRAINER_URL: string;
  GET_FEEDBACK_FOR_COURSE_URL: string;
  GET_FEEDBACK_FOR_ID_URL: string;
  PORTAL_APPLICATIONS_API: string;
  GET_COHORT_BY_ID: string;
  GET_ALL_COURSES: string;
  GET_COURSE_HISTORY: string;
  GET_TRAINERS_AVAILABLE_FOR_COHORT: string;
  SAVE_COHORT: string;
  GET_COURSE_BY_ID: string;
  SAVE_COURSE: string;
  GET_ALL_TECHNOLOGY_CATEGORIES: string;
  GET_ALL_TECHNOLOGY_CATEGORY_BY_ID: string;
  SAVE_TECHNOLOGY_CATEGORY: string;
  CREATE_TECHNOLOGY_CATEGORY: string;
  CREATE_COHORT: string;
  GET_ALL_FORMS: string;
  GET_FORM_BY_ID: string;
  CREATE_FORM: string;
  SAVE_FORM: string;
  GET_ALL_APPLICATIONS: string;
  CREATE_APPLICATION: string;
  GET_APPLICATION_BY_ID: string;
  SAVE_APPLICATION: string;
  GET_ALL_PORTAL_PROJECTS: string;
  CREATE_PORTAL_PROJECT: string;
  GET_PORTAL_PROJECT_BY_ID: string;
  SAVE_PORTAL_PROJECT: string;
  GET_ALL_LOCATIONS: string;
  GET_LOCATION_BY_ID: string;
  SAVE_LOCATION: string;
  CREATE_LOCATION: string;
  GET_ALL_ROLES: string;
  GET_ALL_ROLE_NAMES: string;
  GET_ROLE_BY_ID: string;
  SAVE_ROLE: string;
  CREATE_ROLE: string;
  GET_AVAILABLE_TRAINEES_BY_COHORT_ID: string;
  GET_ALL_USERS_URL: string;
  DELETE_USERS_URL : string;
  UPDATE_USERS_URL : string;
  CREATE_USER_URL: string;
  UPDATE_USER_URL: string;
  GET_COHORTS_URL: string;
  GET_USER_BY_USERNAME_URL:string;
  GET_CV_FOR_ID_URL: string;
  GET_SKILLS_FOR_TRAINEE_URL: string;
  GET_CURRENT_CV_URL: string;
  GENERATE_CV_URL: string;
  SAVE_CV_DATA_URL: string;
  GET_SELF_REFLECTION_SUMMARY: string;
  GET_TRAINEE_COHORT_URL: string;
  GET_USER_API_COHORTS: string;
  GET_USER_API_TRAINEES: string;
  GET_USER_API_TRAINEES_FOR_REVIEW: string;
  GET_SELF_REFLECTIONS_FOR_TRAINEE_API: string;
  CREATE_SELF_REFLECTION_API: string;
  GET_SELF_REFLECTION_API_BY_ID: string;
  GET_ALL_FORM_USER_SELF_REFLECTION_API: string;
  UPDATE_SELF_REFLECTION_API: string;
  GET_SELF_REFLECTION_TRAINEE_BY_ID: string;
  SAVE_REFLECTION_FORM:string;
  GET_FORM_TYPE_QUESTIONS:string;
}

export const endpoints: Endpoints = {
  GET_SELF_REFLECTION_API_BY_ID: 'self-reflection-api/reflection/:id',
  GET_ALL_FORM_USER_SELF_REFLECTION_API: 'self-reflection-api/reflection/trainee',
  UPDATE_SELF_REFLECTION_API: 'self-reflection-api/reflection',
  SAVE_REFLECTION_FORM: 'self-reflection-api/reflection',
  GET_SELF_REFLECTION_TRAINEE_BY_ID:'self-reflection-api/reflection/trainee/:traineeId',
  CREATE_SELF_REFLECTION_API: 'self-reflection-api/reflection/',
  GET_TRAINEE_COHORT_URL: '/cohort-api/user/trainee/cohort',
  GET_USER_API_COHORTS: 'cohort-api/user/trainer/cohorts',
  GET_USER_API_TRAINEES: 'cohort-api/cohort/trainees/:id',
  GET_USER_API_TRAINEES_FOR_REVIEW: 'self-reflection-api/reflection/cohort/trainees/review/:cohortId',
  GET_SELF_REFLECTIONS_FOR_TRAINEE_API: 'self-reflection-api/reflection/trainee',
  GET_SELF_REFLECTION_SUMMARY: '/self-reflection-api/reflection/summary',
  GET_CV_FOR_ID_URL: 'cv-api/cv/:id',
  GET_SKILLS_FOR_TRAINEE_URL: 'cohort-api/user/trainee/skills',
  GET_CURRENT_CV_URL: 'cv-api/cv/trainee/current',
  GENERATE_CV_URL : 'cv-api/cv/generated',
  SAVE_CV_DATA_URL: 'cv-api/cv',
  GET_FORM_TYPE: 'form-api/form/:formType/categories',
  SEND_EVAL_RESPONSE: 'feedback-api/feedback',
  GET_TRAINER_EVALUATION_SUMMARY: 'feedback-api/evaluation/course/:courseId',
  GET_COHORT_COURSES_FOR_TRAINER : '/feedback-api/evaluation/trainer',
  GET_TRAINEE_EVALUATION_SUMMARY_URL : 'feedback-api/evaluation/trainee/summary',
  GET_EVALUATION_FORMS_FOR_TRAINEE_URL : 'feedback-api/evaluation/trainee',
  GET_EVALUATION_FOR_TRAINEE_AND_COURSE_URL : 'feedback-api/evaluation/trainee/course/',
  GET_EVALUATION_FORM_FOR_ID_URL : 'feedback-api/evaluation/',
  GET_EVALUATION_FORMS_FOR_COHORT_COURSE_URL : 'feedback-api/evaluation/course/',
  CREATE_EVALUATION_FORM_URL : 'feedback-api/evaluation',
  UPDATE_EVALUATION_FORM_URL : 'feedback-api/evaluation',
  CREATE_FEEDBACK_FORM_URL : 'feedback-api/feedback',
  UPDATE_FEEDBACK_FORM_URL : 'feedback-api/feedback',
  GET_FEEDBACK_HISTORY_FOR_TRAINER_URL : 'feedback-api/feedback/trainer',
  GET_FEEDBACK_FOR_COURSE_URL : 'feedback-api/feedback/course/',
  GET_FEEDBACK_FOR_ID_URL : 'feedback-api/feedback/',
  GET_COURSE_HISTORY: '/feedback-api/evaluation/trainer',
  GET_COHORT_BY_ID: 'cohort-api/cohort/:id',
  GET_ALL_COURSES: 'cohort-api/courses',
  PORTAL_APPLICATIONS_API: 'portal-application-api/portal/applications',
  GET_TRAINERS_AVAILABLE_FOR_COHORT: 'cohort-api/manage/users/trainers',
  SAVE_COHORT: 'cohort-api/manage/cohort',
  GET_COURSE_BY_ID: '/cohort-api/course/:id',
  SAVE_COURSE: 'cohort-api/manage/course',
  GET_ALL_TECHNOLOGY_CATEGORIES: 'cohort-api/technology/categories',
  GET_ALL_TECHNOLOGY_CATEGORY_BY_ID: 'cohort-api/technology/category/:id',
  SAVE_TECHNOLOGY_CATEGORY: 'cohort-api/manage/technology/category',
  CREATE_TECHNOLOGY_CATEGORY: 'cohort-api/manage/technology/category',
  CREATE_COHORT: 'cohort-api/manage/cohort',
  GET_ALL_FORMS: '/form-api/forms',
  GET_FORM_BY_ID: '/form-api/form/:id',
  GET_FORM_TYPE_QUESTIONS : 'form-api/form/:formType/questions',
  CREATE_FORM: '/form-api/manage/form',
  SAVE_FORM: '/form-api/manage/form',
  GET_ALL_APPLICATIONS: '/portal-application-api/manage/portal/applications',
  CREATE_APPLICATION: '/portal-application-api/manage/portal/application',
  GET_APPLICATION_BY_ID: '/portal-application-api/manage/portal/application/:id',
  SAVE_APPLICATION: '/portal-application-api/manage/portal/application',
  GET_ALL_PORTAL_PROJECTS: '/portal-application-api/portal/projects',
  CREATE_PORTAL_PROJECT: '/portal-application-api/manage/portal/project',
  GET_PORTAL_PROJECT_BY_ID: '/portal-application-api/portal/project/:id',
  SAVE_PORTAL_PROJECT: '/portal-application-api/manage/portal/project',
  GET_ALL_LOCATIONS: '/cohort-api/locations',
  GET_LOCATION_BY_ID: '/cohort-api/location/:id',
  SAVE_LOCATION: '/cohort-api/manage/location',
  CREATE_LOCATION: '/cohort-api/manage/location',
  GET_ALL_ROLES: '/portal-application-api/manage/roles',
  GET_ALL_ROLE_NAMES: '/portal-application-api/manage/roles/names',
  GET_ROLE_BY_ID: '/portal-application-api/role/:id',
  SAVE_ROLE: '/portal-application-api/manage/role',
  CREATE_ROLE: '/portal-application-api/manage/role',
  GET_AVAILABLE_TRAINEES_BY_COHORT_ID: '/cohort-api/manage/users/available-trainees/cohort/:id',
  GET_ALL_USERS_URL : 'cohort-api/manage/users',
  DELETE_USERS_URL : 'cohort-api/manage/users/delete',
  UPDATE_USERS_URL : 'cohort-api/manage/users',
  CREATE_USER_URL : 'cohort-api/manage/user',
  UPDATE_USER_URL : 'cohort-api/manage/user',
  GET_COHORTS_URL : 'cohort-api/cohorts',
  GET_USER_BY_USERNAME_URL: 'cohort-api/manage/user/:username',
  
};

export type EndpointRef = keyof Endpoints;
