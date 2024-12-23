// HTTP methods to handle request status code
export const status = Object.freeze({
    OK: 200,
    CREATED: 201,
    FOUND: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INVALID_REQUEST: 422,
    INTERNAL_SERVER_ERROR: 500,
});

// user roles
export const role = Object.freeze({
    ADMIN: 'admin',
    INSTRUCTOR: 'instructor',
    STUDENT: 'student',
});

// opertors
export const operators = Object.freeze({
    '===': (x, y) => x === y,
    '==': (x, y) => x == y,
    '!=': (x, y) => x != y,
    '>': (x, y) => x > y,
    '<': (x, y) => x < y,
    '>=': (x, y) => x >= y,
    '<=': (x, y) => x <= y,
});