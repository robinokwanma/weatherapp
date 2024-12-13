import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../App';
import SplashScreen from '../onBoarding/splashScreen';
import WeatherHunt from '../screens/WeatherHunt';


jest.mock('../onBoarding/splashScreen', () => 'SplashScreen');
jest.mock('../screens/WeatherHunt', () => 'WeatherHunt');

describe('App', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
  
    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  
    it('displays the splash screen initially', () => {
      let tree;
      act(() => {
        tree = renderer.create(<App />);
      });
      expect(tree.toJSON()).toMatchSnapshot();
    });
  
    it('displays the WeatherHunt component after 4 seconds', () => {
      let component;
      act(() => {
        component = renderer.create(<App />);
        jest.advanceTimersByTime(4000);
      });
      act(() => {
        component.update(<App />); // Force a re-render to trigger useEffect
        jest.advanceTimersByTime(4000);
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    
  });