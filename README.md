# PetPals

## Overview

PetPals is a mobile application developed using React Native. It connects users with animal companionship services, allowing them to book appointments for spending time with animals. The app is built to provide a user-friendly interface for browsing available animals, create pet bookings.

## Features

- Browse available animals for companionship.
- Users are able to create pet new records(images included) for other users to book companionship services.
- Book Animal for companionship.
- User authentication and management using firebase.
- Persistent storage of user data.
- Support for both Android and iOS platforms.
- Redux toolkit for state management.

## Dependencies

### Main Dependencies

- **[@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet)**: A performant and customizable bottom sheet component.
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)**: Validation resolvers for react-hook-form.
- **[@pchmn/expo-material3-theme](https://github.com/pchmn/expo-material3-theme)**: Material You theme for Expo.
- **[@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)**: An asynchronous, persistent, key-value storage system.
- **[@react-navigation/native](https://reactnavigation.org/)**: Routing and navigation for your React Native apps.
- **[@react-navigation/native-stack](https://reactnavigation.org/docs/stack-navigator/)**: Stack navigator for use with React Navigation.
- **[@reduxjs/toolkit](https://redux-toolkit.js.org/)**: The official, recommended way to write Redux logic.
- **[expo](https://expo.dev/)**: A framework and a platform for universal React applications.
- **[firebase](https://firebase.google.com/)**: Backend services for authentication, database, and more.
- **[react-hook-form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms with easy-to-use validation.
- **[react-native](https://reactnative.dev/)**: A framework for building native apps using React.
- **[react-native-paper](https://callstack.github.io/react-native-paper/)**: High-quality, standard-compliant Material Design library for React Native.
- **[react-redux](https://react-redux.js.org/)**: Official React bindings for Redux.
- **[redux-persist](https://github.com/rt2zz/redux-persist)**: Persist and rehydrate a Redux store.

### Additional Dependencies

- **[expo-image](https://docs.expo.dev/versions/latest/sdk/image/)**: A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk.
- **[expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)**: Provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera.
- **[expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)**: Provides a component to control the device status bar.
- **[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)**: Declarative API for gesture handling in React Native.
- **[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)**: React Native's Animated library reimplemented.
- **[react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)**: A flexible way to handle safe area insets in React Native.
- **[react-native-screens](https://github.com/software-mansion/react-native-screens)**: Native navigation primitives for your React Native app.
- **[react-native-svg](https://github.com/react-native-svg/react-native-svg)**: SVG library for React Native.
- **[react-native-uuid](https://github.com/eugenehp/react-native-uuid)**: Simple, fast generation of RFC4122 UUIDS.
- **[yup](https://github.com/jquense/yup)**: JavaScript schema builder for value parsing and validation.
- **[expo-asset](https://docs.expo.dev/versions/latest/sdk/asset/)**: An Expo module to manage assets.

### Dev Dependencies

- **[@babel/core](https://babeljs.io/docs/en/babel-core)**: Babel compiler core.
- **[@types/react](https://www.npmjs.com/package/@types/react)**: TypeScript definitions for React.
- **[typescript](https://www.typescriptlang.org/)**: JavaScript with syntax for types.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/calebgrimah/petpals.git 
   cd petpals
   npm install
   npx expo start

## TODO:
- Add unit, integration tests.
- Improve UI/UX
- Add features regarding bookings.

## Usage
- Launch application, and login or create an account to access application dashboard.
- The "MyPets" bottom tabs contains a list of pets(animals) created by the authenticated user. There is also a floating action button to create a new pet by the authenticated user.
- The "Pets" bottom tab contains a list of all pets created by all users, this means users can only book pets not created by them.
- Each pet item tab has a "book" button that allows the user book a time with the pet
- The last bottom tab contains a list of all bookings created and received by the user.