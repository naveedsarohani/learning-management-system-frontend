import { toast } from "react-toastify";
import { role, status } from "./constants";

// function to get complete URL
export function getURL(route) {
    if (!import.meta.env.VITE_BASE_URL) {
        throw new Error("VITE_BASE_URL is not defined");
    }
    return `${import.meta.env.VITE_BASE_URL}${route}`;
}

// function to handle input change
export function handleInputChange(e, set) {
    set(pre => {
        return { ...pre, [e.target.name]: e.target.value }
    });
}

// function to handle response appropriately
export function response(response, setValidationErrors = false) {
    if (!response || !response.data) {
        throw new Error("invalid response");
    }

    const { message } = response.data;

    switch (response.status) {
        case status.OK:
        case status.CREATED:
        case status.FOUND:
            toast.success(message);
            break;

        case status.INVALID_REQUEST:
            toast.error(message);
            setValidationErrors && setValidationErrors(response.data.errors);
            break;

        case status.BAD_REQUEST:
        case status.UNAUTHORIZED:
        case status.FORBIDDEN:
        case status.NOT_FOUND:
        case status.INTERNAL_SERVER_ERROR:
        default:
            toast.error(message);
    }

    return extractExcept(response.data, ['status', 'message', 'error', 'errors']);
}

// function to get values|entries except provided as arugments
export function extractExcept(data, keys) {
    const newResponseData = Object.fromEntries(
        Object.entries(data).filter(([name]) => !keys.includes(name))
    );

    return Object.keys(newResponseData).length ? newResponseData : false;
}

// function to capitaliz each word
export function capEach(data) {
    return data.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// function to separate string by certain separator
export function separateBy(str, separator) {
    return str.replace(separator, ' ');
}

// function to navigate roles accordingly
export function roleBaseRedirection(userRole, navigate) {
    switch (userRole) {
        case role.ADMIN:
        case role.INSTRUCTOR:
            navigate('/dashboard', { replace: true });
            break;

        case role.STUDENT:
            navigate('/student-profile', { replace: true });
            break;

        default:
            navigate('/', { replace: true });
    }
}

// function to show loading
export function isLoading(handler, nonLoadingState, loadingState = 'Loading...') {
    return handler.loading ? loadingState : nonLoadingState;
}