export default function author(...allowedRoles) {
    return (req, res, next) => {
        if (req.headers.roleUser && allowedRoles.includes(req.headers.roleUser)) {
            return next();
        }
        return next(new Error('No acceptable'));
    }
}