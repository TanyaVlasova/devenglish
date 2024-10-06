type SuccessResult<T> = {
  ok: true;
  data: T;
};

type ErrorResult = {
  ok: false;
  error: unknown;
  message: string;
};

export type Result<T> = SuccessResult<T> | ErrorResult;
