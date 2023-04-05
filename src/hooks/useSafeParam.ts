import { useParams } from 'react-router-dom';
import { ZodType } from 'zod';

export const useSafeParam = <T>(
  paramName: string,
  validation: ZodType<T>,
  fallbackValue: T
) => {
  const params = useParams();
  const param = params[paramName];
  const result = validation.safeParse(param);

  if (result.success) {
    return result.data;
  } else {
    return fallbackValue;
  }
};
