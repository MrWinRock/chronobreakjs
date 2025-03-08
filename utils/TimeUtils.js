import moment from "moment-timezone";
import * as ct from "countries-and-timezones";

/**
 * Gets the current time for a given country's timezone.
 * @param {string} countryCode - The ISO country code.
 * @returns {string | null} The formatted time or null if the country is not found.
 */
export function getTimeByCountry(countryCode) {
  const country = ct.getCountry(countryCode);
  if (!country || !country.timezones.length) return null;

  const timezone = country.timezones[0];
  return moment.tz(timezone).format("HH:mm");
}

/**
 * Gets the current time for a given city's timezone.
 * @param {string} city - The city name.
 * @param {string} countryCode - The ISO country code.
 * @param {Date} [time] - The specific time to convert.
 * @returns {string | null} The formatted time or null if the city is not found.
 */
export function getTimeByCity(city, countryCode, time) {
  const country = ct.getCountry(countryCode);
  if (!country || !country.timezones.length) return null;

  const timezone = country.timezones[0];
  const momentTime = time ? moment(time) : moment();
  return momentTime.tz(timezone).format("HH:mm");
}

/**
 * Gets the current time for all countries' timezones.
 * @returns {Record<string, string | null>} An object with country codes as keys and formatted times as values.
 */
export function getAllCountriesTime() {
  const countries = ct.getAllCountries();
  const countryTimes = {};

  for (const countryCode in countries) {
    countryTimes[countryCode] = getTimeByCountry(countryCode);
  }

  return countryTimes;
}

/**
 * Gets the current time for all popular cities' timezones.
 * @param {Array<{ city: string, country: string }>} cities - The list of cities and their country codes.
 * @returns {Record<string, string | null>} An object with city names as keys and formatted times as values.
 */
export function getAllCitiesTime(cities) {
  const cityTimes = {};

  cities.forEach(({ city, country }) => {
    cityTimes[city] = getTimeByCity(city, country);
  });

  return cityTimes;
}
