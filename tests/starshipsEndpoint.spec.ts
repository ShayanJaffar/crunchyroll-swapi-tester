import { test, expect } from '@playwright/test';
import { starshipData } from '../constants/constants';
const baseUrl = 'https://swapi.dev/api/starships'

//Happy Paths
starshipData.forEach(starship => {
    test(`Test - Starship ${starship.name}`, async ({ request }) => {
        const response = await request.get(`${baseUrl}/${starship.id}`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toBe(starship.name)
    })
})

test('Test - Return All Starships', async ({ request }) => {
    const response = await request.get(`${baseUrl}`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(36)
    expect(responseBody.results[5].name).toBe("Y-wing")
})

test('Test - Search for Death Star and Get One Result', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=death`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(1)
    expect(responseBody.results[0].name).toBe("Death Star")
})

test('Test - Search for "Wing"" and Get Five Results', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=wing`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(5)
})






//Errors and Edge Cases
test('Test - Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/bad-endpoint`)
    expect(response.status()).toBe(404)
})

test('Test - Invalid Starship ID 0', async ({ request }) => {
    const response = await request.get(`${baseUrl}/0`)
    expect(response.status()).toBe(404)
})

test('Test - Invalid Starship ID 33', async ({ request }) => {
    const response = await request.get(`${baseUrl}/33`)
    expect(response.status()).toBe(404)
})

test('Test - Search for Boeing 737 and Get No Result', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=boeing`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(0)
})

test('Test - Handle Invalid Starship ID 1001 Digits', async ({ request }) => {
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
    const response = await request.get(`${baseUrl}/2`, {
        data: {
            invalidParam: 100
        },
    })
    expect(response.status()).toBe(200)
})

test('Test - POST request', async ({ request }) => {
    const response = await request.post(`${baseUrl}/2`, {
        data: {
            invalidParam: 100
        },
    })
    expect(response.status()).toBe(405)
})
    
