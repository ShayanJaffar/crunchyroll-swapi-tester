import { test, expect } from '@playwright/test';
import { filmData } from '../constants/constants';
const baseUrl = 'https://swapi.dev/api/films'

//Happy Paths
filmData.forEach(film => {
    test(`Test - Film ${film.name}`, async ({ request }) => {
        const response = await request.get(`${baseUrl}/${film.id}`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.title).toBe(film.name)
        
    })
})

test('Test - Return All Films', async ({ request }) => {
    const response = await request.get(`${baseUrl}`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(6)
    expect(responseBody.results[4].title).toBe("Attack of the Clones")
})

test('Test - Search for Phantom', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=phantom`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(1)
    expect(responseBody.results[0].title).toBe("The Phantom Menace")
})


test('Test - Search for "the" and Get Five Results', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=the`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(5)
})





//Errors and Edge Cases
test('Test - Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/bad-endpoint`)
    expect(response.status()).toBe(404)
})
test('Test - Invalid Film ID 0', async ({ request }) => {
    const response = await request.get(`${baseUrl}/0`)
    expect(response.status()).toBe(404)
})

test('Test - Invalid Film ID 7', async ({ request }) => {
    const response = await request.get(`${baseUrl}/7`)
    expect(response.status()).toBe(404)
})

test('Test - Search for The Last Jedi and Get No Result', async ({ request }) => {
    const response = await request.get(`${baseUrl}/?search=last`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.count).toBe(0)
})

test('Test - Handle Invalid Film ID 1001 Digits', async ({ request }) => {
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

