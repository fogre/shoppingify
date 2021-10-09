const { setTestClient } = require('./config/testClient')
const { USER_CREATE, USER_LOGIN } = require('./queries/userQueries')

let testClient
const testUser = {
  email: 'test@test.com',
  password: 'sekret'
}

const userCreate = async vars => testClient.mutate(
  USER_CREATE, { variables: { ...vars } }
)
const userLogin = async vars => testClient.mutate(
  USER_LOGIN, { variables: { ...vars } }
)

beforeAll(async () => {
  testClient = await setTestClient()
})

describe('An User can',() => {

  it('be created and it returns valid user fields', async () => {
    const res = await userCreate(testUser)
    expect(res.errors).toBeFalsy()

    const user = res.data.userCreate
    expect(user.passwordHash).toBeFalsy()
    expect(user.email).toBe(testUser.email)
    expect(
      user.openList
      && user.history
      && user.statistics
    ).toBeFalsy()
  })

  it('not be created with invalid values or if User already exists', async () => {
    let res = await userCreate(testUser)
    expect(res.errors).toBeTruthy()
    expect(res.errors[0].message).toMatch(/An account for test@test.com already exists/)

    res = await userCreate({ email: 'asd@', password: 'sekret' })
    expect(res.errors[0].message).toMatch(/Please enter valid email address/)
  })

  it('log in with right credentials and receives right data', async () => {
    const res = await userLogin(testUser)
    expect(res.errors).toBeFalsy()
    expect(res.data.userLogin.value).toBeTruthy()

    const user = res.data.userLogin.user
    expect(user).toBeTruthy()
    expect(user.email).toBe(testUser.email)
    expect(user.history && user.statistics).toBeTruthy()
  })

  it('not login with wrong credentials and receives no data', async () => {
    let res = await userLogin({
      email: testUser.email, password: 'asdasd'
    })
    expect(res.errors[0].message).toMatch(/Wrong credentials/)
    expect(res.data).toBeFalsy()

    res = await userLogin({
      email: 'test@wrong.com', password: testUser.password
    })
    expect(res.errors[0].message).toMatch(/Wrong credentials/)
    expect(res.data).toBeFalsy()
  })
})