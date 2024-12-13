import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import WeatherHunt from '../screens/WeatherHunt'; // Adjust the import path as necessary
import AccountService from '../config/AccountService'; // Adjust the import path as necessary

jest.mock('../config/AccountService', () => ({
    getCitySuggestions: jest.fn(() => Promise.resolve([{ name: 'City1' }])),
    getCoordinates: jest.fn(() => Promise.resolve({ lat: 123, lon: 456 })),
    getWeather: jest.fn(() => Promise.resolve({
      name: 'City1',
      weather: [{ description: 'clear sky', icon: '01d' }],
      main: { temp: 25 }
    }))
  }));

describe('WeatherHunt', () => {
    let component;
  
  
    it('renders correctly', async () => {
    await act(async() => {
        component = renderer.create(<WeatherHunt />);
      });
      expect(component.toJSON()).toMatchSnapshot();
    });
  
    it('displays suggestions on search', async () => {
      await act(async () => {
        component = renderer.create(<WeatherHunt />);
      });
  
      const input = component.root.findByProps({ placeholder: 'Enter city or zip code' });
      await act(async () => {
        input.props.onChangeText('City');
        input.props.rightIcon.props.onPress();
      });
  
      const suggestion = component.root.findByProps({ testID: 'suggestionText-0' });
      expect(suggestion).toBeTruthy();
      expect(suggestion.props.children).toBe('City1');
    });
  
    it('fetches weather for selected suggestion', async () => {
        await act(async () => {
          component = renderer.create(<WeatherHunt />);
        });
    
        const input = component.root.findByProps({ placeholder: 'Enter city or zip code' });
        await act(async () => {
          input.props.onChangeText('City');
        });
    
        const searchIcon = component.root.findByProps({ name: 'search' });
        await act(async () => {
          searchIcon.props.onPress();
        });
    
        const suggestion = component.root.findByProps({ testID: 'suggestion-0' });
        await act(async () => {
          suggestion.props.onPress();
        });
    
        const button = component.root.findByProps({ testID: 'getWeatherButton' });
        await act(async () => {
          button.props.onPress();
        });
    
        const weatherInfo = component.root.findByProps({ testID: 'weatherInfo' });
        expect(weatherInfo).toBeTruthy();
        expect(weatherInfo.props.children[0].props.children).toBe('City1');
        expect(weatherInfo.props.children[1].props.children).toBe('clear sky');
    
        const temperature = weatherInfo.props.children[2].props.children;
        const formattedTemperature = `${temperature[0]}${temperature[1]}`;
        expect(formattedTemperature).toBe('25 °C');
      });
    
  
    it('fetches weather for direct input', async () => {
        await act(async () => {
          component = renderer.create(<WeatherHunt />);
        });
      
        const input = component.root.findByProps({ testID: 'input' });
        await act(async () => {
          input.props.onChangeText('City');
        });
      
        const button = component.root.findByProps({ testID: 'getWeatherButton' });
        await act(async () => {
          button.props.onPress();
        });
      
        const weatherInfo = component.root.findByProps({ testID: 'weatherInfo' });
        expect(weatherInfo).toBeTruthy();
        expect(weatherInfo.props.children[0].props.children).toBe('City1');
        expect(weatherInfo.props.children[1].props.children).toBe('clear sky');
      
        const temperature = weatherInfo.props.children[2].props.children;
        const formattedTemperature = `${temperature[0]}${temperature[1]}`;
        expect(formattedTemperature).toBe('25 °C');
      });
      
      
  });