import gql from 'graphql-tag';

export default gql`
mutation CreateStadium($name: String, $city: String, $countryCode: String)
{
  createStadium (name: $name, city: $city, countryCode: $countryCode) {
    stadiumId
    name
    city
    country {
      code
      name
    }
  }
}
`