import { FC, useState } from 'react';
import classNames from 'classnames';
import { z } from 'zod';

type Props = {
  value: number;
  min: number;
  max: number;
  label: string;
  className?: string;
  onChange: (value: number) => void;
};

export const MinMaxNumberInput: FC<Props> = ({
  value,
  min,
  max,
  label,
  className,
  onChange,
}) => {
  const [invalidState, setInvalidState] = useState<string | undefined>(
    undefined
  );

  return (
    <input
      type='number'
      className={classNames(
        {
          'outline-rose-400': invalidState !== undefined,
        },
        className
      )}
      aria-label={label}
      value={invalidState === undefined ? value : invalidState}
      onChange={(e) => {
        const isValid = z.coerce
          .number()
          .min(min)
          .max(max)
          .safeParse(e.currentTarget.value);

        if (isValid.success) {
          onChange(isValid.data);
          setInvalidState(undefined);
        } else {
          setInvalidState(e.currentTarget.value);
        }
      }}
    />
  );
};
