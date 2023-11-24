import { notification } from 'antd';
import { store } from 'store';
import Strings from 'utils/strings';

export const trimObjects = (obj: any) => {
	for (const prop in obj) {
		obj[prop] = obj[prop].trim();
	}
	return obj;
};

export const emailIsValid = (email: string, error?: any) => {
	const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const isValid = email.match(emailRegex);

	if (!isValid && error) {
		notification.open({
            message: Strings.errors.invalidFormat,
            description: error,
            placement: 'bottomRight',
            duration: 5,
        });
	}

	return isValid;
}

export const capitalize = (string: string) => {
	if (!string) return '';
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export const translate = (text: any) => {
	if (!text) return '';

	if (typeof text === 'string') return text;

	const lang = Strings.getLanguage();
	const defaultLanguage = Strings.getLanguage();

	if (text[defaultLanguage] || text[lang]) {
		return text[defaultLanguage] || text[lang];
	}

	return Object.values(text).filter(val => !!val)[0] || '';
};

export const invertColor = (hex: any, bw: any) => {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16) as any,
        g = parseInt(hex.slice(2, 4), 16) as any,
        b = parseInt(hex.slice(4, 6), 16) as any;
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    return "#" + r.padStart(2, '0') + g.padStart(2, '0') + b.padStart(2, '0');
}

export const shouldBeWhite = (hex: any) => {
    hex = hex.trim();

    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }

    let r = parseInt(hex.slice(0, 2), 16) as any,
        g = parseInt(hex.slice(2, 4), 16) as any,
        b = parseInt(hex.slice(4, 6), 16) as any;

    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? false
        : true;
}

export const parseLinks = (link: string) => {
	const { user } = store.getState() as any;

	if (user?.role === 'user') return `/users${link}`;
	else return `/psychologists${link}`;
}