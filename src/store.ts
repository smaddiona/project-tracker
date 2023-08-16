import {atom, useAtom } from 'jotai'

export const refreshAtom = atom(false)

export const useRefreshAtom = () => {
    const [refresh, setRefresh] = useAtom(refreshAtom)
    const refreshPage = () => setRefresh((prev) => !prev)
    return {refresh, refreshPage, setRefresh}
}