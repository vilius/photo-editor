import { FC, useState } from 'react';
import classNames from 'classnames';
import { z } from 'zod';

type Props = {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
};

export const MinMaxNumberInput: FC<Props> = ({
  value,
  min,
  max,
  label,
  onChange,
}) => {
  const [invalidState, setInvalidState] = useState<string | undefined>(
    undefined
  );

  return (
    <input
      type='number'
      className={classNames('w-20', {
        'outline-rose-400': invalidState !== undefined,
      })}
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
