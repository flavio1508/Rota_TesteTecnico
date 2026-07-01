import { gql } from '@apollo/client/core';

export const CALCULATE_ROUTE = gql`
  mutation calculateRoute($input: CreateRouteInput!) {
    calculateRoute(input: $input) {
      origin
      destination
      distance
      duration
      encodedPolyline
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

export const SAVE_ROUTE = gql`
  mutation saveRoute($input: CreateRouteInput!) {
    saveRoute(input: $input) {
      id
      origin
      destination
      distance
      duration
      createdAt
    }
  }
`;

export const GET_ROUTES = gql`
  query {
    routes {
      id
      origin
      destination
      distance
      duration
      createdAt
    }
  }
`;