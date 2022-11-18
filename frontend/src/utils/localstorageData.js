export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem("userData").user
    const user = result ? JSON.parse(result) : null;
    return user;
};