export const ProjectConstants = Object.freeze({
  MESSAGES: {
    CREATE_PROJECT_FAILED: "Failed to create project",
    FETCH_PROJECTS_FAILED: "Failed to fetch projects",
    GET_PROJECT_BY_ID_FAILED: "Failed to fetch project by ID",
    DELETE_PROJECT_FAILED: "Failed to delete project",
    SEARCH_PROJECT_BY_NAME_FAILED: "Failed to search project by name",
    PROJECT_ID_REQUIRED: "Project ID is required",
    PROJECT_ID_MUST_BE_NUMBER: "Project ID must be a number",
    PROJECT_NAME_REQUIRED: "Project Name is required",
    PROJECT_DESCRIPTION_REQUIRED: "Project Description is required",
    INVALID_REQUEST: "Invalid request!",
    MISSING_PROJECT_OR_MANAGER_ID: "Missing projectId or managerId.",
    ADD_PROJECT_MEMBERS_FAILED:"Failed to add project members",
    GET_PROJECT_MEMBERS_FAILED:"Failed to get project members",
    INVALID_USER_ID:"Invalid Project ID",
    INVALID_USER_IDS:"Invalid User IDs",
    INVALID_USER_ID_IN_ARRAY:"Any User ID entered invalid in array"
  }
} as const);
