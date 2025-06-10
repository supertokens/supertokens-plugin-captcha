import { describe, it, expect } from 'vitest';
import { Captcha } from './captcha';

describe('Captcha', () => {
  it.todo('should throw an error if the provider type is not supported');
  describe('load', () => {
    it.todo('should throw an error if init was not called');
    it.todo('should load the captcha provider');
    it.todo('should skip loading if the captcha is already loaded');
    it.todo('should allow loading if it is disabled');
  });
  describe('render', () => {
    it.todo('should render the captcha provider');
    it.todo(
      'should skip rendering if the captcha provider does not support it'
    );
    it.todo('should prevent rendering if it is disabled');
  });
  describe('preAPIHook', () => {
    it.todo('should return the original context if the captcha is disabled');
    it.todo('should throw an error if the captcha has not been loaded');
    it.todo('should add the captcha token to the request body');
    it.todo('should throw an error if the captcha token is not set');
  });
});
