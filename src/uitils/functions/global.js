import { toast } from "react-toastify";
import { operators, role, status } from "./constants";

// function to get complete URL
export function getURL(route, api = true) {
    if (!import.meta.env.VITE_BASE_URL) {
        throw new Error("VITE_BASE_URL is not defined");
    }

    let base_url = import.meta.env.VITE_BASE_URL;
    if (!api) {
        base_url = base_url.replace('/api', '');
    }
    return `${base_url}${route}`;
}

// function to handle input change
export function handleInputChange(e, set) {
    set(pre => {
        return { ...pre, [e.target.name]: e.target.value }
    });
}

// function to handle response appropriately
export function response(response, setValidationErrors, suppressToast = false) {
    if (!response || !response.data) {
        throw new Error("invalid response");
    }

    const { message } = response.data;
    switch (response.status) {
        case status.OK:
        case status.CREATED:
        case status.FOUND: {
            !suppressToast && toast.success(message ?? 'It was successful');
            break;
        }

        case status.INVALID_REQUEST: {
            setValidationErrors && setValidationErrors(response.data.errors);
            throw new Error(message ?? 'There was validation failure');
        }

        case status.BAD_REQUEST:
        case status.UNAUTHORIZED:
        case status.FORBIDDEN:
        case status.NOT_FOUND:
        case status.INTERNAL_SERVER_ERROR:
        default:
            throw new Error(message ?? 'There an error occured');
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
            navigate('/me', { replace: true });
            break;

        default:
            navigate('/', { replace: true });
    }
}

// function to show loading
export function isLoading(handler, nonLoadingState, loadingState = 'Loading...') {
    return handler.loading ? loadingState : nonLoadingState;
}

// function to formatdate date
export function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// function to readFile from backend
export function readFile(path) {
    return getURL('/' + path, false);
}

// function to check the data is null or empty 
export function isNullOrEmpty(data) {
    if (data === undefined || data === null) return true;

    if (typeof data == 'string' && data.trim() === '') return true;

    if (Array.isArray(data) && data.length === 0) return true;

    if (typeof data == 'object' && (Object.keys(data).length === 0 || Object.values(data)[0].id === '')) return true;

    return false;
}

// function to get only records satisfying the condition
export function where(data = [], relation = {}, operator = '==') {
    const key = Object.keys(relation)[0];
    const value = Object.values(relation)[0];

    const extractedData = data.filter(item => operators[operator](item[key], value));
    return Array.isArray(extractedData) ? extractedData : [extractedData];
}

// function to capitalize the string
export function capitalize(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// function to handle image seelction
export function handleImagePreview(e) {
    const updateImage = document.getElementById('updateImagePreview');
    updateImage.src = window.URL.createObjectURL(e.target.files[0]);
}

// function to handle image seelction
export function handleVideoPreview(e) {
    const updateVideo = document.getElementById('updateVideoPreview');
    updateVideo.src = window.URL.createObjectURL(e.target.files[0]);
}

// function to find any valueusing specific string the return filtered data
export function has(data = [], searchValue) {
    const foundItem = data.find(item => {
        if (typeof item == 'string') return item.includes(searchValue)
        return false;
    });

    if (foundItem) {
        const filteredData = data.filter((item) => item !== foundItem);
        const replacedItem = foundItem.replace(searchValue, '');

        return { items: filteredData, option: replacedItem };
    }

    return { items: data, option: null };
}