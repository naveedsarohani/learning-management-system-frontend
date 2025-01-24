import { toast } from "react-toastify";
import { role, status } from "./constants";

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
    set(pre => ({ ...pre, [e.target.name]: e.target.value }));
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
            !suppressToast && toast.success(capitalize(message) ?? 'It was successful');
            break;
        }

        case status.INVALID_REQUEST: {
            setValidationErrors && setValidationErrors(response.data.errors);
            throw new Error(message ?? 'There was validation failure');
        }

        case status.NOT_FOUND: {
            window.history.back();
            throw new Error(message ?? 'There was an error occurred');
        }

        case status.BAD_REQUEST:
        case status.UNAUTHORIZED:
        case status.FORBIDDEN:
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
export function formatDate(dateString, hasTime = false) {
    const date = new Date(dateString);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }

    if (hasTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = true;
    }

    return date.toLocaleDateString('en-US', options);
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
export function where(data = [], relation = {}) {
    const keys = Object.keys(relation);
    const filters = keys.filter(key => key !== 'getOnlyProperty');
    const getOnlyProperty = keys.find(key => key === 'getOnlyProperty');

    const nestedFilters = filters.filter(key => key.includes('.'));

    const filteredData = data.filter(item => filters.every(filter => {
        if (nestedFilters.includes(filter)) {
            const nestedSearch = filter.split('.');
            return nestedSearch.reduce((obj, key) => obj && obj[key], item) == relation[filter];
        }

        return item[filter] == relation[filter];
    }));

    if (getOnlyProperty) {
        if (getOnlyProperty.includes('.')) {
            const getNestedObjOnly = getOnlyProperty.split('.');
            return filteredData.map(item => getNestedObjOnly.reduce((obj, key) => obj && obj[key], item));
        }
        return filteredData.map(item => item[relation[getOnlyProperty]]);
    }

    return filteredData;
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

export const getCountDown = (datetime, callback, addMinutes = null) => {
    const targetDate = new Date(datetime);
    const currentTime = new Date();
    let timeDifference = targetDate.getTime() - currentTime.getTime();
    addMinutes && (timeDifference += (parseInt(addMinutes) * 60 * 1000));

    if (timeDifference >= 1) {
        const intervalId = setInterval(() => {
            const targetDate = new Date(datetime);
            const currentTime = new Date();
            let timeDifference = targetDate.getTime() - currentTime.getTime();
            addMinutes && (timeDifference += (parseInt(addMinutes) * 60 * 1000));

            if (timeDifference <= 0) {
                clearInterval(intervalId);
                callback({ remainingTime: 0, formattedTime: { days: 0, hours: '00', minutes: '00', seconds: '00' } });
            } else {
                callback({ remainingTime: timeDifference, formattedTime: calculateMiliseconds(timeDifference) });
            }
        }, 1000);
    } else {
        callback({ remainingTime: 0, formattedTime: { days: 0, hours: '00', minutes: '00', seconds: '00' } });
    }
};

// function to generate time formate from miliseconds
export function calculateMiliseconds(miliseconds) {
    const days = Math.floor(miliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((miliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

    return {
        days,
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
    };
}

export const padZero = (value) => (value.toString().padStart(2, '0'));