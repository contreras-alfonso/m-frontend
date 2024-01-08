import { useContext } from 'react'
import GastoContext from '../context/GastoProvider';


export const useGasto = () => {
    return useContext(GastoContext);
}

export default useGasto;