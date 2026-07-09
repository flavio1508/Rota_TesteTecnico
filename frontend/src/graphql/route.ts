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
  mutation saveRoute($input: SaveRouteInput!) {
    saveRoute(input: $input) {
      id
      origin
      destination
      distance
      duration
      createdAt

      vehicle {
        id
        plate
        brand
        model
      }
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

      vehicle {
        id
        plate
        brand
        model
      }
    }
  }
`;

export const FIND_ROUTES_BY_PLATE = gql`
  query findRoutesByPlate($plate: String!) {
    findRoutesByPlate(plate: $plate) {
      id
      origin
      destination
      distance
      duration
      createdAt

      vehicle {
        id
        plate
        brand
        model
      }
    }
  }
`;