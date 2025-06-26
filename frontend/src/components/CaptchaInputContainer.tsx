import { forwardRef, useCallback, useEffect } from 'react';
import { useCaptcha } from '../hooks';
import { CaptchInputContainerProps } from '../types';

export const CaptchaInputContainer = forwardRef<
  HTMLDivElement,
  CaptchInputContainerProps
>((props, ref) => {
  const { form, ...rest } = props;
  const { render, load, containerId } = useCaptcha();

  const loadAndRender = useCallback(async () => {
    await load();
    if (form !== 'PasswordlessUserInputForm') {
      render();
    }
  }, []);

  useEffect(() => {
    loadAndRender();
  }, [form]);

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
