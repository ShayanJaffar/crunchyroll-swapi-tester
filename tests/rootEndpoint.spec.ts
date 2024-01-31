import { test, expect } from '@playwright/test';
const baseUrl = 'https://swapi.dev/api'

//Happy Paths
test('Test - Return Root', async ({ request }) => {
    const response = await request.get(`${baseUrl}`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody).toStrictEqual({"films": "https://swapi.dev/api/films/", "people": "https://swapi.dev/api/people/", "planets": "https://swapi.dev/api/planets/", "species": "https://swapi.dev/api/species/", "starships": "https://swapi.dev/api/starships/", "vehicles": "https://swapi.dev/api/vehicles/"})
})





//Errors and Edge Cases
test('Test - Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/bad-endpoint`)
    expect(response.status()).toBe(404)
})


test('Test - Search and Get Default Result', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=test`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody).toStrictEqual({"films": "https://swapi.dev/api/films/", "people": "https://swapi.dev/api/people/", "planets": "https://swapi.dev/api/planets/", "species": "https://swapi.dev/api/species/", "starships": "https://swapi.dev/api/starships/", "vehicles": "https://swapi.dev/api/vehicles/"})
})

test('Test - Handle Invalid Endpoint 1001 Digits', async ({ request }) => {
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
    const response = await request.get(`${baseUrl}/`, {
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
    expect(response.status()).toBe(404)
})
