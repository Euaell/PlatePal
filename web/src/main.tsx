import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const BASE_URL = import.meta.env.VITE_BASE_URL

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	uri: `${BASE_URL}/graphql`,
	cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
)
