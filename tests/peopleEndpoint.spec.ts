import { test, expect } from '@playwright/test';
import { peopleData } from '../constants/constants';
const baseUrl = 'https://swapi.dev/api/people'

//Happy Paths
peopleData.forEach(person => {
    test(`Test - Person ${person.name}`, async ({ request }) => {
        const response = await request.get(`${baseUrl}/${person.id}`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toBe(person.name)
    })
})

test('Test - Return All People', async ({ request }) => {
    const response = await request.get(`${baseUrl}`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(82)
    expect(responseBody.results[4].name).toBe("Leia Organa")
})

test('Test - Search for R2-D2 and Get One Result', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=r2`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(1)
    expect(responseBody.results[0].name).toBe("R2-D2")
})

test('Test - Search for Skywalker and Get Three Results', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=skywalker`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(3)
})






//Errors and Edge Cases
test('Test - Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/bad-endpoint`)
    expect(response.status()).toBe(404)
})

test('Test - Invalid Person ID 0', async ({ request }) => {
    const response = await request.get(`${baseUrl}/0`)
    expect(response.status()).toBe(404)
})

test('Test - Invalid Person ID 84', async ({ request }) => {
    const response = await request.get(`${baseUrl}/84`)
    expect(response.status()).toBe(404)
})

test('Test - Search for R3-D3 and Get No Result', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=r3`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(0)
})

test('Test - Handle Invalid Person ID 1001 Digits', async ({ request }) => {
    const response = await request.get(`${baseUrl}/1234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    12345678901234567890123456789012345678901234567890123456789012345678901234567890
    123456789012345678901234567890123456789012345678901234567890123456789012345678901`)
    expect(response.status()).toBe(404)
})

test('Test - GET Request with Request Body', async ({ request }) => {
    const response = await request.get(`${baseUrl}/1`, {
        data: {
            invalidParam: 100
        },
    })
    expect(response.status()).toBe(200)
})

test('Test - POST request', async ({ request }) => {
    const response = await request.post(`${baseUrl}/1`, {
        data: {
            invalidParam: 100
        },
    })
    expect(response.status()).toBe(405)
})
    
