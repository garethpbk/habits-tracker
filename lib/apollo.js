import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import Head from "next/head"

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState)

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  WithApollo.getInitialProps = async (ctx) => {
    const { AppTree } = ctx
    const apolloClient = (ctx.apolloClient = initApolloClient())

    let pageProps = {}

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx)
    }

    if (typeof window === "undefined") {
      if (ctx.res && ctx.res.finished) {
        return pageProps
      }

      try {
        const { getDataFromTree } = await import("@apollo/react-ssr")
        await getDataFromTree(
          <AppTree pageProps={{ ...pageProps, apolloClient }} />
        )
      } catch (e) {
        console.log(e)
      }

      Head.rewind()
    }

    const apolloState = apolloClient.cache.extract()

    return {
      ...pageProps,
      apolloState,
    }
  }

  return WithApollo
}

const isDev = process.env.NODE_ENV !== "production"
const uri = isDev ? "http://localhost:3000" : "https://tracker-phi.vercel.app/"

const initApolloClient = (initialState = {}) => {
  const ssrMode = typeof window === "undefined"
  const cache = new InMemoryCache().restore(initialState)

  const client = new ApolloClient({
    ssrMode,
    uri: `${uri}/api/graphql`,
    cache,
  })

  return client
}
