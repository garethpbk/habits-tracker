import { withApollo } from "../lib/apollo"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Layout from "../components/Layout"
import HabitList from "../components/HabitList"
import HabitForm from "../components/HabitForm"

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`

function Home() {
  const { data, error, loading } = useQuery(HELLO_QUERY)

  if (loading) return <div>Loading...</div>

  return (
    <Layout>
      <div className="hero">
        <h1 className="title">{data.sayHello}</h1>
      </div>
      <div className="list">
        <HabitForm />
        <HabitList />
      </div>
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin-top: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
          text-align: center;
        }
        .list {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  )
}

export default withApollo(Home)
