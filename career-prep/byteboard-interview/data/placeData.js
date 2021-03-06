import {data} from './data.js';

/**
 * @typedef{{
 *   id: string,
 *   name: string,
 *   address: string,
 *   stars: number,
 *   reviews: number,
 *   price: string,
 *   description: string,
 *   img?: string,
 * }}
 */
export let Place;

data.set('places', []);
data.set('placesLoaded', false);
data.set('placeFilter', '');

/**
 * Loads places and saves to the data store.
 * @return {!Promise<void>}
 */
export async function initializePlaces() {
  const placesWithImages = await loadPlacesWithImages();
  data.set('places', placesWithImages);
  data.set('placesLoaded', true);
}

/**
 * Loads the place list data and merges with place image data.
 * @return {!Promise<!Array<!Place>>}
 */
async function loadPlacesWithImages() {
  // TODO: Implement this function.
  // See the README for details on loading place and image data.
  return [{
    id: 'example-a',
    name: 'TODO',
    address: 'TODO',
    stars: 0,
    reviews: 0,
    price: '$',
    description: 'TODO',
    img: '',
  }, {
    id: 'example-b',
    name: 'TODO',
    address: 'TODO',
    stars: 0,
    reviews: 0,
    price: '$',
    description: 'TODO',
    img: '',
  }];
}
