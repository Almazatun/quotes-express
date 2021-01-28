import axios from "axios";
import {BASE_URL} from "../confirm/apiData";

//Axios
export const instance = axios.create({
    baseURL: BASE_URL,
})

//API
export const API = {
    getAllQuotes(){
        return instance.get<Array<QuoteServe>>('').then(res => {
          return res.data
        })
    },
    createQuote(data: QuoteServe){
        return instance.post<QuoteServe>('new/', data).then(res => res.data)
    },
    deleteQuote(quoteId: string ){
        return instance.delete<QuoteServe>(`delete/${quoteId}`).then(res => res.data)
    },
    updateQuote(quoteId: string , title: string, ){
        const data: {content: string} = {content: title}
        return instance.patch<QuoteServe>(`update/${quoteId}`, data)
    }
}

//Types
export interface QuoteServe {
    _id: string
    content: string,
    author: string
}