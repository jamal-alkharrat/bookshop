// Note: These functions are not used in this project
// The user Auth is handled by the Vue components and the userStore
// I kept these functions here for reference if needed in the future

export function setUserFromToken(instance) {
    const token = localStorage.getItem('user-token');
    console.log("Encryp. token: ");
    console.log(token);
    if (token) {
        const decodedToken = parseJwt(token);
        instance.user = decodedToken;
    }
}

export function parseJwt(token) {
    console.log(token);
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}
