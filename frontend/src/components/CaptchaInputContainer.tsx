import { forwardRef, useEffect } from 'react';
import { useCaptcha } from '../hooks';
import { CaptchInputContainerProps } from '../types';

export const CaptchaInputContainer = forwardRef<
  HTMLDivElement,
  CaptchInputContainerProps
>((props, ref) => {
  const { form, ...rest } = props;
  const { loadAndRender, containerId } = useCaptcha();

  useEffect(() => {
    loadAndRender();
  }, []);

  return (
    <div
      ref={ref}
      id={containerId}
      style={{ display: 'inline-block', margin: '0 auto', paddingTop: '20px' }}
      {...rest}
    />
  );
});

CaptchaInputContainer.displayName = 'CaptchaInputContainer';
