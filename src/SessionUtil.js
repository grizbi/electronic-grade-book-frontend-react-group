const isSessionActive = () => {
    const isActive = localStorage.getItem('jwt') != null;
    return isActive;
}
 

const isAdminRoleActive = () => {
    const isAdminRole = localStorage.getItem('email') === 'admin';
    return isAdminRole;
}

const redirectUserIfSessionNotEstablished = (() => {
    if(!isSessionActive()) {
        window.location.replace('/');
    }
})

const redirectUnauthorizedUser = () => {
    if(!isSessionActive()) {
        redirectUserIfSessionNotEstablished();
    }
    else if (!isAdminRoleActive()) {
        window.location.replace('/');
    }
}

export {isSessionActive, isAdminRoleActive, redirectUserIfSessionNotEstablished, redirectUnauthorizedUser};