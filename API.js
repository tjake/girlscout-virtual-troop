import {Alert, Platform} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import UUID from 'react-native-uuid-generator'
import G from './globals'
import {decode as atob, encode as btoa} from 'base-64'

function timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject("Request timed out 1")
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject("Request timed out 2");
        }
      )
    })
}

export default API = {
    writeProfileToAstra : (profile) => {
        data = {}
        data[btoa(profile.email)] = profile
        return fetch(G.ASTRA_REST_URL + "/collections/troops/" + profile.troopNumber + "/members", {
            method: 'PATCH',
            headers: {
                Accepts: 'application/json',
                redirect: "follow",
                'Content-Type': 'application/json',
                "X-Cassandra-Request-ID" : UUID.getRandomUUID(),
                "X-Cassandra-Token": G.ASTRA_AUTH_TOKEN
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.status == 200) {
                return res.json()
            }
            
            console.log(res)
            return Promise.reject("Error Code: " + res.status + " : " + res.text())
        })
    },
    readMembersFromAstra : (troopNumber) => {
        return fetch(G.ASTRA_REST_URL + "/collections/troops/" + troopNumber + "/members", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "x-cassandra-request-id" : UUID.getRandomUUID(),
                "x-cassandra-token": G.ASTRA_AUTH_TOKEN
            },
        })
        .then(res => {
            if (res.status == 200) {
                return res.json()
            }
            
            console.log(JSON.stringify(res))
            return Promise.reject("Error Code: " + res.status)
        })
    },
    readCalendarFromAstra : (troopNumber) => {
        return fetch(G.ASTRA_REST_URL + "/collections/troops/" + troopNumber + "/calendar", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "x-cassandra-request-id" : UUID.getRandomUUID(),
                "x-cassandra-token": G.ASTRA_AUTH_TOKEN
            },
        })
        .then(res => {
            if (res.status == 200) {
                return res.json()
            }
            
            console.log(JSON.stringify(res))
            return Promise.reject("Error Code: " + res.status)
        })
    },
    readItemFromStorage : async (key) => {
        return AsyncStorage.getItem(key)
    },
    writeItemToStorage : async (key, value) => {
        return AsyncStorage.setItem(key, value)
    },
    removeItemFromStorage : async (key) => {
        return AsyncStorage.removeItem(key)
    },
}