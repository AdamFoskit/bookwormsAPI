

import * as faker from 'faker';

import { gCall } from '../../test-utils/GraphQL';
import { testConn } from '../../test-utils/TestConnection';
import UserSchema from '../User.schema';

let conn
beforeAll(async () => {
  conn = await testConn();
})
afterAll(async () => {
  await conn.connection.close()
})

const createMutation = `
mutation createUser(
    $firebaseID: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $userType: String!
    $color: String
  ) {
    createUser(
      firebaseID: $firebaseID
      email: $email
      firstName: $firstName
      lastName: $lastName
      userType: $userType
      color: $color
    ) {
      _id
      firebaseID
      email
      firstName
      lastName
      userType
      color
      shifts {
        _id
      }
      preferences {
        _id
      }
      clockIns {
        _id
      }
      clockOuts {
        _id
      }
    }
  }  
`
describe('Create', () => {
  it('Create User', async () => {
    const user = { firebaseID: faker.random.uuid(), email: faker.internet.email(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), userType: faker.name.jobType(), color: faker.internet.color() }
    const response = await gCall({ source: createMutation, variableValues: user })
    expect(response).toMatchObject({
      data: {
        createUser: {
          ...user,
          shifts: [],
          preferences: [],
          clockIns: [],
          clockOuts: []
        }
      }
    })

    const dbUser = await UserSchema.findOne({ where: { email: user.email } }).lean();
    expect(dbUser).toBeDefined();
  })
})