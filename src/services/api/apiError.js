export default class ApiError extends Error {
  constructor(status = 400, name = 'BadRequest') {
    super(status);

    this.status = status;
    this.name = name;

    this.message = status === 400 ? 'Bad Request' :
      status === 401 ? 'Bad credentials' :
        status === 403 ? 'Access denied' :
          status === 404 ? 'Not found' :
            status === 423 ? 'Expired token, need refresh' :
              status === 500 ? 'Server error' :
                'Unhandled error';
  };
}