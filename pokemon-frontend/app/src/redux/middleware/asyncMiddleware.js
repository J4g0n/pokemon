// found here
// https://github.com/erikras/react-redux-universal-hot-example/blob/2fd505775d587dac15feb0816d4025bfa645b4fa/src/redux/middleware/clientMiddleware.js
// see also
// https://github.com/kweiberth/react-todo-list/blob/part-9-start/components/TodoInput.js
export default function clientMiddleware(client) {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
            if (!promise) {
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({...rest, type: REQUEST});

            const actionPromise = promise(client);
            actionPromise.then(
                (result) => next({...rest, result, type: SUCCESS}),
                (error) => next({...rest, error, type: FAILURE})
            ).catch((error)=> {
                console.error('MIDDLEWARE ERROR:', error);
                next({...rest, error, type: FAILURE});
            });

            return actionPromise;
        };
    };
}