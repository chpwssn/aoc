/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

import { clone, split } from "ramda";

export const splitLines = split('\n');

export const splitWords = split(/\s+/)

export const parseWordsFactory = (...fn: ((st: string) => any)[]) =>
    (input: string[]) => input.map((value: string, i: number) =>
        i >= fn.length ? fn[fn.length - 1](value) : fn[i](value))

export type StoredReducer<T, K> = (state: T, arg: K) => T
export type Reducer<T> = (state: T) => T

export const stateFactory = <T>(initialState: T) => {
    let state = initialState;
    let stateHistory: T[] = [state]
    const reducers: { [key: string]: StoredReducer<T, any> } = {}
    return {
        state,
        registerReducer: <K>(key: string, r: StoredReducer<T, K>) => {
            reducers[key] = r
        },
        process: (key: string, arg: any) => {
            if (!reducers[key]) return state;
            state = reducers[key](clone(state), arg)
            stateHistory.push(state)
            return state
        },
        dispatch: (r: Reducer<T>) => {
            state = r(clone(state))
            stateHistory.push(state)
            return state
        },
        history: {
            peek: () => clone(stateHistory[-1]),
        }
    }
}
