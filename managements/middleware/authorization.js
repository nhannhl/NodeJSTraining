export default function autho(...allowed) {
    return (req, res, next) => {
        if (req.headers.roleUser && allowed.indexOf(req.headers.roleUser) != -1) {
            return next();
        } else {
            return next(new Error('No acceptable'));
        }
    }
}